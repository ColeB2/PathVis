export function minNumberCompare(num1, num2) {
  return num1 - num2;
}
export function MaxNumberComparer(num1, num2) {
  return num2 - num1;
}
export class Heap {
  constructor(compareFunction) {
    this.items = [];
    this.itemToIndexMap = new Map();
    this.innerCompare = compareFunction;
  }
  peek() {
    return this.items[0];
  }
  add(item) {
    if (this.itemToIndexMap.has(item)) {
      throw new Error("Connot add an item that is already in the heap.");
    }
    this.items.push(item);
    this.itemToIndexMap.set(item, this.items.length - 1);
    this.bubbleUpToPlace(this.items.length - 1);
  }
  pop() {
    if (this.isEmpty)
      return void 0;
    let obj = this.items[0];
    this.removeAt(0);
    return obj;
  }
  get size() {
    return this.items.length;
  }
  get isEmpty() {
    return this.items.length === 0;
  }
  remove(item) {
    let index = this.itemToIndexMap.get(item);
    if (index === void 0)
      return false;
    this.removeAt(index);
    return true;
  }
  clear() {
    this.items.length = 0;
    this.itemToIndexMap.clear();
  }
  contains(item) {
    return this.itemToIndexMap.has(item);
  }
  [Symbol.iterator]() {
    return this.items[Symbol.iterator]();
  }
  compare(a, b) {
    let result = this.innerCompare(a, b);
    if (typeof result !== "number")
      throw new Error(`The typeof compare result cannot be different from number: ${result}`);
    if (isNaN(result))
      throw new Error(`Compare result cannot be is NaN.`);
    return result;
  }
  removeAt(index) {
    if (this.items.length === 1) {
      this.clear();
      return;
    }
    if (index === this.items.length - 1) {
      this.itemToIndexMap.delete(this.items[this.items.length - 1]);
      this.items.length = this.items.length - 1;
      return;
    }
    let poppedItem = this.items[index];
    this.itemToIndexMap.delete(poppedItem);
    this.items[index] = this.items[this.items.length - 1];
    this.items.splice(this.items.length - 1, 1);
    this.itemToIndexMap.set(this.items[index], index);
    let compare = this.compare(this.items[index], poppedItem);
    if (compare < 0) {
      this.bubbleUpToPlace(index);
    } else if (compare > 0) {
      this.bubbleDownToPlace(index);
    }
  }
  getLeftChildIndex(nodeIndex) {
    return 2 * nodeIndex + 1;
  }
  getParentIndex(nodeIndex) {
    return Math.floor((nodeIndex - 1) / 2);
  }
  getSmallerChildIndex(leftChildIndex, rightChildIndex) {
    if (rightChildIndex >= this.items.length) {
      if (leftChildIndex >= this.items.length) {
        return void 0;
      } else {
        return leftChildIndex;
      }
    } else {
      if (leftChildIndex >= this.items.length) {
        return rightChildIndex;
      } else if (this.compare(this.items[leftChildIndex], this.items[rightChildIndex]) <= 0) {
        return leftChildIndex;
      } else {
        return rightChildIndex;
      }
    }
  }
  bubbleUpToPlace(index) {
    if (index === 0)
      return;
    let indexData = this.items[index];
    while (true) {
      let parentIndex = this.getParentIndex(index);
      let parentData = this.items[parentIndex];
      if (this.compare(parentData, indexData) <= 0)
        break;
      this.swap(index, parentIndex, indexData, parentData);
      if (parentIndex === 0)
        break;
      index = parentIndex;
    }
  }
  bubbleDownToPlace(index) {
    let leftChildIndex = this.getLeftChildIndex(index);
    let smallerChildIndex = this.getSmallerChildIndex(leftChildIndex, leftChildIndex + 1);
    while (smallerChildIndex !== void 0) {
      let indexData = this.items[index];
      let smallerChildData = this.items[smallerChildIndex];
      if (this.compare(indexData, smallerChildData) < 0)
        break;
      this.swap(index, smallerChildIndex, indexData, smallerChildData);
      index = smallerChildIndex;
      leftChildIndex = this.getLeftChildIndex(index);
      smallerChildIndex = this.getSmallerChildIndex(leftChildIndex, leftChildIndex + 1);
    }
  }
  swap(i1, i2, data1, data2) {
    data1 = data1 || this.items[i1];
    data2 = data2 || this.items[i2];
    let temp = data1;
    this.items[i1] = data2;
    this.items[i2] = temp;
    this.itemToIndexMap.set(data1, i2);
    this.itemToIndexMap.set(data2, i1);
  }
}
