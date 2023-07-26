import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const userSlice = createSlice({
    name: "user",
    initialState: [],
    reducers: {
        loginUser: (state , action) => {
            const userInfo = action.payload;
            axios.post("/api/users/login" , userInfo)
            .then((response) => {
                if(response) {
                    console.log(response);
                }
            })
            .catch((error) => {
                console.log(error);
            });

            state.push(userInfo);
        }
    }
});

export const { loginUser } = userSlice.actions;

export default userSlice;