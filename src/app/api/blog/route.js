import { NextResponse } from "next/server";
import Blog from '@/models/Blog';
import connectMongoDB from "@/db/mongodb";
import User from "@/models/User";


export const GET = async (req, res) => {
   const { searchParams } = new URL(req.url);
   const page = parseInt(searchParams.get('page')) || 0;
   const blogsPerPage = 3
   try {
      await connectMongoDB();
      const blogs = await Blog.find()
         .sort({ updatedAt: -1 })
         .skip(page * blogsPerPage)
         .limit(blogsPerPage)
         .populate('author', 'username email')
         .exec();

      const totalBlogs = await Blog.countDocuments();

      return NextResponse.json({ blogs, totalBlogs }, {
         status: 200
      });
   } catch (error) {
      return NextResponse.json({
         body: "Internal Server Error",
      }, {
         status: 500
      });
   }
}

export const POST = async (req, res) => {
   try {
      await connectMongoDB();
      const body = await req.json();
      const { title, description, image, userId } = body;
      console.log(body);

      const user = await User.findById(userId);
      if (!user) {
         return NextResponse.json({ message: 'User not found' }, {
            status: 404
         });
      }

      // Create a new blog
      const newBlog = new Blog({
         title,
         description,
         image,
         username: user.username,
         author: user._id
      });

      // Save the new blog
      const savedBlog = await newBlog.save();

      // Add the blog reference to the user's blogs array  
      user.blogs.push(savedBlog._id);
      await user.save();

      return NextResponse.json(savedBlog, {
         status: 201
      });

   } catch (error) {
      return NextResponse.json({ error: error.message })
   }
}

export const DELETE = async (req, res) => {
   try {
      await connectMongoDB();
      const body = await req.json();
      const { id } = body;
      const blog = await Blog.findByIdAndDelete(id);
      return NextResponse.json(blog,{
         status: 201
      });
   } catch (error) {
      return NextResponse.json({ error: error.message })
   }
}

export const PATCH = async (req, res) => {
   const body = await req.json();
   const { blogId, title, description } = body;
   try {
      await connectMongoDB();
      const blog = await Blog.findByIdAndUpdate(
         blogId,
         { title, description },
         { new: true, runValidators: true }
      )
      return NextResponse.json(blog,{
         status: 201
      });
   } catch (error) {
      return NextResponse.json({ error: error.message })
   }
}