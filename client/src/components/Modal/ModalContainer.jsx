import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal, selectModal } from "../../store/slice/modalSlice";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import NavItem from "./NavItem";
import useInput from "../../hooks/useInput";

const ModalContainer = () => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const { type, isOpen } = useSelector(selectModal);

  const [
    userName,
    userId,
    userPassword,
    checkPassword,
    userEmail,
    onChangeValue
] = useInput("");

  if (!isOpen) {
    return null;
  }


  const handleCloseModal = () => {
    dispatch(closeModal());
  }


  const handleOpenModal = (type) => {
    dispatch(openModal(type));
  }


  const handleClickOutside = (event) => {
    if (modalRef.current === event.target) {
      handleCloseModal();
    }
  }

  const renderModal = () => {
    switch (type) {
      case "login":
        return <LoginModal 
                openModal = { handleOpenModal }
                closeModal = { handleCloseModal } 
                userId = { userId }
                userPassword = { userPassword }
                onChangeValue = { onChangeValue } />
      case "signup":
        return <SignUpModal 
                openModal = { handleOpenModal }
                closeModal = { handleCloseModal } 
                userName = { userName }
                userId = { userId }
                userPassword = { userPassword }
                checkPassword = { checkPassword }
                userEmail = { userEmail } 
                onChangeValue = { onChangeValue } />
      case "menu":
        return <NavItem />
      default:
        return null;
    }
  }

  return (
    <div 
    className = { type === "menu" ? "menu-modal" : "sign-modal" }
    ref = { modalRef }
    onClick = { handleClickOutside }>
      { renderModal() }
    </div>
  );
};

export default ModalContainer;