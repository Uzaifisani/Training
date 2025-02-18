import { useEffect, useState } from 'react';
import './App.css'
import Task from './components/Task'
function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [task, setTask] = useState<string>("");
  //const[edit,setEdit]=useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number |null>(null);

  const addTask = () => {
    if (task === "") {
      alert("Please enter task");
      return;
    }
     if (editingIndex !== null) {
       setTasks(tasks.map((t, index) => index === editingIndex ? task : t));
       setEditingIndex(null);
     } 
    else {
      setTasks([...tasks, task]);
    }
    setTask("");
  };

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const editTask = (index: number) => {
    setTask(tasks[index]);
    setEditingIndex(index);
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);
  return (
    <div className='max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg'>
      <h1 className='text-2xl text-center mb-4 font-bold'>To-Do App</h1>
      <div className='flex gap-2 mb-4'>
        <input value={task} className='border-blue-500 p-1 flex-grow bg-green-300 rounded-md' type="text" placeholder='Please Enter task...' onChange={(e)=>{setTask(e.target.value)}}/>
        <button className='bg-black text-white p-2 rounded-md'onClick={addTask}>{(editingIndex?"Edit":"Add")}</button>
      </div>
        {tasks.map((task, index) => (
          <Task key={index} task={task} onDelete={() => deleteTask(index)} onEdit={()=>editTask(index)}/>
        ))}
    </div>
  )
}

export default App
