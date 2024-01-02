import React, { useEffect, useState } from "react";
import styles from "./Recipe.module.css";
import TabSkeleton from "./TabSkeleton";

const RecipeTab = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <nav className={styles.recipe_nav}>
      <div className={styles.backBox}>
        <button className={styles.back}>&lt;</button>
      </div>

      <ul className={styles.tab_box}>
        {isLoading ? (
          <TabSkeleton />
        ) : (
          <li>
            <button className={styles.tab_button}>
              굽기
            </button>
          </li>
        )}

        <li>
          <button className={styles.tab_button}>
            끓이기
          </button>
        </li>
        <li>
          <button className={styles.tab_button}>
            찌기
          </button>
        </li>
        <li>
          <button className={styles.tab_button}>
            튀기기
          </button>
        </li>
        <li>
          <button className={styles.tab_button}>
            반찬
          </button>
        </li>
        <li>
          <button className={styles.tab_button}>
            후식
          </button>
        </li>
        <li>
          <button className={styles.tab_button}>
            국/찌개
          </button>
        </li>
        <li>
          <button className={styles.tab_button}>
            볶기
          </button>
        </li>
        <li>
          <button className={styles.tab_button}>밥</button>
        </li>

        <li>
          <button className={styles.tab_button}>
            저염
          </button>
        </li>
        <li>
          <button className={styles.tab_button}>
            고기
          </button>
        </li>
        <li>
          <button className={styles.tab_button}>
            닭가슴살
          </button>
        </li>
        <li>
          <button className={styles.tab_button}>
            파스타
          </button>
        </li>
        <li>
          <button className={styles.tab_button}>
            파스타
          </button>
        </li>
        <li>
          <button className={styles.tab_button}>
            파스타
          </button>
        </li>
        <li>
          <button className={styles.tab_button}>
            파스타
          </button>
        </li>
      </ul>
      <div className={styles.nextBox}>
        <button className={styles.next}>&gt;</button>
      </div>
    </nav>
  );
};

export default RecipeTab;
