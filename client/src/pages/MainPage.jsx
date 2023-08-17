import React from "react";
import Navbar from "../layout/Navbar/Navbar"


const MainPage = () => {

    return (
        <>
        <Navbar/>
            <div style={
                {
                    position:"absolute",
                    top:"30%",
                    left:"10%",
                    width:"80%",
                    fontSize:"45px",
                    fontWeight:"600",
                    textAlign:"center"
                    }
                }>
                    <h1>환영 합니다!</h1>
                메인 페이지 입니다
            </div>
        </>
    );
};

export default MainPage;