import React, { useState , useEffect } from "react";
import * as styled from "../../styles/styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import ScrollToTopButton from "../ScrollToTopButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addPosts } from "../../store/slice/postsSlice";


const PostsList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchValue , setSearchValue] = useState("");
    const [filteredPosts , setFilteredPosts] = useState(null);
    const postsList = useSelector((posts) => posts.posts);
    const selectedPostsList = filteredPosts ? filteredPosts : postsList;

    const handleSubmitFilteredPosts = (e) => {
        e.preventDefault();

        const filteringPost = postsList.filter((posts) => {
            return posts.title.toLowerCase().includes(searchValue.toLocaleLowerCase());
        });
        return setFilteredPosts(filteringPost);
    }

    

        useEffect(() => {
            axios.get("/api/posts/getPostsList")
            .then((response) => {
                const getPost = response.data.list;
                dispatch(addPosts(getPost));
            })
            .catch((error) => console.log(error));
        } , []);



    return (
        <>
        <styled.SearchContainer>
            <form
            className="user-search__form"
            onSubmit={ handleSubmitFilteredPosts }>

                <styled.Input
                className="user-search__input"
                type="text"
                placeholder="단어 단위로 입력..."
                onChange={(e) => setSearchValue(e.target.value)}/>

                <styled.SubmitButton
                className="default-btn"
                type="submit">
                    검색
                </styled.SubmitButton>

                <FontAwesomeIcon
                    className ="writing-icon"
                    icon={faPenToSquare}
                    size = "2x"
                    onClick={ () => navigate("/writing") }/>
        </form>
        </styled.SearchContainer>


        <styled.BoardContainer>
            <ul className="board">
                <styled.Li 
                className="board-list"
                style={{
                    color:"rgb(200, 50, 100)"
                }}>
                    <div>
                        <styled.Title>
                            [공지]
                        </styled.Title>
                        <styled.Title 
                        style={{
                            fontSize:"16px",
                            color:"black"
                        }}>
                            게시판 이용 수칙
                        </styled.Title>
                    </div>
                </styled.Li>

                {
                    selectedPostsList.map((item , i) => {
                        return(
                        <styled.Li 
                        className="board-list" 
                        key={i}
                        onClick ={() => navigate(`/postsDetail/${item._id}`)}>
                            <div>
                                <styled.Title>
                                    {item.title}
                                </styled.Title>

                                <styled.Span>
                                    {item.id}
                                </styled.Span>

                                <styled.Span>
                                    ❤️ 좋아요 0
                                </styled.Span>

                                <styled.Span>
                                    댓글 0
                                </styled.Span>
                                
                                <styled.Span>
                                    조회 0
                                </styled.Span>

                                <styled.Span>
                                    {item.createdAt}
                                </styled.Span>
                            </div>
                                <img 
                                style={{height:"60px" , width: "80px"}}
                                alt =""
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png" />
                        </styled.Li>
                        )
                    })
                }
            </ul>
        </styled.BoardContainer>

        <ScrollToTopButton/>
        </>
    );
};

export default PostsList;