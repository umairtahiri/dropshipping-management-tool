import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getMyProducts } from "@/lib/api/requests";

interface MyProducts {
  myProductsCount: number;
}

const initialState: MyProducts = {
  myProductsCount: 0,
};

export const fetchMyProductsCount: any = createAsyncThunk(
  "myProductsCount",
  async (retailerShopId: string) => {
    const response: any = await getMyProducts(retailerShopId);
    if (response?.status) {
      const { data = [] } = response?.data;
      const { totalCount } = data[1] || {};
      return totalCount;
    }
  }
);

export const myProductsSlice = createSlice({
  name: "myProducts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMyProductsCount.fulfilled]: (state, action) => {
      state.myProductsCount = action.payload;
    },
  },
});

export default myProductsSlice.reducer;
