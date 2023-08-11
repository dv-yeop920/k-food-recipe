import React from "react";
import Navbar from "../components/navbar/Navbar";
import PostsList from '../components/noticeBoard/PostsList';



const NoticeBoard = () => {
    return (
        <>
        <Navbar/>
        <PostsList/>
        </>
    );
};

export default NoticeBoard;