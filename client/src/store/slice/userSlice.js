import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
    name: "user",
    initialState: {
        loginSuccess: "", 
        name: "",
        id: "",
    },
    reducers: {
        loginUser: (state , action) => {
            const userInfo = action.payload;
            state.loginSuccess = true;
            state.name = userInfo.name;
            state.id = userInfo.id;
        },
        logoutUser: (state) => {
            state.loginSuccess = false;
            state.name = "";
            state.id = "";
        }
    }
});

export const { loginUser , logoutUser } = userSlice.actions;

export default userSlice;