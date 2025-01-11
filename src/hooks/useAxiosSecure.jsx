import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import Authcontext from '../context/Authcontext/Authcontext';



    const axiosInstance=axios.create({
        baseURL:'https://find-connect-server.vercel.app',
        withCredentials:true
    });



const useAxiosSecure = () => {
    const {signOutUser}=useContext(Authcontext);

    useEffect(() => {
        axiosInstance.interceptors.request.use(response=>{
            return response;
        },
    error=>{
        console.log('error caught in interceptor',error);

        if(error.status===401 || error.status===403){
            console.log('not to logout the user!!');
            signOutUser()
            .then(()=>{console.log('user logged out')})
            navigate('/login')
            

            .catch((err)=>console.error(err));
        }

        return Promise.reject(error);
    }
    ) }, [])


    return axiosInstance;
};

export default useAxiosSecure;