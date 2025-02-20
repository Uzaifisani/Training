import React from 'react'
import { useTodoContext } from '../context/TodoContext';

function TodoForm() {
    const [todo, setTodo] = React.useState("");
    const { addTodo } = useTodoContext(); 
    const add = (e) => {
      e.preventDefault()
      if (!todo) return
      addTodo({ title:todo, completed: false})
      setTodo("")
    }

  return (
      <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-gray-300 rounded-l-lg px-4 py-2 outline-none duration-150 bg-white"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 duration-150">
                Add
            </button>
        </form>
    );

}

export default TodoForm;