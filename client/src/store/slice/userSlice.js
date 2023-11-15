import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({

    name: "user",

    initialState: {
        isLogin: false , 
        id: "" ,
        name: "" ,
        email: "",
        accessToken: ""
    },

    reducers: {
        loginUser: (state , action) => {
            const userInfo = action.payload;

            state.isLogin = true;
            state.id = userInfo.id;
            state.name = userInfo.name;
            state.email = userInfo.email;
        },
        logoutUser: (state) => {
            state.isLogin = false;
            state.id = "";
            state.name = "";
            state.email = "";
        }
    }
});

export const { loginUser , logoutUser } = userSlice.actions;

export default userSlice;
