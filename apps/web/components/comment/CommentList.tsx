import styles from "./CommentList.module.css";

export default function CommentList() {
  const comments = [
    { id: 1, author: "name", date: "2025.12.14", body: "comment1" },
    { id: 2, author: "name", date: "2025.12.14", body: "comment2" },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.titleRow}>
        <h2 className={styles.title}>댓글</h2>
        <div className={styles.count}>{comments.length}개</div>
      </div>

      <div className={styles.list}>
        {comments.map((c) => (
          <div key={c.id} className={styles.item}>
            <div className={styles.top}>
              <div className={styles.author}>{c.author}</div>
              <div className={styles.date}>{c.date}</div>
            </div>
            <div className={styles.body}>{c.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
