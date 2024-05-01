'use client'
import Loader from '@/components/Loader'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const VerifyEmail = () => {
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [token, setToken] = useState('');

    const searchParams = useSearchParams();

    const onVerify = async (e: any) => {
        try {
            e.preventDefault();
            setLoading(true);
            const response = await axios.post('/api/users/verifyemail', { token });
            if (response.data.success) {
                // console.log(response);
                toast.success('Verified');
                setVerified(true);
                setError(false);
                setLoading(false);
            } else {
                // console.log(response);
                toast.error(response.data.message);
                setVerified(false);
                setError(true);
            }

        } catch (error: any) {
            // console.log("Failed to verify Email", error.message);
            toast.error(error.message)
            setError(true);
            setVerified(false);
        }
    }

    setTimeout(() => {
        setLoading(false);
    }, 2000)

    useEffect(() => {
        setError(false)
        const urlToken = searchParams.get('token');
        setToken(urlToken || '');
    }, [searchParams])

    return (
        <div className="w-full h-[100vh] text-gray-300 font-mono flex flex-col items-center justify-center">
            <div className='md:w-1/2 sm:w-11/12 xs:w-full py-12 flex flex-col items-center justify-center'>
                {loading ? <Loader /> : null}
                <h1 className='sm:text-4xl xs:text-2xl text-center font-semibold py-6'>Verify Your Email</h1>
                <p className='text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quae amet ullam quibusdam architecto fugit nostrum aliquid odit placeat autem ipsa modi vero nihil eius nisi in rem quaerat, quas dolor. Alias placeat officiis quasi. Quasi sunt debitis quisquam repellat reprehenderit culpa perferendis numquam voluptates, quos libero maxime commodi neque ipsum quibusdam, a nostrum, dolorum nemo dolores officiis. Sequi obcaecati sapiente, neque aliquam atque quo consequatur, vel nulla delectus excepturi iure labore. Odio minima, non porro modi ex officiis! Nam porro deleniti mollitia, soluta esse quo perspiciatis cum odit veritatis odio rem nisi fugiat ab officia sint? Ad, omnis repellat.</p>
                <button id="button" name="button" type="submit"  {...token === '' ? { disabled: true } : ''} className="flex justify-center items-center py-3 my-6 sm:w-96 xs:w-72 bg-gray-800 text-gray-100 outline-none outline-offset-0 border-none cursor-pointer transition-all duration-400 hover:bg-gray-100 hover:text-orange-500" onClick={onVerify}>
                    <p className="font-medium text-xl transition-all duration-300">Verify</p>
                </button>

                {verified && (
                    <div className='py-4 flex flex-col items-center'>
                        <h1 className='text-5xl font-semibold'>Verified</h1>
                        {token}
                        <Link href='/login' className='text-blue-500 text-lg hover:underline'>go to Login</Link>
                    </div>
                )}
                {error && (
                    <h1 className='text-2xl font-semibold text-center py-4'>Something went wrong while Verifying user, please try again after some time</h1>
                )}

            </div>
        </div>
    )
}

export default VerifyEmail