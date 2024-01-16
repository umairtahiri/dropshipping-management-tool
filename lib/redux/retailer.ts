import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface FieldTypes {
  name: string;
  values: string[];
}

interface RetailerShop {
  id: string;
  name: string;
  about: string;
  description: string;
  madeIn: string;
  minOrder: number;
  url: string;
  returnPolicy: string;
  storePolicy: string;
  fields: FieldTypes[];
}

interface Retailer {
  accountId: string;
  onboardingCompleted: boolean;
  creatingStore: boolean;
  retailerShop: RetailerShop;
  storeFront: RetailerShop;
}

const initialState: Retailer = {
  accountId: "",
  onboardingCompleted: false,
  creatingStore: false,
  storeFront: {
    id: "",
    name: "",
    about: "",
    description: "",
    madeIn: "",
    minOrder: 0,
    url: "",
    returnPolicy: "",
    storePolicy: "",
    fields: [],
  },
  retailerShop: {
    id: "",
    name: "",
    about: "",
    description: "",
    madeIn: "",
    minOrder: 0,
    url: "",
    returnPolicy: "",
    storePolicy: "",
    fields: [],
  },
};

export const retailerSlice = createSlice({
  name: "retailer",
  initialState,
  reducers: {
    setAccountId: (state, action: PayloadAction<string>) => {
      state.accountId = action.payload;
    },
    setOnboardingCompleted: (state, action: PayloadAction<boolean>) => {
      state.onboardingCompleted = action.payload;
    },
    setRetailerShop: (state, action: PayloadAction<RetailerShop>) => {
      state.retailerShop = action.payload;
    },
    setStoreFront: (state, action: PayloadAction<RetailerShop>) => {
      state.storeFront = action.payload;
    },
    setCreatingStore: (state, action: PayloadAction<boolean>) => {
      state.creatingStore = action.payload;
    },
  },
});

export const {
  setAccountId,
  setRetailerShop,
  setOnboardingCompleted,
  setStoreFront,
  setCreatingStore,
} = retailerSlice.actions;

export default retailerSlice.reducer;
