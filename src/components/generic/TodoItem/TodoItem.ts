import Component from '../Component/Component';
import style from './TodoItem.css';

class TodoItem extends Component {
    constructor() {
        super();

        if (!this.shadowRoot) {
            this.attachShadow({
                mode: 'open',
            });
        }
    }

    render(): void {
        const id = this.getAttribute('id');
        const description = this.getAttribute('description');
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
        <style>${style}</style>
        <div class="todo-item">
          <span class="description">${description}</span>
          <div>
            <button-component class="edit list_item_button" data-id="${id}">Edit</button-component>
            <button-component class="save list_item_button" data-id="${id}" style="display:none;">Save</button-component>
            <button-component class="delete list_item_button" data-id="${id}">Delete</button-component>
          </div>
        </div>
      `;

            this.shadowRoot.querySelector('.edit')?.addEventListener('click', () => this.editTodo());
            this.shadowRoot.querySelector('.save')?.addEventListener('click', () => this.saveTodo());
            this.shadowRoot.querySelector('.delete')?.addEventListener('click', () => this.deleteTodo());
        }
    }

    editTodo(): void {
        const descriptionElem = this.shadowRoot?.querySelector('.description') as HTMLElement | null;
        const editButton = this.shadowRoot?.querySelector('.edit') as HTMLElement | null;
        const saveButton = this.shadowRoot?.querySelector('.save') as HTMLElement | null;

        if (descriptionElem && editButton && saveButton) {
            descriptionElem.contentEditable = 'true';
            descriptionElem.focus();
            editButton.style.display = 'none';
            saveButton.style.display = 'inline-block';
        }
    }

    saveTodo(): void {
        const descriptionElem = this.shadowRoot?.querySelector('.description') as HTMLElement | null;
        const editButton = this.shadowRoot?.querySelector('.edit') as HTMLElement | null;
        const saveButton = this.shadowRoot?.querySelector('.save') as HTMLElement | null;

        if (descriptionElem && editButton && saveButton) {
            descriptionElem.contentEditable = 'false';
            const newDescription = descriptionElem.innerText.trim();
            if (newDescription !== '') {
                const event = new CustomEvent('save-todo', {
                    detail: {
                        id: this.getAttribute('id'),
                        description: newDescription,
                    },
                });
                this.dispatchEvent(event);
            }
            editButton.style.display = 'inline-block';
            saveButton.style.display = 'none';
        }
    }

    deleteTodo(): void {
        const event = new CustomEvent('delete-todo', {
            detail: { id: this.getAttribute('id') },
        });
        this.dispatchEvent(event);
    }
}

customElements.define('todo-item-component', TodoItem);
