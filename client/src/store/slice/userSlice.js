import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: false , 
    userId: "" ,
    userName: "" ,
    userEmail: ""
}

const userSlice = createSlice({

    name: "user",

    initialState: initialState,

    reducers: {
        loginUser: (state , action) => {
            const userInfo = action.payload;

            state.isLogin = true;
            state.userId = userInfo.userId;
            state.userName = userInfo.userName;
            state.userEmail = userInfo.userEmail;
        },
        logoutUser: (state) => {
            state.isLogin = false;
            state.userId = "";
            state.userName = "";
            state.userEmail = "";
        }
    }
});

export const { loginUser , logoutUser } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice;
