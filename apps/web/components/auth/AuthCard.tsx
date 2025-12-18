import Link from "next/link";
import styles from "./AuthCard.module.css";

type AuthCardProps = {
  title: string;
  children: React.ReactNode;
};

export default function AuthCard({title, children}: AuthCardProps) {
  return (
    <div className={styles.wrap}>
      <Link href="/" className={styles.logo}>
        yello
      </Link>
      <section className={styles.card}>
        <h1 className={styles.title}>{title}</h1>
        {children}
      </section>
    </div>
  );
}