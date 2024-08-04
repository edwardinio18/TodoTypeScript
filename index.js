import "./components/generic/Button/Button.js";
import "./components/generic/Container/Container.js";
import "./components/generic/FormField/FormField.js";
import "./components/generic/TodoItem/TodoItem.js";
import "./components/generic/TodoList/TodoList.js";
import "./components/generic/TodoContainer/TodoContainer.js";
import "./components/generic/Text/Text.js";

document.getElementById("add-todo").addEventListener("click", () => {
  const formField = document.getElementById("new-todo");
  if (formField.validate()) {
    const description = formField.value;
    const todoList = document.getElementById("todo-list");
    todoList.addTodo(description);
    formField.value = "";
  }
});
