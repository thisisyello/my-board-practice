"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { postApi } from "@/lib/postApi";
import { commentApi } from "@/lib/commentApi";

import BoardListItem from "@/components/board/BoardListItem";
import PageNation from "@/components/board/PageNation";
import Link from "next/link";

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
    <div className="max-w-[800px] mx-auto my-10 px-5">
      <h1 className="text-2xl font-bold mb-5">마이페이지</h1>
      <div className="mb-10 text-base text-gray-600">
        <strong>{user.userName}</strong>님, 환영합니다!
      </div>

      <div className="flex gap-5 border-b border-gray-200 mb-5">
        <button 
          className={`py-2.5 text-base bg-none border-none border-b-2 cursor-pointer transition-all ${
            activeTab === "posts" 
              ? "text-gray-900 border-gray-900 font-bold" 
              : "text-gray-500 border-transparent hover:text-gray-900"
          }`}
          onClick={() => setActiveTab("posts")}
        >
          내가 쓴 글
        </button>
        <button 
          className={`py-2.5 text-base bg-none border-none border-b-2 cursor-pointer transition-all ${
            activeTab === "comments" 
              ? "text-gray-900 border-gray-900 font-bold" 
              : "text-gray-500 border-transparent hover:text-gray-900"
          }`}
          onClick={() => setActiveTab("comments")}
        >
          내가 쓴 댓글
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {activeTab === "posts" ? (
          <>
            <div className="flex flex-col gap-3">
              {posts.length === 0 ? (
                <div className="text-center text-gray-400 p-10 bg-gray-50 rounded-lg">
                  작성한 게시글이 없습니다.
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
            <PageNation page={postPage} totalPages={postTotalPages} onPageChange={setPostPage} />
          </>
        ) : (
          <div className="flex flex-col gap-3">
            {comments.length === 0 ? (
              <div className="text-center text-gray-400 p-10 bg-gray-50 rounded-lg">
                작성한 댓글이 없습니다.
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="bg-white p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between mb-2 text-[13px] text-gray-500">
                    <span className="text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                    <span className="font-semibold text-gray-600">
                      To:{" "}
                      {comment.post ? (
                        <Link 
                          href={`/post/${comment.postId}`} 
                          className="text-gray-600 no-underline cursor-pointer hover:underline hover:text-gray-900"
                        >
                          {comment.post.title}
                        </Link>
                      ) : (
                        "삭제된 게시글"
                      )}
                    </span>
                  </div>
                  <div className="text-[15px] text-gray-800 leading-relaxed">
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
