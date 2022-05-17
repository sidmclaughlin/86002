import { createSlice } from '@reduxjs/toolkit';

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {},
  reducers: {
    logout: state => {
      // This is handled in the root reducer
    },
  },
});

const { actions, reducer } = authenticationSlice;

export const { logout } = actions;
export default reducer;
