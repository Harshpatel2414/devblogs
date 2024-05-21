"use client"
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";

const Register = () => {
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[username, setUsername] = useState('');
  const [passview, setPassview] = useState('password')

  const { setCurrentUser } = useAuth();
  const router = useRouter();

  let passViewer = () => {
    if (passview == 'text') {
      setPassview('password')
    } else {
      setPassview('text')
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })
    if (res.ok) {
      const data = await res.json();
      setCurrentUser(data.user);
      console.log(data);
      toast.success('Account created successfully');
      router.push('/');
    }
  }
  return (
    <div className='w-full flex flex-col py-20 gap-10 items-center justify-center'>
      <div className="w-96 flex flex-col gap-2 text-center">
        <p className="text-sm text-zinc-500">Welcome Back!</p>
        <h1 className="text-3xl lg:text-4xl text-red-500 font-bold tracking-wider">DevBlogs</h1>
        <p className="text-sm text-zinc-500">Register a account to get more info about blogs and use more features.</p>
      </div>
      <form onSubmit={handleSubmit} className='w-96 mx-auto flex flex-col gap-3 items-center bg-rose-100 dark:bg-zinc-800 p-5 rounded-lg'>
        <h1 className="font-bold text-xl mb-2">Register</h1>
        <input
          type='text'
          name="username"
          placeholder='username'
          required
          className='p-2 rounded w-full outline-none text-zinc-800 border-b-2'
          value={username}
          onChange={e=>setUsername(e.target.value)}
        />
        <input
          type='email'
          name="email"
          placeholder='email'
          required
          className='p-2 rounded w-full outline-none text-zinc-800 border-b-2'
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />
        <div className="flex w-full items-center bg-white rounded border-b-2">
          <input
            className='p-2 rounded w-full outline-none text-zinc-800 '
            value={password}
            onChange={e=>setPassword(e.target.value)}
            type={passview}
            placeholder='password' required
          />
          <FaEye onClick={passViewer} className='w-6 h-full text-zinc-700 mr-2' />
        </div>
        <p>You already have account? <Link className='text-rose-400 underline' href='/login'> Login</Link></p>
        <button
          type='submit'
          className='bg-rose-500 hover:bg-rose-600 w-full text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2'
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Register;
