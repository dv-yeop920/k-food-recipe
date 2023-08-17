import { configureStore , combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import logger from "redux-logger";
import userSlice from "./slice/userSlice";



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




