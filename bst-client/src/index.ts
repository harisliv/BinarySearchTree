import { BSTree, Comparator } from 'bst-lib';

class Apple {
  data: number;
  constructor(data: number) {
    this.data = data;
  }
  toString: () => string = () => {
    return `A${this.data}`;
  };
}

const applesComparator: Comparator<Apple> = (a: Apple, b: Apple): number =>
  a.data - b.data;

const tree = new BSTree<Apple>(applesComparator);
tree.add(new Apple(15));
tree.add(new Apple(7));
tree.add(new Apple(16));
tree.add(new Apple(17));
tree.add(new Apple(8));
tree.add(new Apple(10));
tree.add(new Apple(11));
tree.add(new Apple(12));
tree.add(new Apple(2));
tree.add(new Apple(1));
tree.add(new Apple(19));
tree.add(new Apple(18));
tree.add(new Apple(9));
console.log(`${tree}`);
