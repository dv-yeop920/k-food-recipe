import React from "react";
import * as styled from "../styles/styledComponents";




const Pagination = (
    { 
        postPerPage , //NOTE - 페이지당 게시물 개수 
        totalPosts , //NOTE - 게시물의 총 개수
        pageNumber ,  //NOTE - 페이지의 초기값
        paginate //NOTE - 페이지 초기값 변경 하는 함수 
    }
    ) => {

    const pageNumbers = [];
    const PAGE_NUMBER_LIMIT = 5;
    const totalPage = Math.ceil(totalPosts / postPerPage);


    for (let i = 0; i < totalPage; i++) {
        pageNumbers.push(i);
    }

    //NOTE - 페이지 블록 번호 
    const pageBlockArea = Math.ceil(pageNumber / PAGE_NUMBER_LIMIT);
    //NOTE - 페이지 블록 마다 보여줄 페이지 번호 개수
    const start = ((pageBlockArea - 1 ) * PAGE_NUMBER_LIMIT) + 1;
    const end = pageBlockArea * PAGE_NUMBER_LIMIT + 1;

    const newPageNumbers = pageNumbers.slice(start , end);

    //TODO - 토탈 페이지는 1 부터 게시물이 있는 만큼의 페이지 
    //TODO - 토탈 페이지를 1 부터 5까지 보여주려면 ? 시작점 부터 5번째 인덱스까지 자르기
    //TODO - 그 5개 중에 마지막 누르면 그 다음 새로운 5개의 버튼이 뜨도록 하기
    return (
        <>
        <styled.PaginationContainer>
            <nav>

                <styled.PageUl className = "pagination">

                <styled.BackPageButton
                className="page-start-button" 
                type="button"
                onClick = { () => {
                    return paginate(1);
                } } 
                disabled = { pageNumber === 1 } >
                    &lt;&lt;
                </styled.BackPageButton>

                <styled.BackPageButton 
                className="page-back-button" 
                onClick = { () => {
                    return paginate(pageNumber - 1);
                }} 
                disabled = { pageNumber === 1 } >
                    &lt;
                </styled.BackPageButton>

                    {
                        newPageNumbers.map((number) => {
                            return(

                                <styled.PageLi 
                                key = { number } 
                                className = "page-button" 
                                onClick = { () => {
                                    return paginate(number);
                                }} 
                                disabled = { pageNumber === number} >

                                    <span  className = "page-number">
                                        { number }
                                    </span>

                                </styled.PageLi>

                            )
                        })
                    }

                    <styled.NextPageButton 
                    className="page-next-button"
                    onClick = { () => {
                        return paginate(pageNumber + 1);
                    }} 
                    disabled = { pageNumber + 1 === totalPage } >
                        &gt;
                    </styled.NextPageButton>

                    <styled.NextPageButton 
                    className="page-last-button" 
                    onClick = { () => {
                        return paginate(totalPage - 1);
                    }} 
                    disabled = { pageNumber + 1 === totalPage } >
                        &gt;&gt;
                    </styled.NextPageButton>

                </styled.PageUl>

            </nav>
        </styled.PaginationContainer>
        </>
    );
};

export default Pagination;