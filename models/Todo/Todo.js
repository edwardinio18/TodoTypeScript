class Todo {
  constructor(id, description) {
    this._id = id;
    this._description = description;
  }

  get description() {
    return this._description;
  }

  get id() {
    return this._id;
  }
}

export { Todo };