import connectMongoDB from "@/db/mongodb";
import Blog from "@/models/Blog";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req, res) => {
   let blog = null;
   try {
      const { pathname } = new URL(req.url);
      const blogId = pathname.split('/').pop().toString(); // Extract the last segment from the URL path

      console.log(blogId);
      await connectMongoDB();
      // Find the blog by ID and populate comments and authors
      blog = await Blog.findById(blogId)
         .populate('author', 'username email')
         .exec();

      if (!blog) {
         return NextResponse.json({ message: 'Blog not found' }, {
            status: 404
         });
      }
      if (blog.comments && blog.comments.length >= 1) {
         blog= await 
         await Blog.findById(blogId)
         .populate('author', 'username email')
         .populate({
            path: 'comments',
            populate: {
               path: 'author',
               select: 'username email'
            }
         })
         .exec();
      }
      return NextResponse.json(blog, {
         status: 200
      });

   } catch (error) {
      return NextResponse.json({ message: 'Server error' }, {
         status: 500
      });
   }
}