import { TreeNode } from './TreeNode';

type Thing = {a: string};

const thing1 = {a: '1'};
const thing2 = {a: '2'};

let node: TreeNode<Thing> = new TreeNode(thing1);

beforeEach(() => {
  node = new TreeNode(thing1);
})

describe('Node', () => {

  it('addChild adds a child', () => {
    node.addChild(thing2);
    expect(node.getChildren().length).toEqual(1);
  });

  it('addChild returns the child it added', () => {
    expect(node.addChild(thing2).getValue()).toEqual((new TreeNode(thing2, node)).getValue());
  });

  it('getParent returns null if there is no parent', () => {
    expect(node.getParent()).toEqual(null);
  });

  it('getParent returns the parent node if there is one', () => {
    node.addChild(thing2);
    expect(node.getChildren()[0].getParent()).toEqual(node);
  });

  it('getchildren returns an empty array if there are no children', () => {
    expect(node.getChildren()).toEqual([]);
  });

  it('getchildren returns an array of TreeNode', () => {
    const child = node.addChild(thing2);
    expect(node.getChildren()).toEqual([child]);
  });

  it('getValue returns the value that the node has been instantiated with', () => {
    expect(node.getValue()).toEqual(thing1);
  });
});