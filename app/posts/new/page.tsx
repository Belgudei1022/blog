"use client";

import { useState, useEffect } from "react";
import PostCard from "../../../components/PostCard";
import Nav from "@/components/nav";
import Link from "next/link";
import { Post } from "@/lib/types";

export default function LatestPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      const res = await fetch("/api/posts?latest=true", { cache: "no-store" });
      const data: Post[] = await res.json();
      setPosts(data);
    };
    fetchLatestPosts();
  }, []);

  return (
    <div className="w-full bg-gray-100 min-h-screen flex flex-col items-center gap-8">
      <nav className="w-full">
        <Nav />
      </nav>
      <h1 className="text-2xl font-bold text-gray-900">Latest Posts</h1>
      <div className="flex flex-col gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <div className="group hover:shadow-lg transform transition-all duration-300">
                <PostCard post={post} />
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-600">No latest posts found.</p>
        )}
      </div>
    </div>
  );
}