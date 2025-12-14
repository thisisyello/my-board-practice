import styles from "./Container.module.css";

type ContainerProps = {
  children: React.ReactNode;
  className: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <main className={`${styles.container}${className ? ` ${className}` : ""}`}>
      {children}
    </main>
  );
}