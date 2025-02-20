import { createContext, useContext, useReducer, useMemo, useCallback } from "react";

const initialState = {
    todos: []
};

const todoReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return { ...state, todos: [{ id: Date.now(), ...action.payload }, ...state.todos] };
        case 'REMOVE_TASK':
            return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
        case 'TOGGLE_TASK':
            return { ...state, todos: state.todos.map(todo => todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo) };
        case 'UPDATE_TASK':
            return { ...state, todos: state.todos.map(todo => todo.id === action.payload.id ? { ...todo, ...action.payload } : todo) };
        case 'SET_TASKS':
            return { ...state, todos: action.payload };
        default:
            return state;
    }
};

export const TodoContext = createContext();

export const useTodoContext = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const addTodo = useCallback((todo) => {
        const newTodo = { id: Date.now(), ...todo };
        dispatch({ type: 'ADD_TASK', payload: newTodo });
    }, []);

    const deleteTodo = useCallback((id) => {
        dispatch({ type: 'REMOVE_TASK', payload: id });
    }, []);

    const toggleTodo = useCallback((id) => {
        dispatch({ type: 'TOGGLE_TASK', payload: id });
    }, []);

    const updateTodo = useCallback((id, updatedTodo) => {
        dispatch({ type: 'UPDATE_TASK', payload: { id, ...updatedTodo } });
    }, []);

    const setTodos = useCallback((todos) => {
        dispatch({ type: 'SET_TASKS', payload: todos });
    }, []);

    const value = useMemo(() => ({
        todos: state.todos,
        addTodo,
        deleteTodo,
        toggleTodo,
        updateTodo,
        setTodos
    }), [state.todos, addTodo, deleteTodo, toggleTodo, updateTodo, setTodos]);

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
};