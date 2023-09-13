import React ,{ useEffect, useState } from "react";
import { useNavigate , useParams } from "react-router-dom";
import * as styled from "../styles/styledComponents";
import UpdateContent from "../components/writing/UpdateContent";
import axios from "axios";
import Loading from "../components/Loading";
import { uploadImageToS3 , resizeFile , deleteImageToS3 } from "../utils/awsS3Setting";
import UpdateImageUploader from "../components/writing/UpdateImageUploader";




const PostsUpdatePage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [originalDetail, setOriginalDetail] = useState({});
    const [editTitleValue, setEditTitleValue] = useState("");
    const [editContentValue, setEditContentValue] = useState(null);
    const [editPreviewImageFile , setEditPreviewImageFile] = useState(null);
    const [editImageSrc, setEditImageSrc] = useState(null);
    const [isLoading , setIsLoading] = useState(false);


    const getPost = async () => {

        const postId = id;

        try {

            const response =  
            await axios.get(
                `/api/posts/getPost?id=${postId}` , 
                { timeout: 10000 }
            );

            setOriginalDetail(response.data.list);
            setEditTitleValue(response.data.list.title);
            setEditContentValue(response.data.list.content);

        }
        catch (error) {
            console.log(error);
        }

    }


    const onSubmitEditPosts = async (e) => {

        e.preventDefault();

        let previewEditImageUrl;

        try {

            if (editTitleValue === "" || editContentValue === null) {

                alert("내용을 입력했는지 확인해 주세요!");
                setIsLoading(false);
                return;

            }

            if (editPreviewImageFile === null) {

                previewEditImageUrl = originalDetail.image;

            }

            if (editPreviewImageFile !== null) {

                previewEditImageUrl = await uploadImageToS3(editPreviewImageFile);

                await deleteImageToS3(originalDetail.image);

            }
            
            if (window.confirm("게시물 내용을 수정하시겠습니까?")) {

                setIsLoading(true);

                const updatePosts = {
                    _id: originalDetail._id,
                    title: originalDetail.title,
                    content: originalDetail.content,
                    image: previewEditImageUrl
                }

                const response = 
                await axios.put(
                    "/api/posts/update" , 
                    updatePosts , 
                    { timeout: 10000 }
                );

                if (response.data.updateSuccess === false) {

                    alert(response.data.messsage);
                    return;

                }
                
                if (response.data.updateSuccess === true) {

                    navigate(-1 , {replace: true});
                    alert(response.data.messsage);
                    return;

                }

                setIsLoading(false);
            }
        }
        catch (error) {
            console.log(error);
        }

    }


    useEffect(() => {
        getPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , []);

    return (
        <>
        {
            isLoading ?

            <Loading/>

            :

            <div className = "editor-container">
                <form 
                className = "editor-form"
                onSubmit = { onSubmitEditPosts }>

                    <div className = "content-container">

                        <UpdateImageUploader
                        editImageSrc = { editImageSrc }
                        setEditImageSrc = { setEditImageSrc } 
                        setEditPreviewImageFile = { setEditPreviewImageFile }
                        resizeFile = { resizeFile } />

                        <UpdateContent 
                        originalDetail = { originalDetail }
                        setOriginalDetail = { setOriginalDetail } 
                        editTitleValue = { editTitleValue }
                        setEditTitleValue = { setEditTitleValue }
                        editContentValue = { editContentValue }
                        setEditContentValue = { setEditContentValue } 
                        uploadImageToS3 = { uploadImageToS3 }
                        resizeFile = { resizeFile } />

                    </div>
                
                    <div className = "writing-button__container">

                        <styled.DeleteButton
                        className = "writing-button__delete delete-btn"
                        type = "button"
                        onClick = { () => {

                            if (window.confirm("게시글 수정을 취소 하시겠어요?")) {

                                navigate(-1, { replace: true });
                                return;

                            }

                        }} >
                            취소
                        </styled.DeleteButton>

                        <styled.SubmitButton
                        type = "submit"
                        className = "writing-button__submit default-btn">
                            수정
                        </styled.SubmitButton>

                    </div>

                </form>

            </div>
        }
        </>
    );
};

export default PostsUpdatePage;