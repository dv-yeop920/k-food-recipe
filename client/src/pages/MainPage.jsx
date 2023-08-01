import React from "react";
import Navbar from "../components/navbar/Navbar"
import ScrollToTopButton from "../components/ScrollToTopButton";

const MainPage = () => {
    return (
        <>
        <Navbar/>
            <div style={
                {
                    position:"absolute",
                    top:"50%",
                    left:"43%",
                    fontSize:"45px",
                    fontWeight:"600"
                    }
                }>
                메인 페이지 
            </div>
        <ScrollToTopButton/>
        </>
    );
};

export default MainPage;