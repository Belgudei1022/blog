"use client";

import { useState, useEffect } from "react";
import PostCard from "../../components/PostCard";
import Nav from "@/components/nav";
import Link from "next/link";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const availableTags = ["Tech", "Life", "Education", "Health", "Travel"];

  useEffect(() => {
    const fetchPosts = async () => {
      const url = selectedTag ? `/api/posts?tag=${selectedTag}` : "/api/posts";
      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, [selectedTag]);

  return (
    <div className="w-full bg-gray-100 min-h-screen flex flex-col items-center gap-8">
      <nav className="w-full">
        <Nav />
      </nav>
      <div className="flex gap-3">
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            className={`px-4 py-2 rounded-md transition ${
              selectedTag === tag
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-6">
        {posts.length > 0 ? (
          posts.map((post: any) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <div className="group hover:shadow-lg transform transition-all duration-300">
                <PostCard post={post} />
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-600">No posts found.</p>
        )}
      </div>
    </div>
  );
}