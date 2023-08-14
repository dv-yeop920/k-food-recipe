import React ,{ useState } from "react";
import * as styled from "../styles/styledComponents";
import { useNavigate , useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import ScrollToTopButton from "../components/ScrollToTopButton";
import ImageUploader from "../components/writing/ImageUploader";
import { useSelector } from 'react-redux';
import UpdateContent from "../components/writing/UpdateContent";


const PostsUpdatePage = () => {
    const { id } = useParams();
    const posts = useSelector(postsList => postsList.posts)
    const navigate = useNavigate();
    
    const [newTitle , setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");

    const filteredPosts = posts.filter((posts) => {
        return posts._id === id;
    });

    const handleSubmitEditPosts = async (e) => {
        e.preventDefault();

        const updatePosts = {
            _id: filteredPosts[0]._id,
            title: newTitle,
            content: newContent,
        }

        try {
            if(window.confirm("게시물 내용을 수정하시겠습니까?")) {
                const response = await axios.put("/api/posts/update" , updatePosts);

                if(response.data.updateSuccess === false) {
                    return console.log(response.data.messsage);
                }
                
                if(response.data.updateSuccess === true) {
                    navigate(`/postsDetail/${id}` , { replace: true });
                    return alert(response.data.messsage);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        }

    return (
        <>
        <Navbar/>
        <div className ="editor-container">
            <form 
            className = "editor-form"
            onSubmit = { handleSubmitEditPosts }>
                <div className = "content-container">
                    <ImageUploader/>
                    <UpdateContent 
                    filteredPosts ={filteredPosts}
                    setNewTitle ={setNewTitle}
                    newContent ={newContent}
                    setNewContent ={setNewContent}/>
                </div>
                
                <div className ="writing-button__container">
                    <styled.DeleteButton
                    className ="writing-button__delete delete-btn"
                    type="button"
                    onClick={() => {
                        if(window.confirm("게시글 수정을 취소 하시겠어요?")) 
                            return navigate(-1, { replace: true });
                        }
                    }>
                        취소
                    </styled.DeleteButton>

                    <styled.SubmitButton
                    type = "submit"
                    className = "writing-button__submit default-btn">
                        등록
                    </styled.SubmitButton>
                </div>
            </form>
        </div>
        <ScrollToTopButton/>
        </>
    );
};

export default PostsUpdatePage;