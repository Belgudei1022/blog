"use client";

import React, { useState, useEffect } from "react";

const Page = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await fetch("/api/profile", { cache: "no-store" });
        const data = await res.json();

        if (res.ok) {
          setPosts(data.posts || []);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchMyPosts();
  }, []);

  // console.log(posts)

  return (
    <div className="w-full min-h-screen">
      <h1 className="text-2xl font-bold">My Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="border p-4 my-2">
            <h2 className="font-semibold">{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
