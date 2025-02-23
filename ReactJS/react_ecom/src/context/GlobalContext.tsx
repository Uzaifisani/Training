import { createContext, useReducer, ReactNode } from "react";
import { reducer, initialState, State, Action } from "./reducer";

interface GlobalContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export const GlobalContext = createContext<GlobalContextProps>({} as GlobalContextProps);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
