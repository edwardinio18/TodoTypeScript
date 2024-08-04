import Component from "../Component/Component.js";

class Container extends Component {
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
      <link rel="stylesheet" href="/components/generic/Container/Container.css">
      <div class="container">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("container-component", Container);
