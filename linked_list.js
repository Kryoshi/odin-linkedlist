class LinkedList {
  head = null;
  tail = null;
  size = 0;

  constructor(...values) {
    for (let value of values) {
      this.append(value);
    }
  }

  append(value) {
    const node = new Node(value);
    if (this.head !== null) {
      this.tail.next = node;
      node.previous = this.tail;
      this.tail = node;
    } else {
      this.head = node;
      this.tail = node;
    }
    this.size++;
  }

  prepend(value) {
    const node = new Node(value);
    if (this.head !== null) {
      node.next = this.head;
      this.head.previous = node;
      this.head = node;
    } else {
      this.head = node;
      this.tail = node;
    }
    this.size++;
  }

  insertAt(index, value) {
    if (typeof index === 'number') {
      if (index === this.size) {
        this.append(value);
      } else if (index === 0) {
        this.prepend(value);
      } else if (index > 0 && index < this.size) {
        const node = this.at(index);
        if (node !== null) {
          const newNode = new Node(value);
          node.previous.next = newNode;
          newNode.previous = node.previous;
          newNode.next = node;
          node.previous = newNode;
        }
        this.size++;
      }
    }
  }

  removeAt(index) {
    if (typeof index === 'number') {
      if (index === this.size - 1) {
        this.pop();
      } else if (index === 0) {
        this.popFirst();
      } else if (index >= 0 && index < this.size) {
        let node = this.at(index);
        if (node !== null) {
          node.previous.next = node.next;
          node.next.previous = node.previous;
          node = null;
        }
        this.size--;
      }
    }
  }

  at(index) {
    let i = 0;
    let node = this.head;
    while (node !== null && i < index) {
      node = node.next;
      ++i;
    }
    return node;
  }

  pop() {
    if (this.size > 0) {
      if (this.size > 1) {
        this.tail = this.tail.previous;
        this.tail.next = null;
      } else {
        this.tail = null;
        this.head = null;
      }
      this.size--;
    }
  }

  popFirst() {
    if (this.size > 1) {
      if (this.size > 1) {
        this.head = this.head.next;
        this.head.previous = null;
      } else {
        this.tail = null;
        this.head = null;
      }
      this.size--;
    }
  }

  contains(value) {
    let node = this.head;
    while (node !== null) {
      if (node.value === value) {
        return true;
      }
      node = node.next;
    }
    return false;
  }

  find(value) {
    let index = 0;
    let node = this.head;
    while (node !== null) {
      if (node.value === value) {
        return index;
      }
      node = node.next;
      index++;
    }
    return null;
  }

  toString() {
    const linkString = ' -> ';
    let node = this.head;
    let nodeString = '';
    while (node !== null) {
      nodeString += node.value + linkString;
      node = node.next;
    }
    nodeString += null;
    return nodeString;
  }
}

class Node {
  value;
  next;
  previous;

  constructor(value = null, next = null, previous = null) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }
}
