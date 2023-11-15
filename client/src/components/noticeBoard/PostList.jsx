import React from "react";
import styles from "./NoticeBoard.module.css";
import getDate from "../../utils/postDate";
import Pagination from "../PagiNation/Pagination";
import { NavLink } from "react-router-dom";

const PostList = (
    { 
        postList ,   
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
                className = { styles.li } >
                    <div>
                        <h3 style = {{ color: "rgb(200, 50, 100)" }} >
                            [공지]
                        </h3>

                        <h3 className = { styles.title } >
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
                        key = { post._id } >
                            <NavLink
                            className = { styles.navLink }
                            to = { `/postDetail/${ post._id }` } >
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
                            </NavLink>
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