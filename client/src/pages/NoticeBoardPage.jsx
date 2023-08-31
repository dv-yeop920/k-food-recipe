import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostSearchInput from "../components/NoticeBoard/PostSearchInput";
import PostList from "../components/NoticeBoard/PostList";




const NoticeBoardPage = () => {

    const navigate = useNavigate();
    const [userPostSearchValue , setUserPostSearchValue] = useState("");
    const [postList , setPostList] = useState([]);
    const [totalPostLIst , setTotalPostList] = useState([]);
    const [pageNumber , setPageNumber] = useState(1);

    const POST_PER_PAGE = 5;


    const getPostList = async () => {

        try {

            const response = 
            await axios.get(
                `/api/posts/getPostList?pageNumber=${ pageNumber }
                &search=${userPostSearchValue}`
                );

            const getPosts = response.data.list;
            const getTotalPosts = response.data.totalPosts;

            setPostList(getPosts);
            setTotalPostList(getTotalPosts);

            if (getPosts.length === 0) {
                alert("일치하는 결과가 없습니다!");
                setUserPostSearchValue("");
                return;
            }

        }
        catch (error) {
            console.log(error);
        }
    }


    const onClickPostDetailNavigate = (postId) => {

        return navigate(`/postDetail/${postId}`);

    }


    const onSubmitGetFilteredPostList = async (e) => {

        e.preventDefault();

        try {

            if (userPostSearchValue === "") {
                alert("검색 단어를 입력해 주세요!");
                await getPostList();
                return;
            }

            await getPostList();
                setPageNumber(1);
                setUserPostSearchValue("");
                return;
            
        } 
        catch (error) {
            console.log(error);
        }

    }


    useEffect(() => {
        getPostList();
        window.scrollTo(0 , 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [pageNumber]);


    return (
        <>

        <PostSearchInput 
        userPostSearchValue = { userPostSearchValue }
        setUserPostSearchValue = { setUserPostSearchValue } 
        onSubmitGetFilteredPostList = { onSubmitGetFilteredPostList } />
        
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