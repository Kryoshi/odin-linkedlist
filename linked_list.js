class LinkedList {
  #head = null;
  #tail = null;
  #length = 0;

  constructor(...values) {
    for (let value of values) {
      this.append(value);
    }
  }

  get head() {
    return this.#head;
  }
  get tail() {
    return this.#tail;
  }
  get length() {
    return this.#length;
  }

  append(value) {
    const node = new Node(value);
    if (this.#head !== null) {
      this.#tail.next = node;
      node.previous = this.#tail;
      this.#tail = node;
    } else {
      this.#head = node;
      this.#tail = node;
    }
    this.#length++;
  }

  prepend(value) {
    const node = new Node(value);
    if (this.#head !== null) {
      node.next = this.#head;
      this.#head.previous = node;
      this.#head = node;
    } else {
      this.#head = node;
      this.#tail = node;
    }
    this.#length++;
  }

  insertAt(index, value) {
    if (typeof index === 'number') {
      if (index === this.#length) {
        this.append(value);
      } else if (index === 0) {
        this.prepend(value);
      } else if (index > 0 && index < this.#length) {
        const node = this.at(index);
        if (node !== null) {
          const newNode = new Node(value);
          node.previous.next = newNode;
          newNode.previous = node.previous;
          newNode.next = node;
          node.previous = newNode;
        }
        this.#length++;
      }
    }
  }

  removeAt(index) {
    if (typeof index === 'number') {
      if (index === this.#length - 1) {
        this.pop();
      } else if (index === 0) {
        this.popFirst();
      } else if (index >= 0 && index < this.#length) {
        let node = this.at(index);
        if (node !== null) {
          node.previous.next = node.next;
          node.next.previous = node.previous;
          node = null;
        }
        this.#length--;
      }
    }
  }

  at(index) {
    let i = 0;
    let node = this.#head;
    while (node !== null && i < index) {
      node = node.next;
      ++i;
    }
    return node;
  }

  pop() {
    if (this.#length > 0) {
      if (this.#length > 1) {
        this.#tail = this.#tail.previous;
        this.#tail.next = null;
      } else {
        this.#tail = null;
        this.#head = null;
      }
      this.#length--;
    }
  }

  popFirst() {
    if (this.#length > 1) {
      if (this.#length > 1) {
        this.#head = this.#head.next;
        this.#head.previous = null;
      } else {
        this.#tail = null;
        this.#head = null;
      }
      this.#length--;
    }
  }

  contains(value) {
    let node = this.#head;
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
    let node = this.#head;
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
    let node = this.#head;
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
