import React from "react";
import * as styled from "../styles/styledComponents";




const Pagenation = ( { postPerPage , totalPosts , paginate }) => {

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
                                key = { number } 
                                className = "page-item" 
                                onClick = { () => paginate(number) } >

                                    <styled.PageSpan  
                                    className = "page-link">
                                        { number + 1 }
                                    </styled.PageSpan>

                                </styled.PageLi>
                            )
                        })
                    }

                </styled.PageUl>

            </nav>
        </styled.PaginationContainer>
        </>
    );
};

export default Pagenation;