import User from '@/models/User';
import connectMongoDB from '@/db/mongodb';
import { NextResponse } from 'next/server';
import bcrypt from "bcrypt";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export const POST = async (req, res) => {
    try {
        await connectMongoDB();
        const body = await req.json();
        console.log(body);
        const { username, email, password } = body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword // Save hashed password
        });

        const savedUser = await newUser.save();
        const token = createToken(savedUser._id);

        cookies().set("jwtAuth", token, {
            httpOnly: true,
            path: "/",
            maxAge: 24 * 60 * 60
        });

        return NextResponse.json(savedUser);
    } catch (error) {
        console.log(error);
    }
}

const maxAge = 24 * 60 * 60;
const sec_key = "lokesharsh43";

const createToken = (id) => {
  return jwt.sign({ id }, sec_key, {
    expiresIn: maxAge
  });
};