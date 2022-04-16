
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  userName: "Tolik",
}

const nameSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addName: (state ,action ) => {
        state.userName = action.payload.userName;
    }
  }
})

export const {addName} = nameSlice.actions;
export default nameSlice.reducer;