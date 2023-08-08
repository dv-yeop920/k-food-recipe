import { createSlice } from "@reduxjs/toolkit";



const postsSlice = createSlice({
    name: "posts",
    initialState: [],
    reducers: {
        addPosts: (state , action) => {
            const newPosts = action.payload;
            return state = newPosts;
        }
    }
});

export const { addPosts } = postsSlice.actions;

export default postsSlice;
