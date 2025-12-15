import Link from "next/link";
import styles from "./PostDetail.module.css";
import CommentList from "@/components/comment/CommentList";
import CommentForm from "@/components/comment/CommentForm";
import LikeButton from "./LikeButton";
import PostAction from "@/components/post/PostAction";

export default function PostDetail() {
  const post = {
    id: 1,
    title: "title",
    author: "yello",
    date: "2025.03.01",
    content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    likes: 0,
  };

  return (
    <div className={styles.wrap}>
      <Link href="/" className={styles.back}>
        ◀︎ 목록으로
      </Link>

      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.meta}>
        <div className={styles.metaLeft}>
          {post.author} · {post.date}
        </div>

        <div className={styles.metaRight}>
          <LikeButton initialCount={post.likes} />
          <PostAction postId={post.id} />
        </div>
      </div>

      <div className={styles.card}>
        {post.content}
      </div>

      <CommentList />
      <CommentForm />
    </div>
  );
}