import { Todo } from "../models/Todo/Todo.js";

class TodoRepository {
  constructor() {
    this._todos = this.loadTodos();
    this._currentId = this.getCurrentId();
  }

  /**
   * Load the todos from local storage.
   *
   * @returns {Todo[]|[]}
   */
  loadTodos() {
    let todos = localStorage.getItem("todos");

    todos = todos ? JSON.parse(todos).map(t => new Todo(t._id, t._description)) : [];

    return todos;
  }

  /**
   * Save the todos to local storage.
   *
   * @returns {void}
   */
  saveTodos() {
    localStorage.setItem("todos", JSON.stringify(this._todos));
  }

  /**
   * Get the current id for a new todo.
   *
   * @returns {number}
   */
  getCurrentId() {
    const todos = this.getAll();

    if (todos.length === 0) return 1;

    return Math.max(...todos.map(todo => todo._id)) + 1;
  }

  /**
   * Get all todos.
   *
   * @returns {Todo[]}
   */
  getAll() {
    return this._todos;
  }

  /**
   * Add a new todo.
   *
   * @param {Todo} todo
   *   The todo to add
   *
   * @returns {Todo}
   *   The todo that was added
   */
  add(todo) {
    const newId = this.getCurrentId();
    const todoEntity = new Todo(newId, todo.description);

    this._todos.push(todoEntity);
    this.saveTodos();

    return todoEntity;
  }

  remove(id) {
    this._todos = this._todos.filter(todo => todo.id !== id);
    this.saveTodos();
  }

  /**
   * Edit a todo.
   *
   * @param id
   *   The id of the todo to edit
   * @param description
   *   The new description of the todo
   *
   *  @returns {void}
   */
  edit(id, description) {
    const todo = this._todos.find(todo => todo.id === id);

    if (todo) {
      todo._description = description;
      this.saveTodos();
    }
  }
}

export { TodoRepository };