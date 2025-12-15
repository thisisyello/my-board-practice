"use client";
import { useState } from "react";
import Link from "next/link";
import BoardListItem from "./BoardListItem";
import styles from "./BoardListSection.module.css";
import PageNation from "@/components/board/PageNation"

export default function PostListSection() {
  const [page, setPage] = useState(1);

  return (
    <section className={styles.section}>
      <div className={styles.titleRow}>
        <h2 className={styles.title}>BOARD</h2>
        <Link href="/post/new" className={styles.writeBtn}>
          + 글쓰기
        </Link>
      </div>

      <div className={styles.listBox}>
        <BoardListItem
          id={1}
          title="title1"
          author="name"
          date="2025.12.14"
          likes={0}
        />
        <BoardListItem
          id={2}
          title="title2"
          author="name"
          date="2025.12.14"
          likes={0}
        />
        <BoardListItem
          id={3}
          title="title3"
          author="name"
          date="2025.12.14"
          likes={0}
        />
        <BoardListItem
          id={4}
          title="title4"
          author="name"
          date="2025.12.14"
          likes={0}
        />
        <BoardListItem
          id={5}
          title="title5"
          author="name"
          date="2025.12.14"
          likes={0}
        />
        <BoardListItem
          id={6}
          title="title6"
          author="name"
          date="2025.12.14"
          likes={0}
        />
        <BoardListItem
          id={7}
          title="title7"
          author="name"
          date="2025.12.14"
          likes={0}
        />
        <BoardListItem
          id={8}
          title="title8"
          author="name"
          date="2025.12.14"
          likes={0}
        />
        <BoardListItem
          id={9}
          title="title9"
          author="name"
          date="2025.12.14"
          likes={0}
        />
        <BoardListItem
          id={10}
          title="title10"
          author="name"
          date="2025.12.14"
          likes={0}
        />
      </div>
      <PageNation page={page} totalPages={5} onPageChange={setPage} />
    </section>
  );
}