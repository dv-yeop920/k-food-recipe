import { useState } from "react";


const useSignModal = (initialState) => {
    const [loginModal , setLoginModal] = useState(initialState);
    const [signUpModal , setSignUpModal] = useState(initialState);

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
            loginModal,
            signUpModal,
            openCloseLoginModal, 
            openCloseSignUpModal, 
            changeModal 
        ];
}


export default useSignModal;