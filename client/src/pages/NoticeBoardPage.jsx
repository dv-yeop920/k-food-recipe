import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostSearchInput from "../components/NoticeBoard/PostSearchInput";
import PostList from "../components/NoticeBoard/PostList";




const NoticeBoardPage = () => {

    const navigate = useNavigate();
    const [postList , setPostList] = useState([]);
    const [totalPostLIst , setTotalPostList] = useState([]);
    const [pageNumber , setPageNumber] = useState(1);

    const POST_PER_PAGE = 5;


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
        window.scrollTo(0 , 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [pageNumber]);

    return (
        <>

        <PostSearchInput/>

        <PostList 
        postList = { postList } 
        onClickPostDetailNavigate = { onClickPostDetailNavigate } 
        postPerPage = { POST_PER_PAGE }
        totalPosts = { totalPostLIst.length }
        paginate = { setPageNumber }
        pageNumber = { pageNumber } />

        </>
    );
};

export default NoticeBoardPage;