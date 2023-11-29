import React from "react";
import styles from "./NoticeBoard.module.css";
import button from "../../styles/Button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/slice/modalSlice";

const PostSearchInput = ({
  userPostSearchValue,
  onSubmitGetFilteredPostList,
}) => {
  const dispatch = useDispatch();
  const { authAndNavigate } = useAuth("");

  return (
    <>
      <div className={styles.searchContainer}>
        <form
          className={styles.form}
          onSubmit={onSubmitGetFilteredPostList}
        >
          <input
            className={styles.input}
            ref={userPostSearchValue}
            type="search"
            placeholder="단어 단위로 입력..."
            name={userPostSearchValue}
          />

          <button className={button.submit} type="submit">
            검색
          </button>

          <FontAwesomeIcon
            className={styles.icon}
            icon={faPenToSquare}
            size="2x"
            onClick={() => {
              authAndNavigate("/writing");
              dispatch(closeModal());
              return;
            }}
          />
        </form>
      </div>
    </>
  );
};

export default PostSearchInput;
