import React , { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as styled from "../styles/styledComponents";
import ImageUploader from "../components/writing/ImageUploader";
import Content from "../components/writing/Content";
import axios from "axios";
import Loading from "../components/Loading";
import { uploadPostPreviewImageToS3 , resizeFile } from "../utils/awsS3Setting";



const WritingPage = () => {

    const userId = useSelector(user => user.user.id);
    const navigate = useNavigate();
    const [isLoading , setIsLoading] = useState(false);

    const [title , setTitle] = useState("");
    const [content, setContent] = useState(null);
    const [PostPreviewImageFile , setPostPreviewImageFile] = useState(null);
    const [PostPreviewImageSrc, setPostPreviewImageSrc] = useState(null);


    const onSubmitRegisterPost = async (e) => {

        e.preventDefault();

        setIsLoading(true);

        let previewImageUrl;

        try {

            if (title === "" || content === null) {

                alert("내용을 입력했는지 확인해 주세요!");
                setIsLoading(false);
                return;

            }

            if (PostPreviewImageFile === null) {

                previewImageUrl = null;

            }

            if (PostPreviewImageFile !== null) {

                previewImageUrl = 
                await uploadPostPreviewImageToS3(PostPreviewImageFile);

            }

            const post = {

                id: userId,
                title: title,
                content: content,
                image: previewImageUrl

            }

            const response = 
            await axios.post(
                "/api/posts/register" , 
                post , 
                { timeout: 10000 }
            );

            if (response.data.success === false) {

                console.log(response.data.messsage);
                return;

            }

            if (response.data.success === true) {

                navigate(-1, { replace: true });
                alert(response.data.messsage);
                return;

            }

            setPostPreviewImageFile(null);
            setPostPreviewImageSrc(null);
            setIsLoading(false);

        }
        catch (error) {

            console.log(error);
            throw error;

        }
    }


    return (
        <>
        {
            isLoading ?

            <Loading />

            :

            <div className = "editor-container">

                <form 
                className = "editor-form"
                onSubmit = { onSubmitRegisterPost }>

                    <div className = "content-container">

                        <ImageUploader 
                        setPostPreviewImageFile = { setPostPreviewImageFile } 
                        resizeFile = { resizeFile } 
                        PostPreviewImageSrc = { PostPreviewImageSrc }
                        setPostPreviewImageSrc = { setPostPreviewImageSrc }/>

                        <Content 
                        content = { content }
                        setTitle = { setTitle }
                        setContent = { setContent } 
                        resizeFile = { resizeFile } />

                    </div>
                
                    <div className = "writing-button__container">

                        <styled.DeleteButton
                        className = "writing-button__delete delete-btn"
                        type = "button"
                        onClick = { () => {

                            if (window.confirm("게시글 작성을 취소 하시겠어요?")) {

                                navigate(-1, { replace: true });
                                return;

                            }

                        }} >
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

        }
        </>
    );
};

export default WritingPage;