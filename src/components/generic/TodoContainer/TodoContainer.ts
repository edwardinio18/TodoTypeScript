import Component from '../Component/Component';
import style from './TodoContainer.css';

class TodoContainer extends Component {
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
        <todo-list-component></todo-list-component>
      `;
        }
    }
}

customElements.define('todo-container-component', TodoContainer);
