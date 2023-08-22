import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostSearchInput from "../components/NoticeBoard/PostSearchInput";
import PostList from "../components/NoticeBoard/PostList";




const NoticeBoardPage = () => {

    const navigate = useNavigate();
    const [postList , setPostList] = useState([]);
    const [pageNumber , setPageNumber] = useState(0);

    const postPerPage = 5;


//NOTE - 데이터 한 페이지당 5개 까지 받아오는 것 확인 
//TODO - 확인 했으니 버튼을 누르면 pageNumber의 상태가 변하도록 버튼 페이지 구현 해야함
    const getPostList = async () => {
        try {

            const response = 
            await axios.get(
                `/api/posts/getPostList?pageNumber=${ pageNumber }`
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [pageNumber]);

    return (
        <>

        <PostSearchInput/>

        <PostList 
        postList = { postList } 
        onClickPostDetailNavigate = { onClickPostDetailNavigate } 
        postPerPage = { postPerPage }
        totalPosts = { postList.length }
        paginate = { setPageNumber } />

        </>
    );
};

export default NoticeBoardPage;