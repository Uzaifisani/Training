import './App.css'

import { TodoProvider } from "./context/TodoContext";
import TodoMain from "./components/TodoMain";

function App() {
    return (
        <TodoProvider>
            <TodoMain />
        </TodoProvider>
    );
}

export default App;