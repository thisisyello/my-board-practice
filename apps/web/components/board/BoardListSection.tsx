"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import BoardListItem from "./BoardListItem";
import styles from "./BoardListSection.module.css";
import PageNation from "@/components/board/PageNation"
import { postApi } from "@/lib/postApi";

type Post = {
  id: number;
  title: string;
  user: { userName: string };
  createdAt: string;
  likes: number;
};

export default function PostListSection() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postApi.getAll(page);
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, [page]);

  return (
    <section className={styles.section}>
      <div className={styles.titleRow}>
        <h2 className={styles.title}>BOARD</h2>
        <Link href="/post/new" className={styles.writeBtn}>
          + 글쓰기
        </Link>
      </div>

      <div className={styles.listBox}>
        {posts.length === 0 ? (
          <div className={styles.empty}>게시글이 없습니다.</div>
        ) : (
          posts.map((post) => (
            <BoardListItem
              key={post.id}
              id={post.id}
              title={post.title}
              author={post.user?.userName || "익명"}
              date={new Date(post.createdAt).toLocaleDateString()}
              likes={post.likes || 0}
            />
          ))
        )}
      </div>
      <PageNation page={page} totalPages={totalPages} onPageChange={setPage} />
    </section>
  );
}