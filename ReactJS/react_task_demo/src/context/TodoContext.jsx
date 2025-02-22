import { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from "react";

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

const updateLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

export const TodoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        dispatch({ type: 'SET_TASKS', payload: storedTodos });
    }, []);

    const addTodo = useCallback((todo) => {
        const newTodo = { id: Date.now(), ...todo };
        const updatedTodos = [...state.todos, newTodo];
        dispatch({ type: 'ADD_TASK', payload: newTodo });
        updateLocalStorage(updatedTodos);
    }, [state.todos]);

    const deleteTodo = useCallback((id) => {
        const updatedTodos = state.todos.filter(todo => todo.id !== id);
        dispatch({ type: 'REMOVE_TASK', payload: id });
       updateLocalStorage(updatedTodos);
    }, [state.todos]);

    const toggleTodo = useCallback((id) => {
        const updatedTodos = state.todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
        dispatch({ type: 'TOGGLE_TASK', payload: id });
        updateLocalStorage(updatedTodos);
    }, [state.todos]);

    const updateTodo = useCallback((id, updatedTodo) => {
        const updatedTodos = state.todos.map(todo => todo.id === id ? { ...todo, ...updatedTodo } : todo);
        dispatch({ type: 'UPDATE_TASK', payload: { id, ...updatedTodo } });
        updateLocalStorage(updatedTodos);
    }, [state.todos]);

    const setTodos = useCallback((todos) => {
        dispatch({ type: 'SET_TASKS', payload: todos });
        updateLocalStorage(todos);
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