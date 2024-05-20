import connectMongoDB from '@/db/mongodb';
import Blog from '@/models/Blog';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  try {
    const { blogId, userId } = await req.json();
    
    await connectMongoDB();

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return  NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    if (!blog.likes.includes(userId)) {
      return  NextResponse.json({ message: 'You have not liked this blog' }, { status: 400 });
    }

    blog.likes = blog.likes.filter(id => id.toString() !== userId);
    blog.likesCount -= 1;

    await blog.save();

    return  NextResponse.json({ message: 'Blog unliked successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error unliking blog: ", error);
    return  NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
