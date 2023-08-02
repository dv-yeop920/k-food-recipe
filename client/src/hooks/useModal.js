import { useState } from "react";


const useModal = (initialState) => {
    const [loginModal , setLoginModal] = useState(initialState);
    const [signUpModal , setSignUpModal] = useState(initialState);

    const openCloseLoginModal = () => {
        return setLoginModal(!loginModal);
    }

    const changeModal = () => {
        setLoginModal(!loginModal);
        return setSignUpModal(!signUpModal);
    }

    const openCloseSignUpModal = () => {
        return setSignUpModal(!signUpModal);
    }

    return [ loginModal , signUpModal , openCloseLoginModal , openCloseSignUpModal , changeModal ]
}


export default useModal;