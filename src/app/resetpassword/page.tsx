'use client';
import React, { useEffect, useState, Suspense } from 'react'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Loader from '@/components/Loader';

const ResetPasswordpage = () => {


    return (
        <Suspense fallback={<Loader />}>
            <SearchParamsWrapper />
        </Suspense>
    );
};


const SearchParamsWrapper = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [token, setToken] = useState('');
    const [resetPassword, setResetPassword] = useState({
        password: '',
        confirmpassword: ''
    });

    useEffect(() => {
        if (resetPassword.password.length > 0 && resetPassword.confirmpassword.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [resetPassword])

    useEffect(() => {
        const urlToken = searchParams.get('token');
        setToken(urlToken || '');
        console.log(token);

    }, [searchParams, token])

    const onResetPassword = async (e: any) => {
        try {
            e.preventDefault();
            setLoading(true)
            if (resetPassword.password === resetPassword.confirmpassword) {
                const response = await axios.post('/api/users/resetpassword', { token, resetPassword });
                console.log(response.data);
                toast.success(response.data.message);
                console.log(resetPassword);
                router.push('/login')
                setLoading(false);
            } else {
                toast.error("Password does not match");
                setLoading(false);
            }

        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }
    return (
        <div className='w-full flex flex-col items-center justify-center h-[100vh]'>
            {loading ? <Loader /> : null}
            <h1 className='text-4xl font-semibold text-center font-mono pb-4' >Reset Your Password</h1>

            <input
                type="password"
                name="password"
                id="password"
                placeholder='password'
                className="block md:w-96 sm:w-[22rem] xs:w-72 border bg-transparent text-lg text-gray-100 rounded-none py-3 px-4 my-6  placeholder:text-slate-100"
                value={resetPassword.password}
                onChange={(e) => { setResetPassword({ ...resetPassword, password: e.target.value }) }}
            />

            <input
                type="text"
                name="cnfrmpassword"
                id="cnfrmpassword"
                placeholder='confirm password'
                className="block md:w-96 sm:w-[22rem] xs:w-72 border bg-transparent text-lg text-gray-100 rounded-none py-3 px-4 my-6  placeholder:text-slate-100"
                value={resetPassword.confirmpassword}
                onChange={(e) => { setResetPassword({ ...resetPassword, confirmpassword: e.target.value }) }}
            />

            <button id="button" name="button" type="submit" {...buttonDisabled ? { disabled: true } : ''} className="flex justify-center items-center py-3 md:w-96 sm:w-[22rem] xs:w-72 bg-gray-800 text-gray-100 outline-none outline-offset-0 border-none cursor-pointer transition-all duration-400 hover:bg-gray-100 hover:text-orange-500" onClick={onResetPassword}>
                <p className="font-medium text-xl transition-all duration-300">{buttonDisabled ? "Loading..." : "Reset Password"}</p>
            </button>
            <p className='text-end font-mono sm:ml-36 xs:ml-11 mt-2 '>Already user ? <Link href="/login" className='text-blue-500 hover:underline '>login here</Link></p>
        </div>
    )
}

export default ResetPasswordpage;