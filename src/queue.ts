

// class ListNode {
//     val: number | null;
//     next: ListNode | null;

//     constructor(val: number | null = null, next: ListNode | null = null) {
//         this.val = val;
//         this.next = next;

//     }
// }

class ListNode<T> {
    constructor(public val: T, public next: ListNode<T> | null) {}
}

export class Queue {
    private head: ListNode<any> | null;
    private tail: ListNode<any> | null;

    constructor(arr: any[]) {
        this.head = null;
        this.tail = null;

        arr.forEach((data) => {
            this.enqueue(data)
        })

    }

    get isEmpty() {
        return (this.head === null && this.tail === null);
    }

    enqueue(data : any): void {
        const node = new ListNode(data, null)

        // empty queue.
        if (this.tail === null) {
            this.head = node;
            this.tail = node;
            return
        }

        this.tail.next = node
        this.tail = node
    }

    dequeue(): any {
        // empty queue.
        if (this.head === null) {
            return undefined;
        }

        const node = this.head;
        this.head = this.head.next;

        if (this.head === null) {
            this.tail = null;
        }
        return node.val
    }

    printQueue() {
        let ret = []
        let temp = this.head;
        while (temp !== null && this.head.next !== this.tail) {
            ret.push(temp.val)
            temp = temp.next

        }
        return ret
    }


}