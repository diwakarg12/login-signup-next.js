'use client';
import Loader from '@/components/Loader'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPage = () => {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [login, setLogin] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    if (login.email.length > 0 && login.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [login])

  const onLogin = async (e: any) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post('/api/users/login', login);
      // console.log(response);
      toast.success(response.data.message);
      setLoading(false);
      router.push('/profile')

    } catch (error: any) {
      // console.log("Error in sending request", error);
      toast.error(error.message)
    }

  }

  return (
    <div className='w-full flex flex-col items-center justify-center h-[100vh]'>
      {loading ? <Loader /> : null}
      <div className='w-full flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-semibold font-mono pb-4'>Login</h1>
        <input
          type="email"
          name="email"
          id="email"
          placeholder='Email'
          className="block sm:w-96 xs:w-72 border bg-transparent text-lg text-gray-100 rounded-none py-3 px-4 my-6  placeholder:text-slate-100"
          value={login.email}
          onChange={(e) => { setLogin({ ...login, email: e.target.value }) }}
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder='password'
          className="block sm:w-96 xs:w-72 border bg-transparent text-lg text-gray-100 rounded-none py-3 px-4 mt-6  placeholder:text-slate-100"
          value={login.password}
          onChange={(e) => { setLogin({ ...login, password: e.target.value }) }}
        />
        <p className='text-end font-mono sm:ml-52 xs:ml-28 mb-6 mt-2'><Link href="/forgotpassword" className='text-blue-500 hover:underline '>Forgot password ? </Link></p>

        <button id="button" name="button" type="submit" {...buttonDisabled ? { disabled: true } : ''} className="flex justify-center items-center py-3 sm:w-96 xs:w-72 bg-gray-800 text-gray-100 outline-none outline-offset-0 border-none cursor-pointer transition-all duration-400 hover:bg-gray-100 hover:text-orange-500" onClick={onLogin}>
          <p className="font-medium text-xl transition-all duration-300">{buttonDisabled ? "Loading..." : "Login"}</p>
        </button>
        <p className='text-end font-mono sm:ml-36 xs:ml-12 mt-2 '>new user ? <Link href="/signup" className='text-blue-500 hover:underline '>register here</Link></p>
      </div>
    </div>
  )
}

export default LoginPage