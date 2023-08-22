import React from "react";
import * as styled from "../../styles/styledComponents";
import getDate from "../../utils/postDate";
import Pagination from "../Pagination";

const PostList = (
    { 
        postList , 
        onClickPostDetailNavigate , 
        postPerPage , 
        totalPosts , 
        paginate , 
        pageNumber
    }
    ) => {
    return (
        <>
        <styled.BoardContainer>

            <ul className = "board">

                <styled.Li 
                className = "post-list"
                style = {{ color: "rgb(200, 50, 100)" }} >

                <div>

                    <styled.Title>
                        [공지]
                    </styled.Title>

                    <styled.Title 
                    style = {{
                        fontSize:"16px",
                        color:"black"
                    }} >
                        게시판 이용 수칙
                    </styled.Title>

                </div>

                </styled.Li>

                {

                postList &&
                postList.map( (post) => {

                    return(

                    <styled.Li 
                    className = "post-list" 
                    key = { post._id }
                    onClick = { () => {

                        onClickPostDetailNavigate(post._id);
                        return;

                    }} >

                        <div>

                            <styled.Title>
                                { post.title }
                            </styled.Title>

                            <styled.Span>
                                { post.id }
                            </styled.Span>

                            <styled.Span>
                                ❤️0
                            </styled.Span>

                            <styled.Span>
                                댓글 0
                            </styled.Span>
                    
                            <styled.Span>
                                {`조회 ${ post.viewCount }`}
                            </styled.Span>

                            <styled.Span>

                            {
                                `
                                ${ getDate(post.createdAt).year }-${
                                    getDate(post.createdAt).month + 1 }-${
                                        getDate(post.createdAt).date } 

                                ${ getDate(post.createdAt).hours }:${
                                    getDate(post.createdAt).minutes }
                                `
                            }

                            </styled.Span>

                        </div>

                        <img 
                        style = {{ height:"60px" , width: "80px" }}
                        alt = ""
                        src = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png" 
                        />

                    </styled.Li>
                    )
                })
                }
            </ul>

            <Pagination
            postPerPage = { postPerPage }
            totalPosts = { totalPosts }
            paginate = { paginate } 
            pageNumber = { pageNumber } />

        </styled.BoardContainer>
        </>
    );
};

export default PostList;