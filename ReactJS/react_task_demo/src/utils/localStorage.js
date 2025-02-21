export const getTodosFromStorage = () =>
  JSON.parse(localStorage.getItem("todos")) || [];
export const saveTodosToStorage = (todos) =>
  localStorage.setItem("todos", JSON.stringify(todos));
