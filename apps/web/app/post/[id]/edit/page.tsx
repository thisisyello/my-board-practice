"use client";

import PostWriteForm from "@/components/post/PostWriteForm";
import { postApi } from "@/lib/postApi";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";


export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  
  const [postId, setPostId] = useState<number | null>(null);
  const [post, setPost] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then((resolvedParams) => {
      setPostId(Number(resolvedParams.id));
    });
  }, [params]);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        const data = await postApi.getOne(postId);
        setPost(data);
      } catch (error) {
        console.error("Failed to fetch post:", error);
        alert("게시글을 불러오는데 실패했습니다.");
        router.back();
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId, router]);

  if (loading) return <div>로딩 중...</div>;
  if (!post || !postId) return null;

  return (
    <PostWriteForm
      mode="edit"
      initialTitle={post.title}
      initialContent={post.content}
      postId={postId}
    />
  );
}