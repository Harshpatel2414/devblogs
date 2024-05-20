import mongoose, { Schema } from 'mongoose';

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likesCount: {
        type: Number,
        default: 0
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

export default Comment;
