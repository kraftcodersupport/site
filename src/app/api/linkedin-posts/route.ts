import { NextRequest, NextResponse } from "next/server";
import { getPosts, updatePost, deletePostDocument } from "@/lib/db-fallback";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const posts = await getPosts();
    return NextResponse.json({ success: true, posts });
  } catch (error: any) {
    console.error("Failed to fetch LinkedIn posts:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "id and status are required fields." },
        { status: 400 }
      );
    }

    if (!["pending", "selected", "posted"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value. Must be pending, selected, or posted." },
        { status: 400 }
      );
    }

    const posts = await getPosts();
    const postToUpdate = posts.find((p) => p._id === id);
    if (!postToUpdate) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (status === "selected") {
      // Unselect other posts in the same batch/date
      for (const p of posts) {
        if (p.batch_date === postToUpdate.batch_date && p._id !== id && p.status === "selected") {
          await updatePost(p._id, { status: "pending" });
        }
      }
    }

    const updatedPost = await updatePost(id, { status });

    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error: any) {
    console.error("Failed to update LinkedIn post:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "id query parameter is required." },
        { status: 400 }
      );
    }

    const deleted = await deletePostDocument(id);

    if (!deleted) {
      return NextResponse.json({ error: "Post not found or already deleted" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Post deleted successfully.",
      id,
    });
  } catch (error: any) {
    console.error("Failed to delete LinkedIn post:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete post" },
      { status: 500 }
    );
  }
}
