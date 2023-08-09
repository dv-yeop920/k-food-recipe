import { configureStore , combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";
import logger from "redux-logger";
import postsSlice from "./slice/postsSlice";
import authSlice from "./slice/authSlice";


const persistConfig = {
    key: "user",
    storage: storageSession,
    whitelist: ["user" , "posts" , "auth"]
};

const rootReducer = combineReducers({
    user: userSlice.reducer,
    posts: postsSlice.reducer,
    auth: authSlice.reducer
});

const persistedReducer =  persistReducer(persistConfig, rootReducer);

const store =  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(logger)
});

export default store;




