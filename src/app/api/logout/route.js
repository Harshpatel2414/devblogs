import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = async (req, res) => {
    cookies().delete("jwtAuth")
    return NextResponse.json("logout");
}