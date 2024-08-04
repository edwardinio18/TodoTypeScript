import Component from "../Component/Component.js";

class TodoContainer extends Component {
  render() {
    super.render();
    this.shadowRoot.innerHTML += `
      <link rel="stylesheet" href="/components/generic/TodoContainer/TodoContainer.css">
      <todo-list-component></todo-list-component>
    `;
  }
}

customElements.define("todo-container-component", TodoContainer);
