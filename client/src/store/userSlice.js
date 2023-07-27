import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
    name: "user",
    initialState: {
        loginSuccess: false, 
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
            //const logoutUserInfo = action.payload;
            state.loginSuccess = false;
            state.name = "";
            state.id = "";
            /*const logout = state.findIndex((user) => {
                return user.userId === logoutUserInfo.userId;
            });
            state.splice(logout , 1);*/
        }
    }
});

export const { loginUser , logoutUser } = userSlice.actions;

export default userSlice;