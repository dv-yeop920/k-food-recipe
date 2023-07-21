import React from 'react';
import * as styled from "../styles/styledComponents";
import { useNavigate } from 'react-router';

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <>
        <styled.Navbar>
            <styled.MenuList>
                <styled.NavTitle onClick={() => navigate('/')}>K레시피</styled.NavTitle>
                <styled.MenuItem onClick={() => navigate('/myPage')}>마이 페이지</styled.MenuItem>
                <styled.MenuItem onClick={() => navigate("/recipe")}>레시피</styled.MenuItem>
                <styled.MenuItem onClick={() => navigate('/noticeBoard')}>자유 게시판</styled.MenuItem>
                <styled.MenuItem onClick={() => navigate('/login')}>로그인</styled.MenuItem>
                <styled.MenuItem onClick={() => navigate('/signUp')}>회원 가입</styled.MenuItem>
            </styled.MenuList>
        </styled.Navbar>
        </>
    );
};

export default Navbar;