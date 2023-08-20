import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    onFiltredContacts(_, action) {
      return action.payload;
    },
  },
});

export const { onFiltredContacts } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
