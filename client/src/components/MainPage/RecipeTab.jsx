import React, { useEffect, useState } from "react";
import styles from "./Recipe.module.css";
import TabSkeleton from "./skeleton/TabSkeleton";
import { Skeleton } from "@mui/material";

const RecipeTab = () => {
  const [isLoading, setIsLoading] = useState(true);
  const tabList = [
    "굽기",
    "끓이기",
    "찌기",
    "튀기기",
    "반찬",
    "후식",
    "국/찌개",
    "볶기",
    "밥",
    "저염",
    "고기",
    "닭가슴살",
    "파스타",
  ];
  const renderTabList = () => {
    return tabList.map((item, index) => {
      return isLoading ? (
        <TabSkeleton />
      ) : (
        <li key={item + index}>
          <button className={styles.tab_button}>
            {item}
          </button>
        </li>
      );
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <nav className={styles.recipe_nav}>
      <div className={styles.nav_box}>
        <div className={styles.nav_column}>
          <div className={styles.back_box}>
            {isLoading ? (
              <Skeleton
                style={{ borderRadius: "50%" }}
                width={30}
                height={50}
              />
            ) : (
              <button className={styles.back}>&lt;</button>
            )}
          </div>

          <ul className={styles.tab_box}>
            {renderTabList()}
          </ul>
          <div className={styles.next_box}>
            {isLoading ? (
              <Skeleton
                style={{ borderRadius: "50%" }}
                width={30}
                height={50}
              />
            ) : (
              <button className={styles.next}>&gt;</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default RecipeTab;
