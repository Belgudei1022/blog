import Link from "next/link";
import { Post } from "../lib/types";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="w-[700px] h-fit flex flex-row gap-[10px] border-b border-gray-300 py-10">
      <img
        src={post.imageUrl}
        alt=""
        className="h-[100px] w-[200px] object-cover"
      />
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl">{post.title}</h1>
        <p className="text-gray-600">
          {post.content.length > 50
            ? `${post.content.slice(0, 150)}...`
            : post.content}
          {post.content.length > 50 && (
            <span className="text-blue-500 cursor-pointer"> See more</span>
          )}
        </p>
      </div>
    </div>
  );
}
