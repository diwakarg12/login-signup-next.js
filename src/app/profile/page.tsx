'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';
const ProfilePage = () => {
    const router = useRouter()
    const [data, setData] = useState({
        id: '',
        username: '',
        email: '',
    });
    const [loading, setLoading] = useState(false);

    const getuserDetails = async () => {
        try {
            const response = await axios.post('/api/users/me');
            // console.log(response.data);
            setData({
                id: response.data.data._id,
                username: response.data.data.username,
                email: response.data.data.email
            });

        } catch (error: any) {
            // console.log(error.message);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getuserDetails();
    }, [])

    const logout = async () => {
        try {
            setLoading(true);
            await axios.get('/api/users/logout');
            toast.success("Logout successfully");
            router.push('/login');
        } catch (error: any) {
            // console.log(error.message);
            toast.error(error.message);
            setLoading(false);
        }
    }
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            {loading ? <Loader /> : ''}
            <div className='w-1/2 flex flex-col items-center justify-center font-serif'>
                <p className="w-4/5 py-3 font-semibold text-lg flex items-center justify-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">Welcome back {data.username}</p>
                <table className="w-4/5 text-base font-medium text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <tbody>
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-3/5">
                                UserId
                            </td>
                            <td className="px-6 py-4 w-2/5">
                                {data.id ? data.id : '124576878'}
                            </td>
                        </tr>
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                UserName
                            </td>
                            <td className="px-6 py-4">
                                {data.username ? data.username : 'diwakar'}
                            </td>
                        </tr>
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Email
                            </td>
                            <td className="px-6 py-4">
                                {data.email ? data.email : 'diwakargiri@gmail.com'}
                            </td>
                        </tr>
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Name
                            </td>
                            <td className="px-6 py-4">
                                Diwakar Giri
                            </td>
                        </tr>
                    </tbody>
                </table>


                <button id="button" name="button" type="submit" className="flex justify-center items-center py-3 mt-4 w-4/5 bg-gray-800 text-gray-100 outline-none outline-offset-0 border-none cursor-pointer transition-all duration-400 hover:bg-gray-100 hover:text-orange-500" onClick={logout}>
                    <p className="font-medium text-xl transition-all duration-300">Logout</p>
                </button>
            </div>
        </div>
    )
}

export default ProfilePage;