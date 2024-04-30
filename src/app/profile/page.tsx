import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
const ProfilePage = () => {
    const router = useRouter()
    const [data, setData] = useState({});

    const getuserDetails = async () => {
        try {
            const response = await axios.post('/api/users/me');
            console.log(response.data);
            setData(response.data.data);

        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getuserDetails();
    }, [])

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success("Logout successfully");
            router.push('/login');
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
    return (
        <div className="w-full h-full">
            <div className='w-1/2 flex flex-col items-center justify-center border border-gray-600'>
                {/* <h1>Welcome to the profile {data.username}</h1>
                <p>{data._id}</p>
                <p>{data.username}</p>
                <p>{data.email}</p> */}

                <button id="button" name="button" type="submit" className="flex justify-center items-center py-3 w-52 bg-gray-800 text-gray-100 outline-none outline-offset-0 border-none cursor-pointer transition-all duration-400 hover:bg-gray-100 hover:text-orange-500" onClick={logout}>
                    <p className="font-medium text-xl transition-all duration-300">Logout</p>
                </button>
            </div>
        </div>
    )
}

export default ProfilePage;