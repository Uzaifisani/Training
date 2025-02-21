import { useState } from "react";
import { useTodoContext } from "../../context/TodoContext";

const TodoItem = ({ todo }) => {
    const { updateTodo, deleteTodo, toggleTodo } = useTodoContext();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);

    const handleEdit = () => {
        if (isEditing && title.trim()) updateTodo(todo.id, title.trim());
        setIsEditing(!isEditing);
    };

    return (
        <div className={`flex items-center gap-2 p-2 rounded-lg border m-2 ${todo.completed ? 'bg-green-100' : 'bg-white'}`}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
            <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                readOnly={!isEditing}
                className={`${isEditing ? 'border-gray-300' : 'border-transparent'}`}
            />
            <div className="ml-auto flex gap-2  p-1" >
                <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
        </div>
   );
};

export default TodoItem;