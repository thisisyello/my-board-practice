"use client";

import styles from "./PageNation.module.css";

type PaginationProps = {
  page: number; // 현재 페이지 (1부터)
  totalPages: number; // 전체 페이지 수
  onPageChange: (nextPage: number) => void;
};

export default function PageNation({page, totalPages, onPageChange}: PaginationProps) {
  // 화면에 보여줄 페이지 버튼 개수
  const maxButtons = 5;

  // 시작/끝 페이지 계산 (가운데에 현재 페이지가 오도록)
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, page - half);
  const end = Math.min(totalPages, start + maxButtons - 1);

  // end가 totalPages에 막혀서 줄어들면 start를 당겨서 버튼 수 맞추기
  start = Math.max(1, end - maxButtons + 1);

  const pages: number[] = [];
  for (let p = start; p <= end; p++) pages.push(p);

  const goPrev = () => onPageChange(Math.max(1, page - 1));
  const goNext = () => onPageChange(Math.min(totalPages, page + 1));

  return (
    <div className={styles.wrap}>
      <nav className={styles.nav} aria-label="pagination">
        <button className={styles.btn} onClick={goPrev} disabled={page <= 1} type="button">
          이전
        </button>

        <div className={styles.pages}>
          {pages.map((p) => (
            <button key={p} type="button" onClick={() => onPageChange(p)} className={`${styles.pageBtn} ${p === page ? styles.active : ""}`} aria-current={p === page ? "page" : undefined}>
              {p}
            </button>
          ))}
        </div>

        <button className={styles.btn} onClick={goNext} disabled={page >= totalPages} type="button">
          다음
        </button>
      </nav>
    </div>
  );
}