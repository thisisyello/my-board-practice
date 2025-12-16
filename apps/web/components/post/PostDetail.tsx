"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./PostDetail.module.css";
import CommentList from "@/components/comment/CommentList";
import CommentForm from "@/components/comment/CommentForm";
import LikeButton from "./LikeButton";
import PostAction from "@/components/post/PostAction";
import { postApi } from "@/lib/postApi";
import { Router } from "next/router";

type PostDetailProps = {
  postId: number;
};

type Post = {
  id: number;
  title: string;
  content: string;
  userId: number;
  user: { userName: string };
  createdAt: string;
  likes: number;
};

export default function PostDetail({ postId }: PostDetailProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshComments, setRefreshComments] = useState(0);

  const toggleRefresh = () => setRefreshComments((prev) => prev + 1);
  const goBack = () => {
    window.history.back();
  };
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postApi.getOne(postId);
        setPost(data);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  if (loading) return <div className={styles.loading}>로딩 중...</div>;
  if (!post) return <div className={styles.error}>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className={styles.wrap}>
      <div onClick={goBack} className={styles.back}>
        ◀︎ 목록으로
      </div>

      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.meta}>
        <div className={styles.metaLeft}>
          {post.user.userName} · {new Date(post.createdAt).toLocaleDateString()}
        </div>

        <div className={styles.metaRight}>
          <LikeButton postId={post.id} initialCount={post.likes} />
          <PostAction postId={post.id} authorId={post.userId} />
        </div>
      </div>

      <div className={styles.card}>
        <div style={{ whiteSpace: "pre-wrap" }}>{post.content}</div>
      </div>

      <CommentList postId={post.id} refreshKey={refreshComments} />
      <CommentForm postId={post.id} onCommentAdded={toggleRefresh} />
    </div>
  );
}