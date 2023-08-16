import React ,{ useState } from "react";
import * as styled from "../styles/styledComponents";
import { useLocation, useNavigate , useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import ScrollToTopButton from "../components/ScrollToTopButton";
import ImageUploader from "../components/writing/ImageUploader";
import UpdateContent from "../components/writing/UpdateContent";


const PostsUpdatePage = () => {
   /* const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const postsList = location.state && location.state.postsList;
    const selectedPosts = postsList.find((posts) => posts._id === id.toString());

    const [newDetail, setNewDetail] = useState({
        _id: selectedPosts._id,
        title: selectedPosts.title,
        content: selectedPosts.content
    });


    const handleSubmitEditPosts = async (e) => {
        e.preventDefault();

        const updatePosts = {
            _id: newDetail._id,
            title: newDetail.title,
            content: newDetail.content,
        }

        try {
            if(window.confirm("게시물 내용을 수정하시겠습니까?")) {
                const response = await axios.put("/api/posts/update" , updatePosts);

                if(response.data.updateSuccess === false) {
                    alert(response.data.messsage);
                    return;
                }
                
                if(response.data.updateSuccess === true) {
                    navigate(`/postsDetail/${id}`);
                    alert(response.data.messsage);
                    return;
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
                    selectedPosts ={ selectedPosts }
                    newDetail ={ newDetail }
                    setNewDetail ={ setNewDetail }
                    />
                </div>
                
                <div className ="writing-button__container">
                    <styled.DeleteButton
                    className ="writing-button__delete delete-btn"
                    type="button"
                    onClick={() => {
                        if(window.confirm("게시글 수정을 취소 하시겠어요?")) 
                            navigate(-1, { replace: true });
                            return;
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
    */
};

export default PostsUpdatePage;