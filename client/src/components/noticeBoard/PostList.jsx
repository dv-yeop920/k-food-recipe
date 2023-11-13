import React from "react";
import styles from "./NoticeBoard.module.css";
import getDate from "../../utils/postDate";
import Pagination from "../PagiNation/Pagination";

const PostList = (
    { 
        postList ,  
        onClickPostDetailNavigate , 
        postPerPage , 
        totalPostLength ,
        paginate , 
        pageNumber
    }
    ) => {

    return (
        <>
        <div className = { styles.boardContainer } >
            <ul className = "board">
                <li 
                className = { styles.li }
                style = {{ color: "rgb(200, 50, 100)" }} >
                    <div>
                        <h3 className = { styles.title } >
                            [공지]
                        </h3>

                        <h3 
                        style = {{
                            fontSize:"16px",
                            color:"black"
                        }}>
                            게시판 이용 수칙
                        </h3>
                    </div>
                </li>

                {
                    postList.length > 0 ?
                    postList.map( (post) => {
                        return (
                        <li 
                        className = { styles.li } 
                        key = { post._id }
                        onClick = { () => {
                            onClickPostDetailNavigate(post._id);
                            return;
                        }}>

                            <div>
                                <h3 className = { styles.title } >
                                    { post.title }
                                </h3>

                                <span className = { styles.content } >
                                    { post.id }
                                </span>

                                <span className = { styles.content } >
                                    ❤️0
                                </span>

                                <span className = { styles.content } >
                                    { `댓글 ${ post.commentCount }` }
                                </span>
                    
                                <span className = { styles.content } >
                                    { `조회 ${ post.viewCount }` }
                                </span>

                                <span className = { styles.content } >
                                    {
                                        `
                                        ${ getDate(post.createdAt).year }-${
                                            getDate(post.createdAt).month + 1 }-${
                                                getDate(post.createdAt).date } 

                                        ${ getDate(post.createdAt).hours }:${
                                            getDate(post.createdAt).minutes }
                                        `
                                    }
                                </span>
                            </div>

                            <img 
                            style = 
                            {
                                post.image ? 
                                { height:"70px" , width: "90px" } 
                                : 
                                {"display": "none"}
                            }
                            alt = ""
                            src = { post.image } 
                            />
                        </li>
                        );
                    })
                    :
                    <p style={{
                        "padding" : "70px", 
                        "textAlign" :"center",
                        "fontSize" : "35px",
                        "fontWeight" : "600" }} >
                        검색 결과가 없습니다!
                    </p>
                }
            </ul>

            {
                postList.length > 0 &&
                <Pagination
                postPerPage = { postPerPage }
                totalPostLength = { totalPostLength }
                paginate = { paginate } 
                pageNumber = { pageNumber } />
            }
        </div>
        </>
    );
};

export default PostList;