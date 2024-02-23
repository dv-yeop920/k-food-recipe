import { useEffect, useState } from "react";
import styles from "./PagiNation.module.scss";

const Pagination = ({
  onClickPageNumber,
  totalPostLength, //NOTE - 게시물의 총 개수
  pageParam, //NOTE - 페이지의 초기값
}) => {
  const [pageNumber, setPageNumber] = useState();
  const pageNumbers = [];
  //NOTE - 페이지당 게시물 개수
  const PAGE_NUMBER = parseInt(pageParam);
  const POST_PER_PAGE = 5;
  const PAGE_NUMBER_LIMIT = 5;
  const totalPage = Math.ceil(totalPostLength / POST_PER_PAGE);

  for (let i = 0; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  //NOTE - 페이지 블록 번호
  const pageBlockArea = Math.ceil(pageNumber / PAGE_NUMBER_LIMIT);
  //NOTE - 페이지 블록 마다 보여줄 페이지 번호 개수
  const start = (pageBlockArea - 1) * PAGE_NUMBER_LIMIT + 1;
  const end = pageBlockArea * PAGE_NUMBER_LIMIT + 1;
  const newPageNumbers = pageNumbers.slice(start, end);
  const newPageNumberss =
    newPageNumbers.length > 0
      ? newPageNumbers
      : pageNumbers.slice(1, totalPage);

  useEffect(() => {
    if (!pageNumbers.includes(PAGE_NUMBER)) {
      setPageNumber(pageNumbers[1]);
    } else {
      setPageNumber(PAGE_NUMBER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam]);

  return (
    <footer className={styles.container}>
      <nav className={styles.pagination_nav}>
        <div className={styles.back_button_box}>
          <button
            className={styles.back}
            type="button"
            onClick={() => {
              onClickPageNumber(1);
            }}
            disabled={pageNumber === 1}
          >
            &lt;&lt;
          </button>

          <button
            className={styles.back}
            onClick={() => {
              onClickPageNumber(pageNumber - 1);
            }}
            disabled={pageNumber === 1}
          >
            &lt;
          </button>
        </div>

        <ul className={styles.ul}>
          {newPageNumberss.map(number => {
            return (
              <li
                key={number}
                className={styles.page_number}
                onClick={() => {
                  if (pageNumber !== number) {
                    onClickPageNumber(number);
                  }
                }}
                disabled={pageNumber === number}
              >
                <span className="page-number">{number}</span>
              </li>
            );
          })}
        </ul>

        <div className={styles.next_button_box}>
          <button
            className={styles.next}
            onClick={() => {
              onClickPageNumber(pageNumber + 1);
            }}
            disabled={pageNumber === totalPage}
          >
            &gt;
          </button>

          <button
            className={styles.next}
            onClick={() => {
              onClickPageNumber(totalPage);
            }}
            disabled={pageNumber === totalPage}
          >
            &gt;&gt;
          </button>
        </div>
      </nav>
    </footer>
  );
};

export default Pagination;
