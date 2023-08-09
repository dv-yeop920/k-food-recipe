import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null
    },
    reducers: {
        setUser: (state, action) => {
            const { user, accessToken } = action.payload;

            state.user = user;
            state.token = accessToken;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    }
});


export const { setUser, logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIstoken = (state) => state.auth.token;

export default authSlice;