import Component from "../Component/Component.js";

class Button extends Component {
  constructor() {
    super();

    if (!this.shadowRoot) {
      this.attachShadow({
        mode: "open",
      });
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/components/generic/Button/Button.css">
      <button><slot></slot></button>
    `;
  }
}

customElements.define("button-component", Button);
