import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({

    name: "user",

    initialState: {
        loginSuccess: false , 
        id: "" ,
        name: "" ,
        email: ""
    },

    reducers: {

        loginUser: (state , action) => {

            const userInfo = action.payload;

            state.loginSuccess = true;
            state.id = userInfo.id;
            state.name = userInfo.name;
            state.email = userInfo.email;

        },

        logoutUser: (state) => {

            state.loginSuccess = false;
            state.id = "";
            state.name = "";
            state.email = "";

        }
    }
});

export const { loginUser , logoutUser } = userSlice.actions;

export default userSlice;
