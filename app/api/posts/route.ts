import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";
import { Post } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");
  const latest = searchParams.get("latest");

  try {
    let posts: Post[];
    if (tag) {
      posts = await prisma.post.findMany({
        where: { tags: { has: tag } },
        orderBy: { createdAt: "desc" },
      });
    } else if (latest === "true") {
      posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
      });
    } else {
      posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Алдаа гарлаа" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const {
    title,
    content,
    imageUrl,
    tags,
    authorId,
  }: Partial<Post> & { authorId: string } = await request.json();

  // Validate required fields
  if (!title || !content || !authorId) {
    return NextResponse.json(
      { error: "Title, content, and authorId are required" },
      { status: 400 }
    );
  }

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl: imageUrl || null,
        tags: tags && Array.isArray(tags) ? tags : [],
        authorId, // Now required
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Алдаа гарлаа" }, { status: 500 });
  }
}
