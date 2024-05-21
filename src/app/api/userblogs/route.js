import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/db/mongodb";
import User from "@/models/User";
import Blog from "@/models/Blog";

export const POST = async (req, res) => {

    try {
        await connectMongoDB();
        const blogsPerPage = 3;

        const { userId, page } = await req.json();

        if (!userId) {
            console.log('User ID is required');
            return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }
        const totalBlogs = await Blog.countDocuments({ author: userId });

        const userWithBlogs = await User.findById(userId)
            .populate({
                path: 'blogs',
                select: 'title description image author createdAt updatedAt',
                options: {
                    limit: parseInt(blogsPerPage),
                    skip: parseInt(page * blogsPerPage)
                }
            })
            .exec();


        if (!userWithBlogs) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        if (!userWithBlogs.blogs || userWithBlogs.blogs.length === 0) {
            return NextResponse.json({ message: 'No blogs found for this user' }, { status: 200 });
        }

        return NextResponse.json({ blogs: userWithBlogs.blogs, totalBlogs }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
