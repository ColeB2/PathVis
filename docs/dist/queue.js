class ListNode {
  constructor(val, next) {
    this.val = val;
    this.next = next;
  }
}
export class Queue {
  constructor(arr) {
    this.head = null;
    this.tail = null;
    arr.forEach((data) => {
      this.enqueue(data);
    });
  }
  get isEmpty() {
    return this.head === null && this.tail === null;
  }
  enqueue(data) {
    const node = new ListNode(data, null);
    if (this.tail === null) {
      this.head = node;
      this.tail = node;
      return;
    }
    this.tail.next = node;
    this.tail = node;
  }
  dequeue() {
    if (this.head === null) {
      return void 0;
    }
    const node = this.head;
    this.head = this.head.next;
    if (this.head === null) {
      this.tail = null;
    }
    return node.val;
  }
  printQueue() {
    let ret = [];
    let temp = this.head;
    while (temp !== null && temp.next !== this.tail) {
      ret.push(temp.val);
      temp = temp.next;
    }
    return ret;
  }
}
