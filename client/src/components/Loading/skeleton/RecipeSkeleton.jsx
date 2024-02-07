import { Skeleton } from "@mui/material";
import styles from "../../MainPage/Recipe.module.css";

const MainSkeleton = () => {
  return (
    <>
      <div
        className="inner-box"
        style={{ paddingTop: "12rem" }}
      >
        <div className={styles.recipe_list}>
          {Array.from({ length: 28 }).map((_, index) => (
            <div key={index}>
              <Skeleton
                animation="wave"
                variant="image"
                style={{ marginBottom: "0.5rem" }}
                width={290}
                height={280}
              />
              <Skeleton
                animation="wave"
                variant="h4"
                width={290}
                height={20}
              />
              <div
                style={{
                  marginTop: "0.5rem",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Skeleton
                  animation="wave"
                  variant="span"
                  width={82}
                  height={10}
                />
                <Skeleton
                  style={{ marginLeft: "1.35rem" }}
                  animation="wave"
                  variant="span"
                  width={82}
                  height={10}
                />
                <Skeleton
                  style={{ marginLeft: "1.35rem" }}
                  animation="wave"
                  variant="span"
                  width={82}
                  height={10}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainSkeleton;
