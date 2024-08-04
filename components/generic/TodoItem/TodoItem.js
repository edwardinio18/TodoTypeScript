import Component from "../Component/Component.js";

class TodoItem extends Component {
  constructor() {
    super();

    if (!this.shadowRoot) {
      this.attachShadow({
        mode: "open",
      });
    }
  }

  render() {
    const id = this.getAttribute("id");
    const description = this.getAttribute("description");
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/components/generic/TodoItem/TodoItem.css">
      <div class="todo-item">
        <span class="description">${description}</span>
        <div>
          <button-component class="edit list_item_button" data-id="${id}">Edit</button-component>
          <button-component class="save list_item_button" data-id="${id}" style="display:none;">Save</button-component>
          <button-component class="delete list_item_button" data-id="${id}">Delete</button-component>
        </div>
      </div>
    `;
    this.shadowRoot
      .querySelector(".edit")
      .addEventListener("click", () => this.editTodo());
    this.shadowRoot
      .querySelector(".save")
      .addEventListener("click", () => this.saveTodo());
    this.shadowRoot
      .querySelector(".delete")
      .addEventListener("click", () => this.deleteTodo());
  }

  editTodo() {
    const descriptionElem = this.shadowRoot.querySelector(".description");
    descriptionElem.contentEditable = "true";
    descriptionElem.focus();
    this.shadowRoot.querySelector(".edit").style.display = "none";
    this.shadowRoot.querySelector(".save").style.display = "inline-block";
  }

  saveTodo() {
    const descriptionElem = this.shadowRoot.querySelector(".description");
    descriptionElem.contentEditable = "false";
    const newDescription = descriptionElem.innerText.trim();
    if (newDescription !== "") {
      const event = new CustomEvent("save-todo", {
        detail: {
          id: this.getAttribute("id"),
          description: newDescription,
        },
      });
      this.dispatchEvent(event);
    }
    this.shadowRoot.querySelector(".edit").style.display = "inline-block";
    this.shadowRoot.querySelector(".save").style.display = "none";
  }

  deleteTodo() {
    const event = new CustomEvent("delete-todo", {
      detail: { id: this.getAttribute("id") },
    });
    this.dispatchEvent(event);
  }
}

customElements.define("todo-item-component", TodoItem);
