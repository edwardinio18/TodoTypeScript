import Component from "../Component/Component.js";

class FormField extends Component {
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
      <link rel="stylesheet" href="/components/generic/FormField/FormField.css">
      <div class="form-field">
        <label><slot name="label"></slot></label>
        <input type="text" />
        <div class="error">This field cannot be empty</div>
      </div>
    `;
  }

  get value() {
    return this.shadowRoot.querySelector("input").value;
  }

  set value(newValue) {
    this.shadowRoot.querySelector("input").value = newValue;
  }

  validate() {
    const input = this.shadowRoot.querySelector("input");
    const error = this.shadowRoot.querySelector(".error");
    if (input.value.trim() === "") {
      error.style.display = "block";
      return false;
    } else {
      error.style.display = "none";
      return true;
    }
  }
}

customElements.define("formfield-component", FormField);
