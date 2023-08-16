import { useRef, useState } from "react";


const useModal = (initialState) => {
    const [menuModal , setMenuModal] = useState(initialState);
    const [loginModal , setLoginModal] = useState(initialState);
    const [signUpModal , setSignUpModal] = useState(initialState);
    const modalRef = useRef(null);


    const modalOutSideClick = (e) => {
        if(modalRef.current === e.target) {
            switch(e.target.className) {
                case  "sign-modal":
                    setMenuModal(false);
                    setLoginModal(false);
                    setSignUpModal(false);
                    break;
                case "menu-modal":
                    setMenuModal(false);
                    break;
                default:
            }
        }
    }

    const openMenuModal = () => {
        setMenuModal(!menuModal);
        return;
    }

    const openCloseLoginModal = () => {
        setLoginModal(!loginModal);
        return;
    }

    const openCloseSignUpModal = () => {
            setSignUpModal(!signUpModal);
            return;
    }
    
    const changeModal = () => {
        setLoginModal(!loginModal);
        setSignUpModal(!signUpModal);
        return;
    }

    return [ 
            menuModal,
            openMenuModal,
            loginModal,
            signUpModal,
            openCloseLoginModal, 
            openCloseSignUpModal, 
            changeModal ,
            modalRef,
            modalOutSideClick
        ];
}


export default useModal;