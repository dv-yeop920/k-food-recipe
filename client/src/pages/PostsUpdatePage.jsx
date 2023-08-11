import React ,{ useState , useEffect } from "react";
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
    const posts = useSelector(postsList => postsList.posts);
    const navigate = useNavigate();
    
    const [newTitle , setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");

    const filteredPosts = posts.filter((posts) => {
        return posts._id === id;
    })
    

    const handleSubmitPost = async (e) => {
                e.preventDefault();
                const updatePosts = {
                    _id: filteredPosts[0]._id,
                    title: newTitle,
                    content: newContent,
                }
            
                await axios.put("/api/posts/update" , updatePosts)
                .then((response) => {
                    if(response.data.updateSuccess === false) {
                        return console.log(response.data.messsage);
                    }
                    if(response.data.updateSuccess === true) {
                        navigate(-1, { replace: true });
                        return alert(response.data.messsage);
                    }
                })
                .catch((error) => {
                    return console.log(error);
                });
        }

    return (
        <>
        <Navbar/>
        <div className ="editor-container">
            <form 
            className = "editor-form"
            onSubmit = { handleSubmitPost }>
                <div className = "content-container">
                    <ImageUploader/>
                    <UpdateContent 
                    setNewTitle ={setNewTitle}
                    newContent ={newContent}
                    setNewContent ={setNewContent}/>
                </div>
                
                <div className ="writing-button__container">
                    <styled.DeleteButton
                    className ="writing-button__delete delete-btn"
                    onClick={() => {
                        if(window.confirm("게시글 작성을 취소 하시겠어요?")) 
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