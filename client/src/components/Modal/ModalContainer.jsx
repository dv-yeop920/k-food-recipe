import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  openModal,
  selectModal,
} from "../../store/slice/modalSlice";
import LoginModal from "./Sign/LoginModal";
import SignUpModal from "./Sign/SignUpModal";
import MenuModal from "./Menu/MenuModal";
import useInput from "../../hooks/useInput";
import styles from "./Sign/SignModal.module.scss";
import { useSearchParams } from "react-router-dom";
import SearchModal from "./Search/SearchModal";

const ModalContainer = () => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const { type, isOpen } = useSelector(selectModal);
  const [searchParams, setSearchParams] = useSearchParams();

  const [
    userName,
    userId,
    userPassword,
    checkPassword,
    userEmail,
    onChangeValue,
    setValueInit,
  ] = useInput("");

  useEffect(() => {
    if (type === "login" || type === "signup") {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [type]);

  if (!isOpen) {
    return null;
  }

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleOpenModal = type => {
    dispatch(openModal(type));
  };

  const handleClickOutside = event => {
    if (modalRef.current === event.target) {
      handleCloseModal();
    }
  };

  const renderModal = () => {
    switch (type) {
      case "login":
        return (
          <LoginModal
            openModal={handleOpenModal}
            closeModal={handleCloseModal}
            userId={userId}
            userPassword={userPassword}
            onChangeValue={onChangeValue}
            setValueInit={setValueInit}
          />
        );
      case "signup":
        return (
          <SignUpModal
            openModal={handleOpenModal}
            closeModal={handleCloseModal}
            userName={userName}
            userId={userId}
            userPassword={userPassword}
            checkPassword={checkPassword}
            userEmail={userEmail}
            onChangeValue={onChangeValue}
            setValueInit={setValueInit}
          />
        );
      case "menu":
        return (
          <MenuModal
            openModal={handleOpenModal}
            closeModal={handleCloseModal}
          />
        );
      case "search":
        return (
          <SearchModal
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            closeModal={handleCloseModal}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main
      className={
        (type === "signup") | (type === "login")
          ? styles.signModal
          : styles.modal
      }
      ref={modalRef}
      onClick={handleClickOutside}
    >
      {renderModal()}
    </main>
  );
};

export default ModalContainer;
