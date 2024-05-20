"use client"
import { useAuth } from "@/context/AuthContext"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import { FaEye } from "react-icons/fa"

const Login = () => {
  const [passview, setPassview] = useState('password')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setCurrentUser } = useAuth()

  const router = useRouter();

  const passViewer = () => {
    if (passview == 'text') {
      setPassview('password')
    } else {
      setPassview('text')
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    let data = await res.json()
    if (res.ok) {
      setCurrentUser(data)
      toast.success('Logged in successfully');
      router.push('/')
    }
  }
  return (
    <div className="flex px-5 gap-10 flex-col items-center lg:justify-around w-full py-20">
      <div className="w-96 text-center lg:w-1/3">
        <p className="text-sm text-zinc-500">Welcome Back!</p>
        <h1 className="text-3xl lg:text-4xl text-red-500 font-bold tracking-wider">DevBlogs</h1>
        <p className="texte-sm text-zinc-600 mt-2">Login to get more information about blogs</p>
      </div>
      <div className="flex flex-col gap-4 p-5 bg-rose-100 dark:bg-zinc-800 rounded-lg items-center">
        <span className="font-bold text-xl mb-2">Login</span>
        <form onSubmit={handleLogin} className='flex flex-col gap-3 w-80 items-center'>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className='p-2 rounded w-full outline-none text-zinc-800 border-b-2 border-container' type="email" name='email' placeholder='email' required />
          <div className='flex items-center gap-2 rounded bg-white w-full border-b-2 border-container'>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className='p-2 rounded w-full outline-none text-zinc-800 ' type={passview} name='password' placeholder='password' required />
            <FaEye onClick={passViewer} className='w-6 h-full text-zinc-700 mr-2' />
          </div>
          <p>You already have account? <Link className='text-rose-400 underline' href='/register'> Register</Link></p>
          <button className='py-2 rounded px-4 text-white font-semibold bg-rose-500 hover:bg-rose-600 w-full'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login
