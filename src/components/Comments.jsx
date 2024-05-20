import Comment from './Comment'

const Comments = ({ comments }) => {
    console.log(comments);
    if (comments.length <1) return <h1 className='pt-2'>No Comments</h1>
    return (
        <div className='flex-1 flex-col pt-2 w-full md:w-2/3 h-fit rounded-lg dark:text-white'>
            <h1>All Comments here</h1>
            <div className='flex w-full flex-col gap-2 overflow-y-scroll'>
                {comments && comments.map((comment) => {
                    return (<Comment key={comment._id} {...comment} />)
                })}
            </div>
        </div>
    )
}

export default Comments
