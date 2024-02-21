import React, { useRef } from "react";
import styles from "./NoticeBoard.module.css";
import button from "../../styles/Button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

const PostSearchInput = ({ setSearchParams }) => {
  const { authAndNavigate } = useAuth("");
  const searchRef = useRef(null);

  const onSubmitSearchParams = e => {
    e.preventDefault();

    setSearchParams({
      search: searchRef.current.value,
    });
  };

  return (
    <form className={styles.form} onSubmit={onSubmitSearchParams}>
      <input
        className={styles.input}
        id="postSearchInput"
        ref={searchRef}
        type="search"
        placeholder="단어 단위로 입력..."
        name={searchRef}
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
          return;
        }}
      />
    </form>
  );
};

export default PostSearchInput;
