import React from 'react'
import { useTodoContext } from '../context/TodoContext';

function TodoItem({ todo }) {
    const {updateTodo, deleteTodo, toggleTodo} = useTodoContext();
    const [isTodoEditable, setIsTodoEditable] = React.useState(false);
    const [todoMsg, setTodoMsg] = React.useState(todo.title);
    const editTodo = () => { 
        updateTodo(todo.id, { ...todo, title: todoMsg });
        setIsTodoEditable(false);
    }
    const toggleCompleted = () => {
        toggleTodo(todo.id);
        if (todo.completed) {
            document.getElementById(`todo-${todo.id}`).classList.add('bg-green-200');
        } else {
            document.getElementById(`todo-${todo.id}`).classList.remove('bg-green-200');
        }
    }
  return (
        <div
            id={`todo-${todo.id}`}
            className={`flex items-center border border-gray-300 rounded-lg px-4 py-2 gap-x-3 shadow-sm duration-300 ${
                todo.completed ? "bg-green-100" : "bg-white"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-gray-300 px-2" : "border-transparent"
                } ${todo.completed ? " text-gray-500" : "text-black"}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-gray-300 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "Save" : "Edit"}
            </button>
            <button
                className="inline-flex w-12 h-8 rounded-lg text-sm border border-gray-300 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                Delete
            </button>
        </div>
    );
}

export default TodoItem