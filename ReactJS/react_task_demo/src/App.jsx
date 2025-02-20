import './App.css'
import TodoMain from './components/TodoMain';
import { TodoProvider, useTodoContext } from './context/TodoContext';

function App() {
    return (
        <TodoProvider>
            <TodoMain/>
        </TodoProvider>
    );
}

export default App;
