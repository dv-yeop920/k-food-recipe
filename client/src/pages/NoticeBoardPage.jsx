import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostSearchInput from "../components/NoticeBoard/PostSearchInput";
import PostList from "../components/NoticeBoard/PostList";
import Pagenation from "../components/NoticeBoard/Pagenation"



const NoticeBoardPage = () => {

    const navigate = useNavigate();
    const [postList , setPostList] = useState([]);
    const [pageNumber , setPageNumber] = useState(0);

    const postPerPage = 5;

    const pageCount = Math.ceil(postList.length / postPerPage);


    const getPostList = async () => {
        try {

            const response = 
            await axios.get(
                `/api/posts/getPostList?pageNumber=${ postPerPage }`
                );

            const getPosts = response.data.list;

            setPostList(getPosts);

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
    } , []);

    return (
        <>
        <PostSearchInput/>

        <PostList 
        postList = { postList } 
        onClickPostDetailNavigate = { onClickPostDetailNavigate } />

        <Pagenation/>
        </>
    );
};

export default NoticeBoardPage;