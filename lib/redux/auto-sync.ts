import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { CategoryInterface, WebSocketTypes } from "@/lib/types";

interface AutoSync {
  selectedCategory: CategoryInterface[];
  inProgressCategories: string[];
  socketResponse: WebSocketTypes | undefined;
}

const initialState: AutoSync = {
  selectedCategory: [],
  inProgressCategories: [],
  socketResponse: undefined,
};

export const autoSyncSlice = createSlice({
  name: "selectedCategory",
  initialState,
  reducers: {
    setSelectedCategory: (
      state,
      action: PayloadAction<CategoryInterface[]>
    ) => {
      state.selectedCategory = action.payload;
    },
    setInProgressCategories: (state, action: PayloadAction<string[]>) => {
      state.inProgressCategories = action.payload;
    },
    setSocketResponse: (
      state,
      action: PayloadAction<WebSocketTypes | undefined>
    ) => {
      state.socketResponse = action.payload;
    },
  },
});

export const {
  setSelectedCategory,
  setInProgressCategories,
  setSocketResponse,
} = autoSyncSlice.actions;

export default autoSyncSlice.reducer;
