/**
 * Recursive data structure that can be used to build a tree
 */
export class TreeNode<T> {
  private value: T;
  private parent: TreeNode<T> | null = null;
  private children: TreeNode<T>[];

  public constructor(item: T, parent?: TreeNode<T>) {
    this.value = item;
    if (parent) {
      this.parent = parent;
    }
    this.children = [];
  }

  public addChild = (childValue: T): TreeNode<T> => {
    const child = new TreeNode(childValue, this);
    this.children.push(child);
    return child;
  }

  public getParent = () => this.parent;

  public getValue = () => this.value;

  public getChildren = () => this.children;
}
