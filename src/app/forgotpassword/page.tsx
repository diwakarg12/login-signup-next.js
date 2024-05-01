'use client';
import React, { useState, useEffect } from 'react'
import Loader from '@/components/Loader'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const ForgotPasswordpage = () => {
    const [loading, setLoading] = useState(false);
    const [emailSend, setEmailSend] = useState(false);
    const [email, setEmail] = useState('');

    const onSendEmail = async (e: any) => {
        try {
            e.preventDefault();
            setLoading(true);
            const response = await axios.post('/api/users/forgotpassword', { email });
            console.log(response);
            toast.success(response.data.message);
            setLoading(false);
            setEmail('');
            setEmailSend(true);
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    return (
        <div className="w-full h-[100vh] text-gray-300 font-mono flex flex-col items-center">
            <div className='xl:w-1/2 lg:w-3/5 sm:w-3/4 xs:w-full py-12 flex flex-col items-center'>
                {loading ? <Loader /> : null}
                <h1 className='text-4xl text-center font-semibold py-6'>Enter Email for Password Reset</h1>
                <p className='text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quae amet ullam quibusdam architecto fugit nostrum aliquid odit placeat autem ipsa modi vero nihil eius nisi in rem quaerat, quas dolor. Alias placeat officiis quasi. Quasi sunt debitis quisquam repellat reprehenderit culpa perferendis numquam voluptates, quos libero maxime commodi neque ipsum quibusdam, a nostrum, dolorum nemo dolores officiis. Sequi obcaecati sapiente, neque aliquam atque quo consequatur, vel nulla delectus excepturi iure labore. Odio minima, !.</p>

                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder='Email'
                    className="block md:w-96 sm:w-[22rem] xs:w-72 border bg-transparent text-lg text-gray-100 rounded-none py-3 px-4 my-6  placeholder:text-slate-100"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                />

                <button id="button" name="button" type="submit"  {...email === '' ? { disabled: true } : ''} className="flex justify-center items-center py-3 my-6 md:w-96 sm:w-[22rem] xs:w-72 bg-gray-800 text-gray-100 outline-none outline-offset-0 border-none cursor-pointer transition-all duration-400 hover:bg-gray-100 hover:text-orange-500" onClick={onSendEmail}>
                    <p className="font-medium text-xl transition-all duration-300">sendEmail</p>
                </button>

                {
                    emailSend && <p className='text-xl font-semibold'>Check your email, we have sent a password reset link</p>
                }
            </div>
        </div>
    )
}

export default ForgotPasswordpage