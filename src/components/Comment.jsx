import Image from 'next/image'
import { FaHeart, FaTrash } from 'react-icons/fa'

const Comment = ({ comment, author,likesCount }) => {
    const handleLike = () => {
        console.log('Like');
    }
    return (
        <div className="bg-zinc-100 dark:bg-zinc-800 p-2 mt-2 min-w-80 flex flex-col w-full md:w-fit">
            <div className="flex gap-2 items-center justify-between border-b border-zinc-300 pb-2">
                <div className='flex items-center gap-2'>
                    <Image src="/images/user.jpeg" alt="user" width={20} height={20} className="rounded-full" />
                    <span className="text-sm">{author?.username}</span>
                </div>
                <span><FaTrash className='w-4 h-4' /></span>
            </div>
            <p className='py-1'>{comment}</p>
            <div className="flex items-center gap-1">
                <FaHeart onClick={handleLike} className="text-red-500" />
                <span>{likesCount}</span>
            </div>
        </div>
    )
}

export default Comment
