import { NextRequest, NextResponse } from "next/server";
import Comment from "@/models/Comment";
import Blog from "@/models/Blog";
import User from "@/models/User";
import connectMongoDB from "@/db/mongodb";

export const POST = async (req, res) => {
    const body = await req.json();
    const { userId, comment, blogId } = body;

    try {
        await connectMongoDB();
        // Find the blog by ID
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return NextResponse.json({ message: 'Blog not found' });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: 'User not found' });
        }

        // Create a new comment
        const newComment = new Comment({
            comment,
            author: user._id,
            blog: blog._id
        });

        // Save the new comment
        const savedComment = await newComment.save();

        // Add the comment reference to the blog's comments array
        blog.comments.push(savedComment._id);
        await blog.save();

        return NextResponse.json(savedComment, {
            status: 201
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Server error' });
    }
};
