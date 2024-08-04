import Component from "../Component/Component.js";

class Text extends Component {
  constructor() {
    super();

    if (!this.shadowRoot) {
      this.attachShadow({
        mode: "open",
      });
    }
  }

  render() {
    const type = this.getAttribute("type") || "span";
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/components/generic/Text/Text.css">
      <${type}><slot></slot></${type}>
    `;
  }
}

customElements.define("text-component", Text);
