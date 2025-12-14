import styles from "./Container.module.css";

type ContainerProps = {
  children: React.ReactNode;
  className: string;
};

export default function Container({children}: ContainerProps) {
  return (
    <main className={styles.container}>
        {children}
    </main>
  );
}