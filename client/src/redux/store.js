// client/src/redux/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const userPersistConfig = {
  key: "user",
  storage,
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
});

const store = configureStore({
  reducer: rootReducer,           
  middleware: (getDefault) =>
    getDefault({ serializableCheck: false }),
});

export default store;
export const persistor = persistStore(store);
