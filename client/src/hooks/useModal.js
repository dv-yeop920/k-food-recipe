import { useRef, useState } from "react";


const useModal = (initialState) => {

    const [menuModal , setMenuModal] = useState(initialState);
    const [loginModal , setLoginModal] = useState(initialState);
    const [signUpModal , setSignUpModal] = useState(initialState);
    const modalRef = useRef(null);


    const onClickModalOutSide = (e) => {

        if (modalRef.current === e.target) {

            switch (e.target.className) {

                case  "sign-modal" :
                    setMenuModal(false);
                    setLoginModal(false);
                    setSignUpModal(false);
                    break;

                case "menu-modal" :
                    setMenuModal(false);
                    break;

                default:
            }
        }
    }


    const onClickMenuModal = () => {

        setMenuModal(!menuModal);
        return;
    }

    const onClickLoginModal = () => {

        setLoginModal(!loginModal);
        return;
    }


    const onClickSignUpModal = () => {

            setSignUpModal(!signUpModal);
            return;
    }


    const onClickChangeModal = () => {

        setLoginModal(!loginModal);
        setSignUpModal(!signUpModal);
        return;
    }

    return [ 
            menuModal,
            onClickMenuModal,
            loginModal,
            signUpModal,
            onClickLoginModal, 
            onClickSignUpModal, 
            onClickChangeModal ,
            modalRef,
            onClickModalOutSide
        ];
}


export default useModal;