import React from "react";
import * as styled from "../styles/styledComponents";




const Pagenation = ({ postPerPage , totalPosts , paginate , pageNumber }) => {

    const pageNumbers = [];
    const totalPage = Math.ceil(totalPosts / postPerPage);

    for (let i = 0; i < totalPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <>
        <styled.PaginationContainer>
            <nav>

                <styled.PageUl className = "pagination">

                    {
                        pageNumbers.map( (number) => {
                            return(
                                <styled.PageLi 
                                key = { number + 1 } 
                                className = "page-item" 
                                onClick = { () => paginate(number) } >

                                    <span  
                                    className = "page-link">
                                        { number + 1 }
                                    </span>

                                </styled.PageLi>
                            )
                        })
                    }

                    <styled.NextPageButton 
                    onClick = { () => paginate(pageNumber + 1) } 
                    disabled = {pageNumber === totalPage} >
                        &gt;
                    </styled.NextPageButton>

                </styled.PageUl>

            </nav>
        </styled.PaginationContainer>
        </>
    );
};

export default Pagenation;