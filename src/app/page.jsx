"use client"
import Pagination from "@/components/Pagination";
import Post from "@/components/Post";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const blogsPerPage = 3;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`/api/blog?page=${currentPage}`,{
          next:{
            revalidate:60
          }
        });
        const data = await res.json();
        setBlogs(data.blogs);
        setTotalBlogs(data.totalBlogs);
        console.log(data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div className="p-5 flex flex-col h-full w-full md:items-center">
      <h1 className="text-lg text-red-500 font-semibold py-2">Welcome to DevBlogs</h1>
      <div className='flex w-full md:w-3/4 lg:w-2/3'>
        <div className='flex-3 w-full'>
          <h1 className='py-2 mb-2 border-b border-zinc-500 capitalize'>for you</h1>
          <div className="flex flex-col gap-5 w-full">

          {blogs && blogs.map((post) => (
            <Post key={post._id} {...post} />
          ))}
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalBlogs={totalBlogs}
        blogsPerPage={blogsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
