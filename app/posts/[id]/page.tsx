"use client";

import CommentForm from "../../../components/CommentForm";
import Nav from "@/components/nav";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PostPage() {
  const params = useParams();
  const postId = params.id as string;

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const res = await fetch(`${baseUrl}/api/posts/${postId}`, {
        cache: "no-store",
      });

      if (res.ok) {
        setPost(await res.json());
      }
      setLoading(false);
    };

    fetchPost();
  }, [postId]);

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="w-full h-screen flex items-center flex-col gap-[70px]">
      <Nav />
      <div className="w-[700px] flex flex-col gap-[20px]">
        <h1 className="font-bold text-[30px]">{post?.title}</h1>
        <p>By {post?.user?.name || post?.user?.email || "Unknown"}</p>
        <img src={post.imageUrl} alt="" />
        <p className="">{post?.content}</p>
      </div>
      <div className="bg-gray-50 p-6 rounded-b-xl w-full max-w-[700px] mt-[50px] border-t-[1px] border-[rgb(210,210,210)]">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">Сэтгэгдэл</h2>
        {post.comments.length === 0 ? (
          <p className="text-gray-500 italic text-center py-4">
            Сэтгэгдэл байхгүй
          </p>
        ) : (
          <div className="space-y-4">
            {post.comments.map((comment: any) => (
              <div
                key={comment.id}
                className="bg-white p-4 rounded-lg border border-[rgb(210,210,210)]">
                <p className="text-base text-gray-800 mb-2">{comment.text}</p>
                <small className="text-gray-500 text-sm block text-right">
                  By {comment.user?.name || comment.user?.email || "Unknown"} on{" "}
                  {new Date(comment.createdAt).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="p-6 w-full max-w-[700px]">
        <CommentForm postId={post.id} />
      </div>
      <div className="mt-6">
        <Link href="./" className="text-blue-600 hover:underline">
          Back to Posts
        </Link>
      </div>
    </div>
  );
}
