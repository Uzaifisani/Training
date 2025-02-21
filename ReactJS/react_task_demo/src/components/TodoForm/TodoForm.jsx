import { useState } from "react";
import { useTodoContext } from "../../context/TodoContext";

const TodoForm = () => {
    const [todo, setTodo] = useState("");
    const { addTodo } = useTodoContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!todo.trim()) return;
        addTodo(todo.trim());
        setTodo("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input 
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="Write Todo..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none duration-150 bg-white"
            />
            <button 
                type="submit"
                className="rounded-lg px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 duration-150"
            >
                Add
            </button>
        </form>
    );
};

export default TodoForm;
