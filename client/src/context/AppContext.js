import React, { createContext, useReducer } from 'react';

export const APP_ACTIONS = {
  SET_COUNT: 'SET_COUNT',
  RESET_COUNT: 'RESET_COUNT'
};

export const appState = {
  count: 0
};

export const AppContext = createContext(appState);

const appReducer = (state, action) => {
  const { count, type } = action;

  switch(type) {
    case APP_ACTIONS.SET_COUNT:
      return {
        ...state,
        count
      }
    case APP_ACTIONS.RESET_COUNT:
      return {
        ...state,
        count: 0
      }
    default:
      return state
  }
}

export const AppProvider = ({ children }) => {
  const [ { count }, dispatchAppEvent ] = useReducer(appReducer, appState);

  const appContext = { count, dispatchAppEvent };

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  )
}