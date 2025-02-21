import { useTodoContext } from "../../context/TodoContext";
import TodoItem from "../TodoItem/TodoItem";

const TodoList = () => {
    const { todos } = useTodoContext();

    return (
        <div className="space-y-4">
            {todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
        </div>
    );
};

export default TodoList;