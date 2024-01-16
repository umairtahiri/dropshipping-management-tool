import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getOrders } from "../api/requests";

interface OrderReportTypes {
  ordersCancelled: number;
  ordersProcessing: number;
  ordersReturnsRequested: number;
  ordersShipped: number;
  totalEarnings: number;
}
interface Order {
  ordersCount: number;
  report: OrderReportTypes;
}

const initialState: Order = {
  ordersCount: 0,
  report: {
    ordersCancelled: 0,
    ordersProcessing: 0,
    ordersReturnsRequested: 0,
    ordersShipped: 0,
    totalEarnings: 0,
  },
};

export const fetchOrdersCount: any = createAsyncThunk(
  "ordersCount",
  async (storeFrontId: string) => {
    const response: any = await getOrders({ storeFrontId });
    if (response?.status) {
      const { totalCount } = response?.data?.data || {};
      return totalCount;
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderReport: (state, action: PayloadAction<OrderReportTypes>) => {
      state.report = action.payload;
    },
  },
  extraReducers: {
    [fetchOrdersCount.fulfilled]: (state, action) => {
      state.ordersCount = action.payload;
    },
  },
});

export const { setOrderReport } = orderSlice.actions;

export default orderSlice.reducer;
