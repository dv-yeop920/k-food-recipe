import React from "react";
import * as styled from "../styles/styledComponents";




const Pagenation = (
    { 
        postPerPage , 
        totalPosts , 
        paginate , 
        pageNumber 
    }
    ) => {

    const pageNumbers = [];
    const pageButtonLimit = 5;
    const totalPage = Math.ceil(totalPosts / postPerPage);


    for (let i = 0; i < totalPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <>
        <styled.PaginationContainer>
            <nav>

                <styled.PageUl className = "pagination">

                <styled.BackPageButton 
                onClick = { () => {
                    paginate(0);
                }} 
                disabled = { pageNumber + 1 === 1 } >
                    &lt;&lt;
                </styled.BackPageButton>

                <styled.BackPageButton 
                onClick = { () => {
                    paginate(pageNumber - 1);
                }} 
                disabled = { pageNumber + 1 === 1 } >
                    &lt;
                </styled.BackPageButton>

                    {
                        pageNumbers.map( (number) => {
                            return(
                                <styled.PageLi 
                                key = { number + 1 } 
                                className = "page-link" 
                                onClick = { () => paginate(number) } 
                                disabled = { pageNumber === number} >

                                    <span  className = "page-number">
                                        { number + 1 }
                                    </span>

                                </styled.PageLi>
                            )
                        })
                    }

                    <styled.NextPageButton 
                    onClick = { () => {
                        paginate(pageNumber + 1);
                    }} 

                    disabled = { pageNumber + 1 === totalPage } >
                        &gt;
                    </styled.NextPageButton>

                    <styled.NextPageButton 
                    onClick = { () => {
                        paginate(totalPage - 1);
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

export default Pagenation;