import { useAuth } from '@/context/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { FaEdit, FaTrash } from 'react-icons/fa'

const Post = ({ createdAt, title, description, image, _id }) => {
    const { currentUser } = useAuth();
    const router = useRouter();
    const handleDelete = async () => {
        const confirmDelete = () => {
            const toastId = toast(
                ({ closeToast }) => (
                    <div>
                        <p>Are you sure you want to delete this blog?</p>
                        <button
                            onClick={async () => {
                                const res = await fetch('/api/blog', {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ id: _id }),
                                });
                                const data = await res.json();
                                if (res.ok) {
                                    toast.success('Blog deleted successfully!');
                                    router.refresh()
                                    router.push('/'); // Redirect to another page if needed
                                } else {
                                    toast.error(data.message || 'Failed to delete blog');
                                }
                                toast.dismiss(toastId);
                            }}
                            className="bg-red-500 mt-2 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                        >
                            Yes, Delete
                        </button>
                        <button
                            onClick={() => toast.dismiss(toastId)}
                            className="bg-gray-500 mt-2 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
                        >
                            Cancel
                        </button>
                    </div>
                ),
                { autoClose: false }
            );
        };

        confirmDelete();
    };
    return (
        <div className='bg-rose-50 dark:bg-neutral-800 w-full items-center md:items-start p-5 flex flex-col'>
            <div className='w-full flex items-center gap-4 border-b border-zinc-500 h-fit pb-2'>
                <div className='flex items-center gap-4 w-full'>
                    <div className='flex flex-col text-sm'>
                        <span>{currentUser.username}</span>
                        <span className='text-zinc-500'>Posted on {createdAt}</span>
                    </div>
                </div>
                <div className='flex gap-4 items-center'>
                    <div className='flex gap-4 items-center'>
                        <Link href={`/create/${_id}`}>
                            <FaEdit className='w-6 h-6 text-red-400' />
                        </Link>
                        <span onClick={handleDelete}>
                            <FaTrash className='w-5 h-5 text-red-400' />
                        </span>
                    </div>
                </div>

            </div>
            <div className='flex flex-col  md:flex-row-reverse gap-2 h-full w-full pt-2'>
                <div className='w-full h-60 relative dark:bg-zinc-900'>
                    <Image fill priority={true} quality={100} className='h-60 w-full object-cover object-center' src={image ? image : '/images/example.png'} alt="blog" />
                </div>
                <div className='w-full flex flex-col justify-between'>
                    <div className='flex flex-col w-full'>
                        <h1 className='text-xl md:text-3xl capitalize font-semibold'>{title}</h1>
                        <div className='md:text-lg text-wrap text-zinc-600 dark:text-zinc-500 ' dangerouslySetInnerHTML={{ __html: description }}></div>
                    </div>
                    <Link className='py-1 px-4 border border-red-400 w-fit rounded-lg capitalize text-red-400 mt-2' href={`/blog/${_id}`}>read more</Link>
                </div>
            </div>
        </div>
    )
}

export default Post
