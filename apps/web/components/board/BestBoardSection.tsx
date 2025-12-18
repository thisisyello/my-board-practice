"use client";
import { useEffect, useState } from "react";
import styles from "./BestBoardSection.module.css";
import BoardCard from "./BoardCard";
import { postApi } from "@/lib/postApi";

type Post = {
  id: number;
  title: string;
  user: { userName: string };
  createdAt: string;
  likes: number;
};

export default function BestBoardSection() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postApi.getBest();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.badge}>BEST</span>
        <h2 className={styles.title}>BEST BOARD</h2>
      </div>

      <div className={styles.grid}>
        {posts.length === 0 ? (
           <div style={{ padding: "20px", color: "#666" }}>게시글이 없습니다.</div>
        ) : (
          posts.map((post) => (
            <BoardCard
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
    </section>
  );
}