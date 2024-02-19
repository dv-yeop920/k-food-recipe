import React from "react";
import styles from "./PagiNation.module.css";

const Pagination = ({
  postPerPage, //NOTE - 페이지당 게시물 개수
  totalPostLength, //NOTE - 게시물의 총 개수
  pageNumber, //NOTE - 페이지의 초기값
  paginate, //NOTE - 페이지 초기값 변경 하는 함수
}) => {
  const pageNumbers = [];
  const PAGE_NUMBER_LIMIT = 5;
  const totalPage = Math.ceil(totalPostLength / postPerPage);

  for (let i = 0; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  //NOTE - 페이지 블록 번호
  const pageBlockArea = Math.ceil(pageNumber / PAGE_NUMBER_LIMIT);
  //NOTE - 페이지 블록 마다 보여줄 페이지 번호 개수
  const start = (pageBlockArea - 1) * PAGE_NUMBER_LIMIT + 1;
  const end = pageBlockArea * PAGE_NUMBER_LIMIT + 1;
  const newPageNumbers = pageNumbers.slice(start, end);

  return (
    <>
      <div className={styles.container}>
        <nav>
          <ul className={styles.ul}>
            <button
              className={styles.back}
              type="button"
              onClick={() => {
                return paginate(1);
              }}
              disabled={pageNumber === 1}
            >
              &lt;&lt;
            </button>

            <button
              className={styles.back}
              onClick={() => {
                return paginate(pageNumber - 1);
              }}
              disabled={pageNumber === 1}
            >
              &lt;
            </button>

            {newPageNumbers.map(number => {
              return (
                <li
                  key={number}
                  className={styles.li}
                  onClick={() => {
                    paginate(number);
                  }}
                  disabled={pageNumber === number}
                >
                  <span className="page-number">{number}</span>
                </li>
              );
            })}

            <button
              className={styles.next}
              onClick={() => {
                return paginate(pageNumber + 1);
              }}
              disabled={pageNumber === totalPage}
            >
              &gt;
            </button>

            <button
              className={styles.next}
              onClick={() => {
                return paginate(totalPage);
              }}
              disabled={pageNumber === totalPage}
            >
              &gt;&gt;
            </button>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Pagination;
