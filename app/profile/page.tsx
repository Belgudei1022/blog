"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Nav from "@/components/nav";
import PostCard from "@/components/PostCard";

const Page = () => {
  const { data: session } = useSession();
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

  console.log(session);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <nav>
        <Nav />
      </nav>
      <div className="max-w-[1440px] w-full h-full flex flex-col mx-auto">
        <div className="py-[50px] w-full border-b border-gray-300">
          <div className="flex flex-row gap-[20px] ">
            <img
              src={session?.user.image || ""}
              alt=""
              className="w-[200px] h-[200px] rounded-[100px] "
            />
            <div className="flex flex-col">
              <h1 className="text-[28px] font-medium">{session?.user.name}</h1>
              <p className="text-gray-600 text-[20px]">{session?.user.email}</p>
            </div>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col items-center">
          {/* <h1 className="w-full max-w-[700px] text-[24px] font-medium">
            Posts
          </h1> */}
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <PostCard key={post.id} post={post} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
