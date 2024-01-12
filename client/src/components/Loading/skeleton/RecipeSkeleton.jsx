import { Skeleton } from "@mui/material";
import React from "react";
import TabSkeleton from "./TabSkeleton";
import styles from "../../MainPage/Recipe.module.css";

const MainSkeleton = () => {
  return (
    <>
      <TabSkeleton />
      <div className={`inner-box ${styles.recipe_section}`}>
        <div className={styles.recipe_list}>
          {Array.from({ length: 40 }).map((_, index) => (
            <div key={index}>
              <Skeleton
                animation="wave"
                variant="image"
                style={{ marginBottom: "10px" }}
                width={230}
                height={250}
              />
              <Skeleton
                animation="wave"
                variant="h4"
                width={230}
                height={30}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainSkeleton;
