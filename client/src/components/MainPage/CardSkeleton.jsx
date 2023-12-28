import React from "react";
import styles from "./cardSkeleton.module.css";
import Skeleton from "react-loading-skeleton";

const CardSkeleton = () => {
  return (
    <div className={styles.card_skeleton}>
      <Skeleton circle width={40} height={20} />
      <div>
        <Skeleton />
      </div>
    </div>
  );
};

export default CardSkeleton;
