import Post from './Post'

const Blogs = () => {
    return (
        <div className='flex w-full md:w-3/4 lg:w-2/3'>
            <div className='flex-3'>
                <h1 className='py-2 mb-2 border-b border-zinc-500 capitalize'>Latest</h1>
                <Post />
            </div>
        </div>
    )
}

export default Blogs
