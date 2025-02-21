import TodoForm from "./TodoForm/TodoForm";
import TodoList from "./TodoList/TodoList";

const TodoMain = () => (
    <div className="bg-gray-100 min-h-screen py-8">
        <div className="w-full max-w-3xl mx-auto shadow-lg rounded-lg px-6 py-4 bg-white">
            <h1 className="text-3xl font-bold text-center mb-8">Todo Manager</h1>
            <TodoForm />
            <TodoList />
        </div>
    </div>
);

export default TodoMain;