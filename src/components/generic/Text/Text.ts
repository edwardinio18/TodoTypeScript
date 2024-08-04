import Component from '../Component/Component';
import style from './Text.css';

class Text extends Component {
    constructor() {
        super();

        if (!this.shadowRoot) {
            this.attachShadow({
                mode: 'open',
            });
        }
    }

    render(): void {
        const type = this.getAttribute('type') || 'span';
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
        <style>${style}</style>
        <${type}><slot></slot></${type}>
      `;
        }
    }
}

customElements.define('text-component', Text);
