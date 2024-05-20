"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { FaBars } from 'react-icons/fa'
import { useAuth } from '@/context/AuthContext'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const { currentUser, setCurrentUser } = useAuth();
    const router = useRouter();

    const handleLogout = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/logout');
        if (res.ok) {
            setCurrentUser(null);
            setMenu(false);
            toast.success('Logged out successfully');
            router.push('/');
        }
    }

    return (
        <nav className='flex relative items-center px-5 lg:px-20 h-20 justify-between bg-rose-500 dark:bg-zinc-800 text-gray-300 drop-shadow-lg'>
            <h1 className='text-zinc-800 font-bold dark:text-red-500 text-xl tracking-wide'>Dev<span className='text-zinc-100 '>Blogs</span>
            </h1>
            <ul className='md:flex space-x-5 hidden dark:text-rose-400'>
                <li>
                    <Link href='/'>Home</Link>
                </li>
                <li>
                    <Link className={`${!currentUser ? "line-through" : ''}`} href='/create'>Create</Link>
                </li>
                <li>
                    <Link href='/create'>About</Link>
                </li>
            </ul>
            <div className='md:hidden' onClick={() => setMenu((prev) => !prev)}>
                <FaBars className='w-7 h-7 text-zinc-800 dark:text-red-500' />
            </div>
            {currentUser ? <div className='hidden md:flex items-center font-semibold gap-4'>
                <span>{currentUser?.username}</span>
                <button onClick={handleLogout} className='py-1 px-5 rounded-lg bg-rose-500'>Logout</button>
            </div> : <div className='hidden md:flex items-center gap-4'>
                <Link
                    className='py-1 px-5 border-2 border-zinc-100 dark:border-red-500 rounded-lg dark:text-red-500'
                    href='/register'
                >
                    Register
                </Link>
                <Link
                    className='py-1 px-5 bg-rose-500 rounded-lg text-zinc-100'
                    href='/login'
                >
                    Login
                </Link>
            </div>}

            {menu && <ul className='flex z-20 p-5 rounded-lg w-60 absolute top-[85px] right-2 flex-col gap-2 dark:bg-neutral-800 bg-rose-50 drop-shadow-lg text-zinc-500'>

                <Link onClick={() => setMenu((prev) => !prev)} href={'/'}>Home</Link>
                <Link className={`${!currentUser ? "line-through" : ''}`} onClick={() => setMenu((prev) => !prev)} href={'/create'}>Create</Link>
                <Link onClick={() => setMenu((prev) => !prev)} href={'/about'}>About</Link>
                {!currentUser ? <div className='flex flex-col gap-2'>
                    <Link onClick={() => setMenu((prev) => !prev)} className='underline text-rose-500' href={'/login'}>Login</Link>
                    <Link onClick={() => setMenu((prev) => !prev)} className='underline text-rose-500' href={'/register'}>Register</Link>
                </div> : <div className='border-t border-zinc-500 pt-2 flex flex-col gap-2'>
                    <span className='text-red-500 capitalize'> {currentUser?.username}</span> <button onClick={handleLogout} className='py-1 px-4 text-sm cursor-pointer rounded-md w-fit bg-rose-400 text-zinc-100 tracking-wide'>Logout</button>
                </div>
                }
            </ul>}
        </nav>
    )
}

export default Navbar
