import React from "react";
import styles from "./MenuModal.module.scss";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, selectUser } from "store/slice/userSlice";
import useAuth from "hooks/useAuth";
import toastMessage from "utils/toast";

const MenuModal = ({ openModal, closeModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin } = useSelector(selectUser);
  const { authAndNavigate } = useAuth();

  const handleClickLogout = async () => {
    try {
      if (window.confirm("로그아웃 하시겠습니까?")) {
        const response = await axios.post("/api/users/signOut");

        if (response.status === 200) {
          toastMessage(response.data.messsage);
          dispatch(logoutUser());
          closeModal();
          navigate("/");
          axios.defaults.headers.common["Authorization"] = ``;
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.menuContainer}>
      <ul className={styles.menu_area}>
        <li className={styles.menu} onClick={closeModal}>
          <Link className={styles.menuLink} to="/postList">
            자유 게시판
          </Link>
        </li>

        <li
          style={{ borderBottom: "1px solid #ddd" }}
          className={styles.menu}
          onClick={() => {
            authAndNavigate("/mypage");
            closeModal();
          }}
        >
          <span className={styles.menuLink}>마이 페이지</span>
        </li>

        {isLogin ? null : (
          <li
            className={styles.menu}
            onClick={() => {
              openModal("signup");
            }}
          >
            <span className={styles.menuLink}>회원 가입</span>
          </li>
        )}

        <li
          className={styles.menu}
          onClick={() => {
            !isLogin && openModal("login");
            isLogin && handleClickLogout();
            return;
          }}
        >
          <span className={styles.menuLink}>
            {isLogin ? "로그아웃" : "로그인"}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default MenuModal;
