import { TreeNode } from '../../dataStructures/TreeNode';
import { IMovie, IMovieState } from '../MovieReducer';
import content from './MovieFindingContent';

export const computeConnectionBetweenSelectedMovies = (state: IMovieState): string => {
  if (state.firstSelectedMovie && state.secondSelectedMovie) {
    const m1 = state.firstSelectedMovie;
    const m2 = state.secondSelectedMovie;

    if (areConnected(m1, m2)) {
      /** Return an immediate connection without bothering to create a tree */
      return m1.title + content.connectionSeparator + m2.title;
    } else {
      return getPathToFirstParent(findSecondMovieAsNodeWithShortestPath(m1, m2, state.movies), content.connectionSeparator) || content.cannotFindConnection;
    }
  }

  return content.selectTwoMovies;
}

/**
 * Returns the path between a child movie node and all its parents going up, as their successive titles
 * joined by a separator string
 *
 * @param movieNode The child movie node
 * @param pathSeparator The string to interpolate between the titles
 */

export const getPathToFirstParent = (movieNode: TreeNode<IMovie> | null, pathSeparator: string): string => {
  if (!movieNode) return '';

  const path: string[] = [movieNode.getValue().title];

  let parent = movieNode.getParent();
  while(parent) {
    path.unshift(parent.getValue().title);
    parent = parent.getParent();
  }

  if (path.length > 1) {
    return path.join(pathSeparator);
  }

  return '';
}

/**
 * Start breadth-first building a tree of related movies, with the first movie as the root,
 * until you find the other movie you're interested in and then return that as a node,
 * so you can iterate over all its parents and thus get the shortest path to the first movie.
 *
 * @param firstMovie First user selected movie should be passed here
 * @param movieToFind Second user selected movie should be passed here
 * @param movies The movies wherein to search on the state should be passed here.
 */
export const findSecondMovieAsNodeWithShortestPath = (firstMovie: IMovie, movieToFind: IMovie, movies: IMovie[]): TreeNode<IMovie> | null => {
  const movieList = [...movies];
  remove(movieList, firstMovie);
  const tree: TreeNode<IMovie> = new TreeNode(firstMovie);
  const queue = [tree];

  while (queue.length) {

    const currentNode = queue.shift();
    if (currentNode) {
      const currentMovie = currentNode.getValue();

      for (let castMember of currentMovie.cast) {
        const moviesWiththisCastMember = movieList.filter(m => castMemberAppearsInMovie(castMember, m));

        for (let movie of moviesWiththisCastMember) {
          const child = currentNode.addChild(movie);
          if (areTheSameMovie(movieToFind, movie)) {
            return child;
          }
          /** Ensure subsequent passes don't check already-visited movies */
          remove(movieList, movie);
        }
      }

      const children = currentNode.getChildren();

      if (!children.length) {
        continue;
      }

      for (let i = 0; i < children.length; i++) {
        queue.push(children[i]);
      }
    }
  }

  return null;
}

// for performance's sake, assumes all your movie titles are unique, e.g. remakes mention their production year in the title
export const areTheSameMovie = (m1: IMovie, m2: IMovie) => m1.title === m2.title;

export const areConnected = (m1: IMovie, m2: IMovie) => {
  for (let a of m1.cast) {
    if (castMemberAppearsInMovie(a, m2)) {
      return true;
    }
  }

  return false;
}

export const castMemberAppearsInMovie = (castMember: string, movie: IMovie) => {
  return movie.cast.indexOf(castMember) > -1;
}

export const remove = (array: IMovie[], element: IMovie) => {
  const index = array.indexOf(element);

  if (index !== -1) {
    array.splice(index, 1);
  }
}