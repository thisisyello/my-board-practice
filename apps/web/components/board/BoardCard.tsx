import styles from "./BoardCard.module.css";

type BoardCardProps = {
  title: string;
  author: string;
  date: string;
};

export default function BoardCard({title, author, date}: BoardCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{title}</div>
      <div className={styles.meta}>
        {author} · {date}
      </div>
    </div>
  );
}