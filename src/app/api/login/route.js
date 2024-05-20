import User from '@/models/User';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/db/mongodb';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export const POST = async (req, res) => {
    try {
        await connectMongoDB();
        const body = await req.json();
        const { email, password } = body;
        const user = await User.findOne({ email });

        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (!auth) {
                return NextResponse.json('incorrect password');
            }
            const token = createToken(user._id);
            cookies().set("jwtAuth", token, {
                httpOnly: true,
                path: "/",
                maxAge: 24 * 60 * 60
            });

            return NextResponse.json(user);
        }
        return NextResponse.json("invalid Email")
    } catch (error) {
        return NextResponse.json(error);
    }
}
const maxAge = 24 * 60 * 60;
const sec_key = "lokesharsh43";

const createToken = (id) => {
    return jwt.sign({ id }, sec_key, {
        expiresIn: maxAge
    });
};