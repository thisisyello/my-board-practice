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
          id = {1}
          title="title1"
          author="name"
          date="2025.12.14"
          likes={0}
        />
        <BoardCard
          id = {2}
          title="title2"
          author="name"
          date="2025.12.14"
          likes={0}
        />
        <BoardCard
          id = {3}
          title="title3"
          author="name"
          date="2025.12.14"
          likes={0}
        />
      </div>
    </section>
  );
}