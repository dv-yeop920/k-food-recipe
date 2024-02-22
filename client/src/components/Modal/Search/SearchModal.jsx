import React, { useRef } from "react";
import styles from "./SearchModal.module.css";
import button from "../../../styles/Button.module.css";

const SearchInputModal = ({ searchParams, setSearchParams, closeModal }) => {
  const searchRef = useRef(null);
  const tabParams = searchParams.get("tab");

  const onSubmitSearchParams = e => {
    e.preventDefault();

    setSearchParams({
      search: searchRef.current.value,
      tab: tabParams,
    });
    closeModal();
  };

  return (
    <section className={styles.searchContainer}>
      <form className={styles.form} onSubmit={onSubmitSearchParams}>
        <input
          className={styles.input}
          id="postSearchInput"
          ref={searchRef}
          type="search"
          placeholder="단어 단위로 입력..."
          name={searchRef}
        />

        <button
          className={button.submit}
          type="submit"
          style={{ marginRight: "0.2rem" }}
        >
          검색
        </button>

        <button className={button.cancle} type="button" onClick={closeModal}>
          취소
        </button>
      </form>
    </section>
  );
};

export default SearchInputModal;
