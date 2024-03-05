import styles from "./PostList.module.scss";
import { Link } from "react-router-dom";
import getDate from "utils/postDate";
import useLazyLoadImage from "hooks/useLazyLoadImage";

const Post = ({ post }) => {
  const { _id, title, id, commentCount, viewCount, createdAt, image } = post;

  const { lazyLoadImage } = useLazyLoadImage();

  const lazyLoadParams = {
    key: "post_detail",
    image,
    width: 120,
    height: 100,
    order: "게시물 이미지",
  };

  return (
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

      {image && lazyLoadImage(lazyLoadParams)}
    </li>
  );
};

export default Post;
