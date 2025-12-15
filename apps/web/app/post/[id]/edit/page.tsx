import PostWriteForm from "@/components/post/PostWriteForm";

export default function EditPostPage() {
  return (
    <PostWriteForm
      mode="edit"
      initialTitle="기존 제목"
      initialContent="기존 내용"
    />
  );
}