import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
    name: "user",
    initialState: [],
    reducers: {
        loginUser: (state , action) => {
            const userInfo = action.payload;
            state.push(userInfo);
        }
    }
});

export const { loginUser } = userSlice.actions;

export default userSlice;