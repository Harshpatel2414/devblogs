import connectMongoDB from '@/db/mongodb';
import Blog from '@/models/Blog';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  try {
    const { blogId, userId } = await req.json();

    await connectMongoDB();

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    if (blog.likes.includes(userId)) {
      return NextResponse.json({ message: 'You already liked this blog' }, { status: 400 });
    }

    blog.likes.push(userId);
    blog.likesCount += 1;

    await blog.save();

    return NextResponse.json({ message: 'Blog liked successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error liking blog: ", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};