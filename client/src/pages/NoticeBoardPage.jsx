import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostSearchInput from "../components/NoticeBoard/PostSearchInput";
import PostList from "../components/NoticeBoard/PostList";




const NoticeBoardPage = () => {

    const navigate = useNavigate();
    const [postList , setPostList] = useState([]);
    const [pageNumber , setPageNumber] = useState(0);
    const [totalPostLIst , setTotalPostList] = useState([]);

    const postPerPage = 5;


    const getPostList = async () => {
        try {

            const response = 
            await axios.get(
                `/api/posts/getPostList?pageNumber=${ pageNumber }`
                );

            const getPosts = response.data.list;
            const getTotalPosts = response.data.totalPosts;

            setPostList(getPosts);
            setTotalPostList(getTotalPosts);
        }
        catch (error) {
            console.log(error);
        }
    }


    const onClickPostDetailNavigate = (postId) => {

        return navigate(`/postDetail/${postId}`);

    }


    useEffect(() => {
        getPostList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [pageNumber]);

    return (
        <>

        <PostSearchInput/>

        <PostList 
        postList = { postList } 
        onClickPostDetailNavigate = { onClickPostDetailNavigate } 
        postPerPage = { postPerPage }
        totalPosts = { totalPostLIst.length }
        paginate = { setPageNumber } />

        </>
    );
};

export default NoticeBoardPage;