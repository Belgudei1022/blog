import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";
import { Comment } from "../../../lib/types";

export async function POST(request: Request) {
  const { text, postId, authorId }: Partial<Comment> & { authorId: string } = await request.json();

  // Validate required fields
  if (!text || !postId || !authorId) {
    return NextResponse.json(
      { error: "Text, postId, and authorId are required" },
      { status: 400 }
    );
  }

  try {
    // Verify the post and author exist
    const postExists = await prisma.post.findUnique({ where: { id: postId } });
    const authorExists = await prisma.user.findUnique({ where: { id: authorId } });

    if (!postExists) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    if (!authorExists) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    const comment = await prisma.comment.create({
      data: {
        text,
        postId,
        authorId, // Now required
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ error: "Алдаа гарлаа" }, { status: 500 });
  }
}