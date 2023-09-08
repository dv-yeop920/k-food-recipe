import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostSearchInput from "../components/NoticeBoard/PostSearchInput";
import PostList from "../components/NoticeBoard/PostList";
import Loading from "../components/Loading";




const NoticeBoardPage = () => {

    const navigate = useNavigate();
    const [userPostSearchValue , setUserPostSearchValue] = useState("");
    const [postList , setPostList] = useState([]);
    const [totalPostLength , setTotalPostLength] = useState([]);
    const [pageNumber , setPageNumber] = useState(1);
    const [isLoading , setIsLoading] = useState(false);

    const POST_PER_PAGE = 5;



    const getPostList = async () => {

        setIsLoading(true);

        try {

            const response = 
            await axios.get(
                `/api/posts/getPostList?pageNumber=${ pageNumber }
                &search=${ userPostSearchValue }` , 
                { timeout: 10000 }
            );

            if (response) {

                const getPosts = response.data.list;
                const getTotalPostsLength = response.data.totalPostLength;

                if (getPosts) {

                    setPostList(getPosts);
                    setTotalPostLength(getTotalPostsLength);

                }

            }

            setIsLoading(false);

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

            await getPostList();
            setPageNumber(1);

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

        {
            isLoading ?

            <Loading />

            :

            <PostList 
            postList = { postList }
            onClickPostDetailNavigate = { onClickPostDetailNavigate } 
            postPerPage = { POST_PER_PAGE }
            totalPostLength = { totalPostLength }
            paginate = { setPageNumber }
            pageNumber = { pageNumber } />

        }

        </>
    );
};

export default NoticeBoardPage;