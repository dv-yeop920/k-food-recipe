import { configureStore , combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./slice/userSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist:["user"]
}

export const rootReducer = combineReducers({
    user: userSlice
});

const persistedReducer = persistReducer( persistConfig , rootReducer );

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export default store;

