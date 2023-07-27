import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
    name: "user",
    initialState: [],
    reducers: {
        loginUser: (state , action) => {
            const userInfo = action.payload;
            state.push(userInfo);
        },
        logoutUser: (state , action) => {
            const logoutUserInfo = action.payload;
            const logout = state.findIndex((user) => {
                return user.userId === logoutUserInfo.userId;
            });
            state.splice(logout , 1);
        }
    }
});

export const { loginUser } = userSlice.actions;

export default userSlice;