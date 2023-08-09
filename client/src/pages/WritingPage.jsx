import React ,{ useState }from 'react';
import * as styled from "../styles/styledComponents";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import ScrollToTopButton from "../components/ScrollToTopButton";
import ImageUploader from "../components/writing/ImageUploader";
import Content from '../components/writing/Content';
import { useSelector } from 'react-redux';


const WritingPage = () => {
    const userId = useSelector(user => user.user.id);
    const navigate = useNavigate();
    
    const [title , setTitle] = useState("");
    const [content, setContent] = useState("");

        const handleSubmitPost = async (e) => {
            e.preventDefault();
            const post = {
                id: userId ,
                title: title,
                content: content
            }
            
            await axios.post("/api/posts/register" , post)
            .then((response) => {
                if(response.data.success === false) {
                    return console.log(response.data.messsage);
                }
                if(response.data.success === true) {
                    navigate(-1, { replace: true });
                    return alert(response.data.messsage);
                }
            })
            .catch((error) => {
                return console.log(error);
            })
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
                    <Content 
                    content={ content }
                    setTitle ={ setTitle }
                    setContent ={ setContent }
                    />
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

export default WritingPage;