import React ,{ useState }from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as styled from "../styles/styledComponents";
import ImageUploader from "../components/writing/ImageUploader";
import Content from "../components/writing/Content";
import axios from "axios";
import AWS from "aws-sdk";



const WritingPage = () => {

    const userId = useSelector(user => user.user.id);
    const navigate = useNavigate();
    
    const [title , setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageFile , setImageFile] = useState({});


    const REGION = process.env.REACT_APP_REGION
    const ACCESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID
    const SECRET_ACCESS_KEY_ID = process.env.REACT_APP_SECRET_ACCESS_KEY_ID
    const S3_BUCKET = "dv-yeop-imagebucket";


    AWS.config.update({
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY_ID,
    });

    const s3 = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
    });


    const uploadImageToS3 = async (file) => {

        const params = {

            Key: `image/${file.name}`,
            Body: file,

        }

        try {

            const result = await s3.upload(params).promise();
            console.log("Image uploaded successfully:", result.Location);
            return result.Location; // 업로드된 이미지의 URL 반환

        } 
        catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }
    }


    


    const onSubmitPost = async (e) => {

        e.preventDefault();

        try {

            const imageUrl = await uploadImageToS3(imageFile);

            const post = {
                id: userId,
                title: title,
                content: content,
                image: imageUrl
            }

            const response = 
            await axios.post("/api/posts/register" , post , { timeout: 10000 });

            if (response.data.success === false) {

                return console.log(response.data.messsage);

            }

            if (response.data.success === true) {

                navigate(-1, { replace: true });
                alert(response.data.messsage);
                return;

            }

        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <>
        <div className = "editor-container">

            <form 
            className = "editor-form"
            onSubmit = { onSubmitPost }>
                <div className = "content-container">

                    <ImageUploader 
                    setImageFile = { setImageFile } />

                    <Content 
                    content = { content }
                    setTitle = { setTitle }
                    setContent = { setContent } />

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
        </>
    );
};

export default WritingPage;