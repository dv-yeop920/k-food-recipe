import { useState } from "react";


const useModal = (initialState) => {
    const [modal , setModal] = useState(initialState);
    const [loginModal , setLoginModal] = useState(initialState);
    const [signUpModal , setSignUpModal] = useState(initialState);

    const openModal = () => {
        return setModal(!modal);
    }

    const openCloseLoginModal = () => {
        return setLoginModal(!loginModal);
    }

    const openCloseSignUpModal = () => {
        return setSignUpModal(!signUpModal);
    }
    
    const changeModal = () => {
        setLoginModal(!loginModal);
        return setSignUpModal(!signUpModal);
    }

    return [ 
            modal,
            openModal,
            loginModal,
            signUpModal,
            openCloseLoginModal, 
            openCloseSignUpModal, 
            changeModal 
        ];
}


export default useModal;