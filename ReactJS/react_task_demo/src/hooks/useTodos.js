import { useReducer, useCallback, useEffect } from "react";
import { getTodosFromStorage, saveTodosToStorage } from "../utils/localStorage";

const initialState = { todos: [] };

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, todos: [action.payload, ...state.todos] };
    case "REMOVE_TASK":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case "UPDATE_TASK":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
        ),
      };
    case "SET_TASKS":
      return { ...state, todos: action.payload };
    default:
      return state;
  }
};

export const useTodos = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    const storedTodos = getTodosFromStorage();
    if (storedTodos) {
      dispatch({ type: "SET_TASKS", payload: storedTodos });
    }
  }, []);

  useEffect(() => {
    if (state.todos.length>0) {
    saveTodosToStorage(state.todos);
    }
  }, [state.todos]);

  const addTodo = useCallback((title) => {
    dispatch({
      type: "ADD_TASK",
      payload: { id: Date.now(), title, completed: false },
    });
  }, []);

  const deleteTodo = useCallback((id) => {
    dispatch({ type: "REMOVE_TASK", payload: id });
  }, []);

  const toggleTodo = useCallback((id) => {
    dispatch({ type: "TOGGLE_TASK", payload: id });
  }, []);

  const updateTodo = useCallback((id, title) => {
    dispatch({ type: "UPDATE_TASK", payload: { id, title } });
  }, []);

  return { todos: state.todos, addTodo, deleteTodo, toggleTodo, updateTodo };
};
