# Degrees of separation - find relationships between movies

Pull request showing everything except setting up a React + Redux base app: https://github.com/OntZ/separation/pull/1

## Setup guide

### Install dependencies:
```npm install -g yarn``` (if you don't have it)
```yarn install```

### Run unit tests:
```yarn test```

### Run app locally:
```yarn start```

It should open the app in a browser window, but if it doesn't go to [http://localhost:8080/]

### Build deliverable:
```yarn build```

## Assumptions:
* cast members arrays of movies contain all unique entries, cast member names are written consistently
* clean data set with all-unique movie titles
* application is developed solely for English-reading users
* we don't care about the typeahead warning in the console

## Previously attempted solutions which have proven very unperformant

I attempted to construct the following graph and eagerly populate it upon loading the results from the API.
```ts
type FilterFlags<Base, Condition> = {
  [Key in keyof Base]:
      Base[Key] extends Condition ? Key : never
};

type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];

class UndirectedGraph<T extends {[key: string]: any}> {
  private idKey: AllowedNames<T, string>; // allow only keys whose value type is string as id keys
  private nodes: {[key: string]: T} = {};
  private edges: {[fromID: string]: {
    [toID: string]: boolean;
  }} = {};

  public constructor(items: T[], idKey: AllowedNames<T, string>, addEdgesCondition?: (from: T, to: T) => boolean) {
    if(items.length) {
      if (typeof items[0][idKey] !== 'string') {
        throw new Error(this.constructor.name + ': Value type of id key should be string');
      }
    } else {
      throw new Error(this.constructor.name + ': At least one value must be provided to properly construct the graph');
    }
    this.idKey = idKey;
    items.forEach(item => this.addNode(item, addEdgesCondition));
  }

  public addNode = (item: T, addEdgesCondition?: (from: T, to: T) => boolean ) => {
    if (addEdgesCondition) {
      Object.keys(this.nodes).forEach(key => {
        if (this.nodes.hasOwnProperty(key)){
          const node = this.nodes[key];
          if (addEdgesCondition(item, node)) {
            this.addEdge(item, node);
          }
        }
      })
    }
    this.nodes[item[this.idKey]] = item;
  }

  public contains = (item: T) => !!this.nodes[item[this.idKey]];

  public removeNode = (item: T) => {
    if (this.contains(item)) {
      delete this.nodes[item[this.idKey]];
    }
  }

  public hasEdge = (from: T, to: T) => !!this.edges[from[this.idKey]][to[this.idKey]];

  public addEdge = (from: T, to: T) => {
    const fromID = from[this.idKey] as string;
    const toID = to[this.idKey] as string;

    if (!this.edges[fromID]) {
      this.edges[fromID] = {}
    }
    if (!this.edges[toID]) {
      this.edges[toID] = {}
    }
    if (!this.hasEdge(from, to)) {
      this.edges[fromID][toID] = true;
      this.edges[toID][fromID] = true;
    }
  }

  public getEdges = () => this.edges;
}

const areConnected = (m1: IMovie, m2: IMovie) => {
  for (let a of m1.cast) {
    if (castMemberAppearsInMovie(a, m2)) {
      return true;
    }
  }

  return false;
}

```

and then use it as

```ts
const movieRelationships = new UndirectedGraph<IMovie>(state.movies, 'title', areConnected);
console.log(JSON.stringify(movieRelationships.gedEdges(), null, 2)) // over 100MB of output upon using the API result
```

and run Dijkstra or A* to traverse that and find the shortest path between movies.

Unfortunately, populating the graph at this number of results takes forever and one would quickly lose customers. Showing a progress bar or a video of why using one's product would improve their lives might help, but once they figure out how long it takes to do this every time, their numbers will quickly dwindle. A possible UX optimization would be to cache the initial graph in local storage then on each new load compare the list of movies with the cached one and update the graph if needed, sunsequently being able to run one's traversal algorithm of choice as per user demands, but I still feel this is less than ideal.

Alternatively, I've attempted to create a matrix of relationships with the movies on both sides and 1/0 or true/false to describe whether or not there's any relationship between the movies. Same algorithms apply, but this loads memory with at least ```movies.length * movies.length * sizeof number / boolean``` (numbers are 64bit; I wasn't able to find the size of a boolean) and so quickly becomes unscalable on a local machine, particularly around the 28000 results mark.

If going this route, I feel ideally this graph should be stored in a DB and updated every time someone adds a movie to the list. Then the UI could call a quick and scalable A*-solving Lambda that backend devs could have fun implementing.

https://docs.aws.amazon.com/lambda/latest/dg/python-tracing.html
https://docs.scipy.org/doc/scipy-0.14.0/reference/generated/scipy.sparse.csgraph.shortest_path.html

I feel implementing something like this client-side would be a colossal waste of memory accross the user base. You also can't know how powerful their computers are (and a lot of them might be using phones) so you're much better off running this server(less)-side.


## Chosen solution

Thus I resolved to create a fresh tree starting from movie 1 each time, adding related movies breadth-first (add related movies as children, if movie 2 is found at that level, return, otherwise go to next layer etc.), until we reach movie 2. This assures the path found is always the shortest and is the least memory-intensive solution, although computationally it's a gamble every time.

The core computation for this can be found in ```src/reducers/processing/MovieFinding.ts```. Comments and the adjacent tests help describe it.

It is facilitated by a simple recursive data structure which can be found in ```src/dataStructures/TreeNode```.

The movies get loaded upon page load via ```src/actions/MovieActions => getAllMovies```.

The two autocomplete boxes use ```react-bootstrap-typeahead``` and can be found in ```src/components/Autocomplete```.

The app is based off a React template I made in the past in an effort to avoid webpack-related frustration. I've integrated Redux based on an article I found. The relevant changes can be seen in the closed pull request linked above.

The page is fully responsive via a simple grid system I came up with a while ago, which can be found in ```src/index.scss```, but otherwise minimalistic. The breakpoints are declared in ```src/app-mixins-and-vars.scss```, which is imported into all other style files courtesy of a node-sass configuration in webpack. That file should be restricted to SASS mixins and variables, otherwise node-sass gratiously duplicates any resulting CSS code as many times as it is automatically imported.

### Caveat
I've never used Redux before in any serious fashion, so I'd be grateful if you could please feed back to me what I could improve on.
