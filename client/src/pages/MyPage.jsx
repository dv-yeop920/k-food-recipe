import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHeart , faFaceSmileBeam } from "@fortawesome/free-regular-svg-icons";
import styles from "../components/MyPage/MyPage.module.css";
import { selectUser } from "../store/slice/userSlice";


const MyPage = () => {

    const { userName } = useSelector(selectUser);

    const listTitle = 
    [
        {
            title:"내정보",
            icon: faUser
        }, 
        {
            title:"좋아요 누른 레시피",
            icon: faHeart
        }, 
        {
            title:"좋아요 누른 게시글",
            icon: faHeart
        }, 
        {
            title:"최근 본 레시피",
            icon: faFaceSmileBeam
        }, 
        {
            title:"최근 본 게시글",
            icon: faFaceSmileBeam
        }, 
        {
            title:"내 게시글",
            icon: faFaceSmileBeam
        }
    ];

    return (
        <>
        <main className = { styles.main } >
            <div className = { styles.component } >
                <div className = "user-component__column">
                    <div className = "user-component__text">
                        <h1 className = { styles.hello } >
                            안녕하세요
                        </h1>

                        <h2 className = { styles.hello } > 
                            { `${ userName } 님!` }
                        </h2>
                    </div>
                </div>
            </div>

            <div className = { styles.iconRow } >
                {
                    listTitle.map((item) => {
                        return(
                            <div 
                            key = { item.title }
                            className = { styles.iconArea } >
                                <FontAwesomeIcon
                                className = { styles.icon }
                                icon = { item.icon }
                                size = "1x" />

                                <span className = { styles.title } >
                                    { item.title }
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </main>
        </>
    );
};

export default MyPage;