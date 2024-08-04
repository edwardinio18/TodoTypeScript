import './components/generic/Button/Button';
import './components/generic/Container/Container';
import './components/generic/FormField/FormField';
import './components/generic/TodoItem/TodoItem';
import './components/generic/TodoList/TodoList';
import './components/generic/TodoContainer/TodoContainer';
import './components/generic/Text/Text';

document.getElementById('add-todo')?.addEventListener('click', () => {
    const formField = document.getElementById('new-todo') as HTMLInputElement & {
        validate: () => boolean;
    };

    if (formField?.validate()) {
        const description = formField.value;
        const todoList = document.getElementById('todo-list') as HTMLElement & {
            addTodo: (description: string) => void;
        };

        todoList?.addTodo(description);
        formField.value = '';
    }
});
