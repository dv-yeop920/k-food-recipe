import React from "react";
import styles from "./Comment.module.scss";
import getDate from "../../../utils/postDate";

const CommentDate = ({ createdAt }) => {
  return (
    <div>
      <span className={styles.text}>
        {`
        ${getDate(createdAt).year}-${getDate(createdAt).month + 1}-${
          getDate(createdAt).date
        } ${getDate(createdAt).hours}:${getDate(createdAt).minutes}`}
      </span>

      <span className={styles.text} style={{ cursor: "pointer" }}>
        답글 쓰기
      </span>
    </div>
  );
};

export default CommentDate;
