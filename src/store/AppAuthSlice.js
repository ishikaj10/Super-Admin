import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  id: null,
};

const appAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData(state, action) {
      const token = action.payload;
      const decodeToken = jwtDecode(token);
      state.id = decodeToken?.adminId;
    },
  },
});

export const { setAuthData } = appAuthSlice.actions;
export default appAuthSlice;
