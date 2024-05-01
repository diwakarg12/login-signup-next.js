"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';
import Link from 'next/link';

const SignupPage = () => {

    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
        phone: "",
        city: "",
        state: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [loading, setLoading] = useState(false);

    const onSignup = async (e: any) => {
        try {
            e.preventDefault();
            setLoading(true);
            const response = await axios.post('/api/users/signup', user);

            console.log("signup success", response.data);
            router.push('/login')

        } catch (error: any) {
            // console.log('Signup failed');
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.username.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className='w-full flex flex-col items-center justify-center sm:h-[100vh] xs:h[110vh]'>
            {loading ? <Loader /> : null}
                <form action="" className="w-full flex flex-col items-center justify-center">
                    <h1 className='text-4xl font-semibold font-mono pb-4'>Signup</h1>
                <input
                    type="text"
                    name="username"
                    id="username"
                    className="block sm:w-96 xs:w-72 border bg-transparent text-lg text-gray-100 rounded-none py-3 px-4 sm:my-4 xs:my-3 placeholder:text-slate-100"
                    placeholder='username'
                    value={user.username}
                    onChange={(e) => { setUser({ ...user, username: e.target.value }) }}
                />
                <input
                    type="number"
                    name="phone"
                    id="phone"
                    className="block sm:w-96 xs:w-72 border bg-transparent text-lg text-gray-100 rounded-none py-3 px-4 sm:my-4 xs:my-3 placeholder:text-slate-100"
                    placeholder='Phone'
                    value={user.phone}
                    onChange={(e) => { setUser({ ...user, phone: e.target.value }) }}
                />
                <input
                    type="text"
                    name="city"
                    id="city"
                    className="block sm:w-96 xs:w-72 border bg-transparent text-lg text-gray-100 rounded-none py-3 px-4 sm:my-4 xs:my-3 placeholder:text-slate-100"
                    placeholder='City'
                    value={user.city}
                    onChange={(e) => { setUser({ ...user, city: e.target.value }) }}
                />
                <input
                    type="text"
                    name="state"
                    id="state"
                    className="block sm:w-96 xs:w-72 border bg-transparent text-lg text-gray-100 rounded-none py-3 px-4 sm:my-4 xs:my-3 placeholder:text-slate-100"
                    placeholder='State'
                    value={user.state}
                    onChange={(e) => { setUser({ ...user, state: e.target.value }) }}
                />

                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder='Email'
                    className="block sm:w-96 xs:w-72 border bg-transparent text-lg text-gray-100 rounded-none py-3 px-4 sm:my-4 xs:my-3  placeholder:text-slate-100"
                    value={user.email}
                    onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
                />

                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder='password'
                    className="block sm:w-96 xs:w-72 border bg-transparent text-lg text-gray-100 rounded-none py-3 px-4 sm:my-4 xs:my-3  placeholder:text-slate-100"
                    value={user.password}
                    onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
                />

                <button id="button" name="button" type="submit" {...buttonDisabled ? { disabled: true } : ''} className="flex justify-center items-center py-3 sm:w-96 xs:w-72 bg-gray-800 text-gray-100 outline-none outline-offset-0 border-none cursor-pointer transition-all duration-400 hover:bg-gray-100 hover:text-orange-500" onClick={onSignup}>
                    <p className="font-medium text-xl transition-all duration-300">{buttonDisabled ? "Loading..." : "Signup"}</p>
                </button>
            </form>
            <p className='sm:w-96 xs:w-72 text-end font-mono mt-2'>Already have an account ? <Link href="/login" className='text-blue-500 hover:underline '>login here</Link></p>
        </div>
    )
}

export default SignupPage;
