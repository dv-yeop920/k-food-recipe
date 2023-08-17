import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";
import * as styled from "../styles/styledComponents";


const ScrollToTopButton = () => {

    const handleClickScroll = () => {

        window.scrollTo({
            top : 0,
            behavior : "smooth",
        });

    };

    return (
        <>
        <styled.ScrollToTopButton 
        className = "sroll-to-top"
        onClick = { handleClickScroll } >

            <FontAwesomeIcon
                icon = { faUpLong }
                size = "2x" />

        </styled.ScrollToTopButton>
        </>
    );
};

export default ScrollToTopButton;