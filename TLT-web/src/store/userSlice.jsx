import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUserDetails(state, action) {
      // // handle setting user details
      // state.user = action.payload
      // console.log("userDetails", action.payload)
      return { ...state, ...action.payload };
    },
    // other reducers
  },
});

export const { setUserDetails } = userSlice.actions;
export const userReducer = userSlice.reducer;


