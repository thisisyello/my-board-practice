import Link from "next/link";
import styles from "./BoardListItem.module.css";

type BoardListItemProps = {
  id: number | string;
  title: string;
  author: string;
  date: string;
  likes: number;
};

export default function BoardListItem({id, title, author, date, likes=0}: BoardListItemProps) {
  return (
    <Link href={`/post/${id}`} className={styles.item}>
      <div className={styles.left}>
        <span className={styles.title}>{title}</span>
      </div>

      <div className={styles.right}>
        <span className={styles.like}>💛 {likes}</span>
        <span className={styles.author}>{author}</span>
        <span className={styles.date}>{date}</span>
      </div>
    </Link>
  );
}