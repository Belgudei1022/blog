import React from "react";
import Link from "next/link";
import { NotebookPen, List, User } from "lucide-react";

const Nav = () => {
  return (
    <div className="w-full h-fit px-[80px] border-b-[1px] border-[rgb(210,210,210)] py-[30px] flex justify-center">
      <div className="max-w-[1440px] w-full flex flex-row justify-between items-center">
        <Link href="/">
          <h1 className="text-[30px] font-semibold">BlogZ</h1>
        </Link>
        <div className="flex flex-row gap-[50px]">
          <Link href="/posts">
            <div className="flex flex-row gap-[5px]">
              <List />
              <p className="font-medium">All Posts</p>
            </div>
          </Link>
          <Link href="/posts/createPost">
            <div className="flex flex-row gap-[5px]">
              <NotebookPen />
              <p className="font-medium">Add Post</p>
            </div>
          </Link>
          <Link href="/profile">
            <div className="flex flex-row gap-[5px]">
              <User />
              <p className="font-medium">Profile</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
