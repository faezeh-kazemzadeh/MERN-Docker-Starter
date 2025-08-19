import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/auth/redux/authSlice";

const rootReducer = combineReducers({
  auth : authReducer
});

const persistConfig = {
key: "root",
  storage,
  version: 1,
  // whitelist:['authReducer'],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddelware) =>
    getDefaultMiddelware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
  devTools: true,
});

export const persistor = persistStore(store);
