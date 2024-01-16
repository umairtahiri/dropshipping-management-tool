import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface MenuImageType {
  label: string;
  url: string;
}
interface MenuTypes {
  node: {
    id: string;
    name: string;
    children: {
      edges: Array<MenuTypes>;
    };
    images?: Array<MenuImageType>;
  };
}

interface Categories {
  menusCategories: Array<MenuTypes>;
}

const initialState: Categories = {
  menusCategories: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setMenusCategories: (state, action: PayloadAction<Array<MenuTypes>>) => {
      state.menusCategories = action.payload;
    },
  },
});

export const { setMenusCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
