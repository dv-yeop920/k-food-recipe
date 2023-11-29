import React from "react";
import styles from "./MenuModal.module.css";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  logoutUser,
  selectUser,
} from "../../../store/slice/userSlice";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const MenuModal = ({ openModal, closeModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin } = useSelector(selectUser);
  const { authAndNavigate } = useAuth();

  const handleClickLogout = async () => {
    try {
      if (window.confirm("로그아웃 하시겠습니까?")) {
        const response = await axios.post(
          "/api/users/logout"
        );

        if (response.status === 200) {
          alert(response.data.messsage);
          dispatch(logoutUser());
          closeModal();
          navigate("/");
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.menuContainer}>
        <ul className="menu-area">
          <li className={styles.menu} onClick={closeModal}>
            <NavLink
              className={styles.menuLink}
              to="/noticeBoard"
            >
              자유 게시판
            </NavLink>
          </li>

          <li
            style={{ borderBottom: "1px solid #ddd" }}
            className={styles.menu}
            onClick={() => {
              authAndNavigate("/mypage");
              closeModal();
            }}
          >
            <span className={styles.menuLink}>
              마이 페이지
            </span>
          </li>

          {isLogin === true ? null : (
            <li
              className={styles.menu}
              onClick={() => {
                openModal("signup");
              }}
            >
              <span className={styles.menuLink}>
                회원 가입
              </span>
            </li>
          )}

          <li
            className={styles.menu}
            onClick={() => {
              isLogin === false && openModal("login");
              isLogin === true && handleClickLogout();
              return;
            }}
          >
            <span className={styles.menuLink}>
              {isLogin === true ? "로그아웃" : "로그인"}
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MenuModal;
