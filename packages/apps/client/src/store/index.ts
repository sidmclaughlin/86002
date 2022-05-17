import { AnyAction, combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { RootState } from './types/root-state.type';

export const combinedReducers = combineReducers({});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  // Put logout logic here

  return combinedReducers(state, action);
};

export default configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
