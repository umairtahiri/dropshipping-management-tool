import { combineReducers } from "redux";

import autoSyncReducer from "./auto-sync";
import categoriesReducer from "./categories";
import myProductsRedcuer from "./my-products";
import orderReducer from "./order";
import retailerReducer from "./retailer";
import userReducer from "./user";

const appReducer = combineReducers({
  categories: categoriesReducer,
  retailer: retailerReducer,
  order: orderReducer,
  user: userReducer,
  myProducts: myProductsRedcuer,
  autoSync: autoSyncReducer,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
