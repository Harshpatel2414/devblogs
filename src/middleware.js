import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const sec_key = process.env.SECRET_KEY;

const privateRoutes = ['/create', '/userblogs'];

export default function middleware(req, res) {

    const absoluteUrl = new URL('/', req.nextUrl.origin)
    if (privateRoutes.includes(req.nextUrl.pathname)) {
        const token = cookies().get('jwtAuth');
        if (token) {
            jwt.verify(token, sec_key, (err, decodedToken) => {
                if (err) {
                    return NextResponse.redirect(absoluteUrl.toString());
                } else {
                    console.log(decodedToken);
                    return NextResponse.next();
                }
            });
        } else {
            return NextResponse.redirect(absoluteUrl.toString());
        }
    }
}
