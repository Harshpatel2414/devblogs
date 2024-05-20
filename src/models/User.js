import mongoose, { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }]
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model("User", UserSchema)

export default User;