"use client"
import Image from "next/image"
import { FaComment, FaEdit, FaHeart, FaTrash } from 'react-icons/fa';
import Comments from "@/components/Comments";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Blog = ({ params }) => {
    const id = params.id;
    const [opencomment, setOpencomment] = useState(false);
    const [blog, setBlog] = useState(null);
    const { currentUser } = useAuth();
    const [comment, setComment] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/blog/${id}`);
            const data = await res.json();
            setBlog(data);
            console.log(data);
        }
        fetchData();
    },[id])

    const addComment = async () => {
        setLoading(true);
        const res = await fetch(`/api/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment: comment, userId: currentUser._id, blogId: blog._id })
        });
        const data = await res.json();
        if (res.ok) {
            setLoading(false);
            toast.success('Comment added successfully');
            setComment('')
            router.refresh()
        }
        console.log(data);
    }
    return (
        <div className="flex flex-col w-full gap-5 p-5 items-center">
            <div className="flex-col w-full  md:w-2/3 h-fit">
                <div className="flex gap-2 items-center pb-2">
                    <Image src="/images/user1.png" quality={100} alt="user" width={40} height={40} className="rounded-full dark:border-red-600 border object-cover object-center h-10 w-10" />
                    <div>
                        <h1 className="font-semibold">{blog?.author?.username}</h1>
                        <p className="text-sm">{blog?.createdAt}</p>
                    </div>
                </div>
                <h1 className="text-4xl dark:text-zinc-400 capitalize font-semibold mb-2">{blog?.title}</h1>
                <div className="flex border rounded-lg border-gray-300 gap-4 py-2 px-4">
                    <div className="flex items-center gap-2 hover:cursor-pointer">
                        <FaHeart />
                        <span>{blog?.likesCount} </span>
                    </div>
                    <div className="flex items-center gap-2 hover:cursor-pointer">
                        <FaComment />
                        <span>{blog?.comments.length} </span>
                    </div>
                    {currentUser && currentUser._id === blog?.author?._id && <div className="flex gap-2">
                        <div className="flex items-center gap-2 hover:cursor-pointer">
                            <FaEdit />
                            <Link href={`/create/${id}`}>Edit</Link>
                        </div>
                        <div className="flex items-center gap-2 hover:cursor-pointer">
                            <FaTrash />
                            <span>Delete</span>
                        </div>
                    </div>}
                </div>
                {blog?.image.length > 2 && <div className="w-auto h-fit dark:bg-zinc-900 min-h-[300px] md:max-h-[480px] lg:h-[480px] relative my-5">
                    <Image fill src={blog?.image} alt="/images/example.png" className="w-full h-full object-contain object-center" />
                </div>}

                <div className="my-3 text-zinc-600" dangerouslySetInnerHTML={{ __html: blog?.description }}></div>
                <div className="w-full border-t border-zinc-500 py-2">
                    <div className="flex gap-4 items-center mb-2">
                        <h1 className="text-lg">Add comments</h1>
                        {!currentUser && <Link className=" underline text-sm text-red-500" href="/login">Login</Link>}
                    </div>
                    <textarea className="p-2 resize-none w-full outline-none bg-zinc-100 dark:text-gray-100 dark:bg-zinc-600" rows={2} type="text" onChange={(e) => setComment(e.target.value)} placeholder="type here..." />
                    <button disabled={!currentUser} onClick={addComment} className="py-1 px-5 bg-rose-400 rounded-md mt-2 cursor-pointer disabled:opacity-60">{loading?"Adding...":"Add"}</button>
                    <button onClick={() => setOpencomment((prev) => !prev)} className="py-1 px-5 underline cursor-pointer">view</button>
                </div>
            </div>
            {/* comments here */}
            {opencomment && <Comments comments={blog?.comments} />}
        </div>
    )
}

export default Blog
