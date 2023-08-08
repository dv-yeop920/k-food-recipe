import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

const PostsDetail = () => {
    const {id} = useParams();
    const postsDetail = useSelector(posts => posts.posts);
    const selectPosts = postsDetail.find((posts) => posts._id === id.toString());
    return (
        <>
        <Navbar/>
            <div className = "post-detail__container">
                <header className="post-detail__header">
                    {selectPosts.id}
                    {selectPosts.content}
                    
                </header>
            </div>
        </>
    );
};

export default PostsDetail;