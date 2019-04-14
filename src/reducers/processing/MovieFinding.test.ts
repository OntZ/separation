import { areConnected, areTheSameMovie,
  remove,
  findSecondMovieAsNodeWithShortestPath,
  getPathToFirstParent,
  computeConnectionBetweenSelectedMovies,
  castMemberAppearsInMovie
} from './MovieFinding';

import content from './MovieFindingContent';

import { IMovie, IMovieState } from '../MovieReducer';

import { TreeNode } from '../../dataStructures/TreeNode';

const m1 = {title: '1', cast: ['a', 'b']};
const m2 = {title: '2', cast: ['a', 'c']};
const m3 = {title: '3', cast: ['c', 'd']};

const someOtherMovie = {title: 'asdf', cast:[]};

let movies: IMovie[] = [];

beforeEach(() => {
  movies = [m1, m2, m3];
})

describe('MovieReducer', () => {

  it('areConnected returns true for connected movies', () => {
    expect(areConnected(m1, m2)).toBe(true);
  });

  it('areConnected returns false for unconnected movies', () => {
    expect(areConnected(m1, m3)).toBe(false);
  });

  it('areTheSameMovie returns true for the same movie', () => {
    expect(areTheSameMovie(m1, m1)).toBe(true);
  });

  it('remove removes existing movie', () => {
    remove(movies, m1);
    expect(movies).toEqual([m2, m3]);
  });

  it('remove does not remove inexistent movie', () => {
    remove(movies, someOtherMovie);
    expect(movies).toEqual([m1, m2, m3]);
  });

  it('findSecondMovieAsNodeWithShortestPath returns a node when it finds something', () => {
    expect(findSecondMovieAsNodeWithShortestPath(m1, m2, movies) instanceof TreeNode).toBe(true);
  });

  it('findSecondMovieAsNodeWithShortestPath returns null when it does not find anything', () => {
    expect(findSecondMovieAsNodeWithShortestPath(m1, someOtherMovie, movies)).toBe(null);
  });

  it('findSecondMovieAsNodeWithShortestPath finds the node with the shortest path', () => {
    expect(areTheSameMovie(findSecondMovieAsNodeWithShortestPath(m1, m2, movies)!.getValue(), m2)).toBe(true);
  });

  it('areTheSameMovie returns false for different movies', () => {
    expect(areTheSameMovie(m1, m3)).toBe(false);
  });

  it('castMemberAppearsInMovie returns true for existing cast member', () => {
    expect(castMemberAppearsInMovie('a', m1)).toBe(true);
  });

  it('castMemberAppearsInMovie returns false for inexistent cast member', () => {
    expect(castMemberAppearsInMovie('a', m3)).toBe(false);
  });

  it('getPathToFirstParent returns empty for a null movie', () => {
    expect(getPathToFirstParent(null, '')).toEqual('');
  });

  it('getPathToFirstParent returns empty when there are no parents', () => {
    expect(getPathToFirstParent(new TreeNode(m1), '')).toEqual('');
  });
  it(`getPathToFirstParent returns the titles of the movies concatenated via
  the separation string when there is a hierarchical relationship`, () => {
    const node = new TreeNode(m1);
    node.addChild(m2);
    node.getChildren()[0].addChild(m3);
    const grandChild = node.getChildren()[0].getChildren()[0];
    expect(getPathToFirstParent(grandChild, '-')).toEqual('1-2-3');
  });

  it('computeConnectionBetweenSelectedMovies returns a nice message telling the user what they should do', () => {
    const state: IMovieState = {
      movies: []
    }
    expect(computeConnectionBetweenSelectedMovies(state)).toEqual(content.selectTwoMovies);
  });

  it('computeConnectionBetweenSelectedMovies returns a different nice message when it not find any connection', () => {
    const state: IMovieState = {
      movies: [...movies, someOtherMovie],
      firstSelectedMovie: m1,
      secondSelectedMovie: someOtherMovie
    }
    expect(computeConnectionBetweenSelectedMovies(state)).toEqual(content.cannotFindConnection);
  });

  it('computeConnectionBetweenSelectedMovies returns immediately connected movies directly', () => {
    const state: IMovieState = {
      movies,
      firstSelectedMovie: m1,
      secondSelectedMovie: m2
    }
    expect(computeConnectionBetweenSelectedMovies(state)).toEqual(m1.title + content.connectionSeparator + m2.title);
  });

  it('computeConnectionBetweenSelectedMovies returns more complicated connections too', () => {
    const state: IMovieState = {
      movies,
      firstSelectedMovie: m1,
      secondSelectedMovie: m3
    }
    expect(computeConnectionBetweenSelectedMovies(state)).toEqual(m1.title + content.connectionSeparator + m2.title + content.connectionSeparator + m3.title);
  });
});