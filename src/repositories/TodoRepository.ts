import { ITodo } from '../interfaces/ITodo';

class TodoRepository {
    private _todos: ITodo[];
    private _currentId: number;

    constructor() {
        this._todos = this.loadTodos();
        this._currentId = this.getCurrentId();
    }

    /**
     * Load the todos from local storage.
     *
     * @returns {ITodo[]}
     */
    loadTodos(): ITodo[] {
        const todosJson = localStorage.getItem('todos');
        let todos: ITodo[] = [];

        if (todosJson) {
            todos = JSON.parse(todosJson).map((t: { id: number; description: string }) => ({
                id: t.id,
                description: t.description,
            }));
        }

        return todos;
    }

    /**
     * Save the todos to local storage.
     *
     * @returns {void}
     */
    saveTodos(): void {
        localStorage.setItem('todos', JSON.stringify(this._todos));
    }

    /**
     * Get the current id for a new todo.
     *
     * @returns {number}
     */
    getCurrentId(): number {
        const todos = this.getAll();

        if (todos.length === 0) return 1;

        return Math.max(...todos.map((todo) => todo.id)) + 1;
    }

    /**
     * Get all todos.
     *
     * @returns {ITodo[]}
     */
    getAll(): ITodo[] {
        return this._todos;
    }

    /**
     * Add a new todo.
     *
     * @param {ITodo} todo
     *   The todo to add
     *
     * @returns {ITodo}
     *   The todo that was added
     */
    add(todo: { description: string }): ITodo {
        const newId = this.getCurrentId();
        const todoEntity: ITodo = {
            id: newId,
            description: todo.description,
        };

        this._todos.push(todoEntity);
        this.saveTodos();

        return todoEntity;
    }

    /**
     * Remove a todo by id.
     *
     * @param {number} id
     *   The id of the todo to remove
     *
     * @returns {void}
     */
    remove(id: number): void {
        this._todos = this._todos.filter((todo) => todo.id !== id);
        this.saveTodos();
    }

    /**
     * Edit a todo.
     *
     * @param {number} id
     *   The id of the todo to edit
     * @param {string} description
     *   The new description of the todo
     *
     *  @returns {void}
     */
    edit(id: number, description: string): void {
        const todo = this._todos.find((todo) => todo.id === id);

        if (todo) {
            todo.description = description;
            this.saveTodos();
        }
    }
}

export { TodoRepository };
