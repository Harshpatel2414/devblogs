"use client"
import Pagination from "@/components/Pagination";
import Post from "./Post";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";

const Userblogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const blogsPerPage = 3;
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/userblogs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: currentUser._id, page: currentPage }),
        });
        const data = await res.json();
        setBlogs(data.blogs);
        setTotalBlogs(data.totalBlogs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, [currentPage, currentUser?._id]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div className="p-5 flex flex-col h-full w-full md:items-center mt-20">
      <h1 className="text-lg text-rose-400 mb-2">Your Blogs</h1>
      <div className='flex w-full md:w-3/4 lg:w-2/3'>
        {loading ?
          <h1 className="text-rose-400 text-center w-full">Loading...</h1> : <div className="flex flex-col gap-5 w-full">
            {blogs && blogs.map((post) => (
              <Post key={post._id} {...post} />
            ))}
          </div>
        }

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

export default Userblogs;