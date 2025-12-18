import Link from "next/link";
import styles from "./BoardCard.module.css";

type BoardCardProps = {
  id: number | string;
  title: string;
  author: string;
  date: string;
  likes: number;
};

export default function BoardCard({id, title, author, date, likes = 0}: BoardCardProps) {
  return (
    <Link href={`/post/${id}`} className={styles.item}>
      <div className={styles.card}>
        <div className={styles.title}>{title}</div>
        <div className={styles.meta}>
          <span>{author}</span>
          <span>·</span>
          <span>{date}</span>

          <span className={styles.like}>
            💛 {likes}
          </span>
        </div>
      </div>
    </Link>
  );
}