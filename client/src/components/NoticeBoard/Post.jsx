import React from "react";
import styles from "./NoticeBoard.module.css";
import { Link } from "react-router-dom";
import getDate from "../../utils/postDate";

const Post = ({ post }) => {
  const { _id, title, id, commentCount, viewCount, createdAt, image } = post;

  return (
    <ul className="board">
      <li className={styles.li}>
        <Link className={styles.navLink} to={`/postDetail/${_id}`}>
          <div>
            <h3 className={styles.title}>{title}</h3>
            <span className={styles.content}>{id}</span>
            <span className={styles.content}>❤️0</span>
            <span className={styles.content}>{`댓글 ${commentCount}`}</span>
            <span className={styles.content}>{`조회 ${viewCount}`}</span>
            <span className={styles.content}>
              {`
                ${getDate(createdAt).year}-${getDate(createdAt).month + 1}-${
                getDate(createdAt).date
              } 
              ${getDate(createdAt).hours}:${getDate(createdAt).minutes}`}
            </span>
          </div>
        </Link>
        <img
          style={
            image ? { height: "70px", width: "90px" } : { display: "none" }
          }
          alt="미리보기 이미지"
          src={image}
        />
      </li>
    </ul>
  );
};

export default Post;
