import connectMongoDB from '@/db/mongodb';
import Comment from '@/models/Comment';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
    try {
        const { commentId, userId } = await req.json();

        await connectMongoDB();

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return NextResponse.json({ message: 'Comment not found' }, { status: 404 });
        }

        if (!comment.likes.includes(userId)) {
            return NextResponse.json({ message: 'You have not liked this comment' }, { status: 400 });
        }

        comment.likes = comment.likes.filter(id => id.toString() !== userId);
        comment.likesCount -= 1;

        await comment.save();

        return NextResponse.json({ message: 'Comment unliked successfully' }, { status: 200 });
    } catch (error) {
        console.error("Error unliking comment: ", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
