"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { postApi } from "@/lib/postApi";
import { commentApi } from "@/lib/commentApi";

import BoardListItem from "@/components/board/BoardListItem";
import PageNation from "@/components/board/PageNation";
import Link from "next/link";
import styles from "./page.module.css";

type Post = {
  id: number;
  title: string;
  user: { userName: string };
  createdAt: string;
  likes: number;
};

type Comment = {
  id: number;
  content: string;
  createdAt: string;
  post?: { title: string };
};

export default function MyPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"posts" | "comments">("posts");
  const [isMounted, setIsMounted] = useState(false);
  
  // Posts State
  const [posts, setPosts] = useState<Post[]>([]);
  const [postPage, setPostPage] = useState(1);
  const [postTotalPages, setPostTotalPages] = useState(1);

  // Comments State
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fetchMyPosts = useCallback(async () => {
    try {
      const data = await postApi.getMyPosts(postPage);
      setPosts(data.posts);
      setPostTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch my posts", error);
    }
  }, [postPage]);

  const fetchMyComments = useCallback(async () => {
    try {
      const data = await commentApi.getMyComments();
      setComments(data);
    } catch (error) {
      console.error("Failed to fetch my comments", error);
    }
  }, []);

  useEffect(() => {
    if (isMounted && !user) {
      router.push("/auth/login");
    }
  }, [user, router, isMounted]);

  useEffect(() => {
    if (!user) return;
    if (activeTab === "posts") {
      fetchMyPosts();
    } else {
      fetchMyComments();
    }
  }, [activeTab, fetchMyPosts, fetchMyComments, user]);

  if (!isMounted) return null;
  if (!user) return null;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>마이페이지</h1>
      <div className={styles.welcome}>
        <strong>{user.userName}</strong>님, 환영합니다!
      </div>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === "posts" ? styles.active : ""}`}
          onClick={() => setActiveTab("posts")}
        >
          내가 쓴 글
        </button>
        <button 
          className={`${styles.tab} ${activeTab === "comments" ? styles.active : ""}`}
          onClick={() => setActiveTab("comments")}
        >
          내가 쓴 댓글
        </button>
      </div>

      <div className={styles.list}>
        {activeTab === "posts" ? (
          <>
            <div className={styles.list}>
              {posts.length === 0 ? (
                <div className={styles.empty}>
                  아직 작성한 게시글이 없습니다.
                </div>
              ) : (
                posts.map((post) => (
                  <BoardListItem
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    author={post.user?.userName}
                    date={new Date(post.createdAt).toLocaleDateString()}
                    likes={post.likes}
                  />
                ))
              )}
            </div>
            {posts.length > 0 && (
               <PageNation page={postPage} totalPages={postTotalPages} onPageChange={setPostPage} />
            )}
          </>
        ) : (
          <div className={styles.list}>
            {comments.length === 0 ? (
              <div className={styles.empty}>
                아직 작성한 댓글이 없습니다.
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className={styles.commentItem}>
                  <div className={styles.commentMeta}>
                    <span className={styles.commentTarget}>
                      To:{" "}
                      {comment.post ? (
                        <Link 
                          href={`/post/${comment.postId}`} 
                          className={styles.link}
                        >
                          {comment.post.title}
                        </Link>
                      ) : (
                        "삭제된 게시글"
                      )}
                    </span>
                    <span>
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={styles.commentBody}>
                    {comment.content}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
