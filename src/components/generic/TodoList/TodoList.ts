import Component from '../Component/Component';
import { TodoRepository } from '../../../repositories/TodoRepository';
import style from './TodoList.css';

class TodoList extends Component {
    private todoRepository: TodoRepository;

    constructor() {
        super();

        if (!this.shadowRoot) {
            this.attachShadow({
                mode: 'open',
            });
        }

        this.todoRepository = new TodoRepository();
    }

    connectedCallback(): void {
        this.render();
    }

    render(): void {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
        <style>${style}</style>
        <ul class="todo-list">
          ${this.todoRepository
              .getAll()
              .map(
                  (todo) => `
            <todo-item-component id="${todo.id}" description="${todo.description}"></todo-item-component>
          `
              )
              .join('')}
        </ul>
      `;

            this.shadowRoot.querySelectorAll('todo-item-component').forEach((item) => {
                item.addEventListener('save-todo', this.handleSaveTodo.bind(this) as EventListener);
                item.addEventListener('delete-todo', this.handleDeleteTodo.bind(this) as EventListener);
            });
        }
    }

    addTodo(description: string): void {
        const newTodo = this.todoRepository.add({ description });
        const ul = this.shadowRoot?.querySelector('.todo-list');
        if (ul) {
            const todoItem = document.createElement('todo-item-component');
            todoItem.setAttribute('id', newTodo.id.toString());
            todoItem.setAttribute('description', newTodo.description);
            ul.appendChild(todoItem);
            todoItem.addEventListener('save-todo', this.handleSaveTodo.bind(this) as EventListener);
            todoItem.addEventListener('delete-todo', this.handleDeleteTodo.bind(this) as EventListener);
        }
    }

    handleSaveTodo(e: Event): void {
        const event = e as CustomEvent;
        this.saveTodo(event.detail.id, event.detail.description);
    }

    handleDeleteTodo(e: Event): void {
        const event = e as CustomEvent;
        this.deleteTodo(event.detail.id);
    }

    saveTodo(id: string, newDescription: string): void {
        this.todoRepository.edit(parseInt(id), newDescription);
        this.render();
    }

    deleteTodo(id: string): void {
        this.todoRepository.remove(parseInt(id));
        this.render();
    }
}

customElements.define('todo-list-component', TodoList);
