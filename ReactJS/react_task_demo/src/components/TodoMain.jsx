import { useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { TodoProvider, useTodoContext } from '../context/TodoContext';

function TodoMain() {
    const { todos, addTodo, setTodos } = useTodoContext();

    useEffect(() => { 
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if(storedTodos !== null) {
            storedTodos.forEach(todo => {
                const newTodo = { ...todo, id: Date.now() + Math.random() }; 
                addTodo(newTodo);
            });
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }, [todos]);

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="w-full max-w-3xl mx-auto shadow-lg rounded-lg px-6 py-4 bg-white">
                <h1 className="text-3xl font-bold text-center mb-8 mt-2 text-gray-800">Todo Manager</h1>
                <div className="mb-6">
                    <TodoForm />
                </div>
                <div className="space-y-4">
                    {todos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default TodoMain;