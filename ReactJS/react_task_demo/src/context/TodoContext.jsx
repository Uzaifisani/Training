import { createContext, useContext } from "react";
import { useTodos } from "../hooks/useTodos";

const TodoContext = createContext();
export const useTodoContext = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
    const todosData = useTodos();

    return (
        <TodoContext.Provider value={todosData}>
            {children}
        </TodoContext.Provider>
    );
};