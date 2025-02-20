import './App.css'
import { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { TodoProvider } from './context/TodoContext';

function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
  }
  const updateTodo = (id, updatedTodo) => {
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  }
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }
  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  }

  useEffect(() => { 
    const todos = JSON.parse(localStorage.getItem('todos'));
    if(todos !== null) {
      setTodos(todos);
    }
  }, []);
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  return (
      <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleTodo}}>
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
      </TodoProvider>
  )
}

export default App
