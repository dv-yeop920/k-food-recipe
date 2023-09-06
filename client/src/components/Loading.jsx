import React from "react";
import { BounceLoader } from "react-spinners";

const Loading = () => {
    return (
        <>
            <div 
            className = "loading"
            style={{
            "position": "fixed",
            "top":"50%",
            "left": "47%",
            "backgroundColor": "white",
            "width": "100%",
            "height": "100%"}} >

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