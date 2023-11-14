import React from "react";
import { BounceLoader } from "react-spinners";
import styles from "./Loading.module.css";

const Loading = () => {
    return (
        <>
        <div 
        className = { styles.loading } >
            <h3 className = "loading-text">
                로딩중
            </h3>

            <BounceLoader 
            className = "loadig-spinner" 
            color="#36d7b7" />
        </div>
        </>
    );
};

export default Loading;