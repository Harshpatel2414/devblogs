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
        const user = await User.findOne({ email }).select('_id email username password');
        
        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (!auth) {
                return NextResponse.json({ message: 'incorrect password' }, {
                    status: 401
                });
            }
            const token = createToken(user._id);
            cookies().set("jwtAuth", token, {
                httpOnly: true,
                path: "/",
                maxAge: 24 * 60 * 60
            });

            // Include only the necessary fields in the response
            return NextResponse.json({ user }, {
                status: 201
            });
        }
        return NextResponse.json("invalid Email")
    } catch (error) {
        return NextResponse.json(error, {
            status: 500
        });
    }
}
const maxAge = 24 * 60 * 60;
const sec_key = process.env.NEXT_PUBLIC_SECRET_KEY;

const createToken = (id) => {
    return jwt.sign({ id }, sec_key, {
        expiresIn: maxAge
    });
};