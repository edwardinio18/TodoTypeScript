import Component from '../Component/Component';
import style from './Button.css';

class Button extends Component {
    constructor() {
        super();

        if (!this.shadowRoot) {
            this.attachShadow({
                mode: 'open',
            });
        }
    }

    render(): void {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
        <style>${style}</style>
        <button><slot></slot></button>
      `;
        }
    }
}

customElements.define('button-component', Button);
