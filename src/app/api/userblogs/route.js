import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/db/mongodb";
import User from "@/models/User";

export const POST = async (req, res) => {
    try {
        await connectMongoDB();

        const { userId } = await req.json();
        console.log(userId);
        const userWithBlogs = await User.findById(userId)
            .populate('blogs')
            .exec();

        if (!userWithBlogs) {
            return NextResponse.json({ message: 'blogs not found' });
        }

        return NextResponse.json({ blogs: userWithBlogs.blogs }, {
            status: 200
        });
    } catch (error) {
        return NextResponse.error({
            status: 500,
            body: "Internal Server Error",
        });
    }
}