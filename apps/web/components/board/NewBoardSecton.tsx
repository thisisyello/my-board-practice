import BoardCard from "./BoardCard";
import styles from "./NewBoardSection.module.css";

export default function NewBoardSection() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.badge}>NEW</span>
        <h2 className={styles.title}>NEW BOARD</h2>
      </div>

      <div className={styles.grid}>
        <BoardCard
            title="title"
            author="name"
            date="2025.12.14"
        />
        <BoardCard
            title="title"
            author="name"
            date="2025.12.14"
        />
        <BoardCard
            title="title"
            author="name"
            date="2025.12.14"
        />
      </div>
    </section>
  );
}