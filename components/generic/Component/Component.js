export default class Component extends HTMLElement {
  constructor() {
    super();

    if (!this.shadowRoot) {
      this.attachShadow({
        mode: "open",
      });
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    throw new Error("Render method should be implemented in the derived class");
  }
}
