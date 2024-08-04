import Component from '../Component/Component';
import style from './Container.css';

class Container extends Component {
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
        <div class="container">
          <slot></slot>
        </div>
      `;
        }
    }
}

customElements.define('container-component', Container);
