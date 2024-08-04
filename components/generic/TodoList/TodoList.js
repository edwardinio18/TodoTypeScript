import Component from "../Component/Component.js";
import { TodoRepository } from "../../../repositories/TodoRepository.js";

class TodoList extends Component {
  constructor() {
    super();

    if (!this.shadowRoot) {
      this.attachShadow({
        mode: "open",
      });
    }

    this.todoRepository = new TodoRepository();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/components/generic/TodoList/TodoList.css">
      <ul class="todo-list">
        ${this.todoRepository
          .getAll()
          .map(
            (todo) => `
          <todo-item-component id="${todo._id}" description="${todo._description}"></todo-item-component>
        `,
          )
          .join("")}
      </ul>
    `;

    this.shadowRoot.querySelectorAll("todo-item-component").forEach((item) => {
      item.addEventListener("save-todo", (e) =>
        this.saveTodo(e.detail.id, e.detail.description),
      );
      item.addEventListener("delete-todo", (e) => this.deleteTodo(e.detail.id));
    });
  }

  addTodo(description) {
    const newTodo = this.todoRepository.add({ description });
    const ul = this.shadowRoot.querySelector(".todo-list");
    const todoItem = document.createElement("todo-item-component");
    todoItem.setAttribute("id", newTodo._id);
    todoItem.setAttribute("description", newTodo._description);
    ul.appendChild(todoItem);
    todoItem.addEventListener("save-todo", (e) =>
      this.saveTodo(e.detail.id, e.detail.description),
    );
    todoItem.addEventListener("delete-todo", (e) =>
      this.deleteTodo(e.detail.id),
    );
  }

  saveTodo(id, newDescription) {
    this.todoRepository.edit(parseInt(id), newDescription);
    this.render();
  }

  deleteTodo(id) {
    this.todoRepository.remove(parseInt(id));
    this.render();
  }
}

customElements.define("todo-list-component", TodoList);
