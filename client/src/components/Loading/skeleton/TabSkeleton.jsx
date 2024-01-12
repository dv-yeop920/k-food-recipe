import React from "react";
import { Skeleton } from "@mui/material";
import styles from "../../MainPage/Recipe.module.css";

const TabSkeleton = () => {
  return (
    <nav className={styles.recipe_nav}>
      <div className={styles.nav_box}>
        <div className={styles.nav_column}>
          <div className={styles.back_box}>
            <Skeleton
              animation="wave"
              variant="button"
              style={{
                borderRadius: "50%",
                marginRight: "0.5rem",
              }}
              width={32}
              height={32}
            />
          </div>

          <ul className={styles.tab_box}>
            {Array.from({ length: 20 }).map((_, index) => {
              return (
                <li key={index}>
                  <Skeleton
                    animation="wave"
                    variant="button"
                    style={{ marginRight: "0.5rem" }}
                    width={98}
                    height={65}
                  />
                </li>
              );
            })}
          </ul>

          <div className={styles.next_box}>
            <Skeleton
              animation="wave"
              variant="button"
              style={{
                borderRadius: "50%",
                marginLeft: "0.5rem",
              }}
              width={32}
              height={32}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TabSkeleton;
