/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
export interface Comparator<V> {
  (a: V, b: V): number;
}

class Node<T> {
  tree: BSTree<T>;

  value: T;

  right?: Node<T>;

  left?: Node<T>;

  constructor(value: T, tree: BSTree<T>) {
    this.value = value;
    this.tree = tree;
  }

  contains(data: T): boolean {
    if (this.tree.comparator(this.value, data) === 0) {
      return true;
    }
    if (this.tree.comparator(this.value, data) > 0 && this.left) {
      return this.left.contains(data);
    }
    if (this.tree.comparator(this.value, data) < 0 && this.right) {
      return this.right.contains(data);
    }
    return false;
  }

  add(data: T): void {
    if (this.tree.comparator(this.value, data) > 0) {
      if (!this.left) {
        this.left = new Node(data, this.tree);
      } else {
        this.left.add(data);
      }
    } else if (!this.right) {
      this.right = new Node(data, this.tree);
    } else {
      this.right.add(data);
    }
  }

  print(isLeft?: boolean, prefix = ''): string {
    let str = '';
    if (this.right) {
      str += this.right.print(
        false,
        prefix + (isLeft === true ? '|   ' : '    ')
      );
    }
    if (isLeft === null || isLeft === undefined) {
      str += `${prefix}─── ${this.value}\n`;
    } else if (isLeft === true) {
      str += `${prefix}└── ${this.value}\n`;
    } else if (isLeft === false) {
      str += `${prefix}┌── ${this.value}\n`;
    }
    if (this.left) {
      str += this.left.print(
        true,
        prefix + (isLeft === false ? '|   ' : '    ')
      );
    }
    return str;
  }
}

export class BSTree<T> {
  comparator: Comparator<T>;

  root?: Node<T>;

  constructor(comparator?: Comparator<T>) {
    this.comparator =
      comparator ||
      ((a: T, b: T) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
      });
  }

  contains(data: T): boolean {
    if (!this.root) {
      return false;
    }
    return this.root.contains(data);
  }

  add(data: T): void {
    if (this.contains(data)) {
      throw new Error('Element already exists');
    }
    if (!this.root) {
      this.root = new Node(data, this);
    } else {
      this.root.add(data);
    }
  }

  toString(): string {
    return this.root ? this.root.print() : '[emtpy]';
  }
}
