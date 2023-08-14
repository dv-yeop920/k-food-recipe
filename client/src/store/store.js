import { configureStore , combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";
import logger from "redux-logger";


const persistConfig = {
    key: "user",
    storage: storageSession,
    whitelist: ["user"]
};

const rootReducer = combineReducers({
    user: userSlice.reducer,
});

const persistedReducer =  persistReducer(persistConfig, rootReducer);

const store =  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(logger)
});

export default store;




