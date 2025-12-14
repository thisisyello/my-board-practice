import styles from "./BestBoardSection.module.css";
import BoardCard from "./BoardCard";

export default function BestBoardSection() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.badge}>BEST</span>
        <h2 className={styles.title}>BEST BOARD</h2>
      </div>

      <div className={styles.grid}>
        <BoardCard
          title="title1"
          author="name"
          date="2025.12.14"
        />
        <BoardCard
          title="title2"
          author="name"
          date="2025.12.14"
        />
        <BoardCard
          title="title3"
          author="name"
          date="2025.12.14"
        />
      </div>
    </section>
  );
}