import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { userDetailResult } from "@/lib/hooks/types";

interface User {
  isAuthenticated: boolean;
  user: userDetailResult | any;
}

const initialState: User = {
  isAuthenticated: false,
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action: PayloadAction<userDetailResult>) => {
      state.user = action.payload;
    },
  },
});

export const { setIsAuthenticated, setUser } = userSlice.actions;

export default userSlice.reducer;
