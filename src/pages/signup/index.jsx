import React from 'react'
import Link from "next/link"
import { useState } from 'react'
import {useRouter} from 'next/router';

const Signup = () => {
    const router=useRouter();

    const [credentials,setCreadentials]=useState({name:"",email:"",password:"",geolocation:""});

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch("api/userSignUp",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name:credentials.name,
                email:credentials.email,
                password:credentials.password,
                location:credentials.geolocation,

            })
        });

       const res=await response.json();
       if(res.success) {
        localStorage.setItem("token",res.authToken)
        localStorage.setItem("userEmail",credentials.email);
        router.push("/")
        


       }else{
        alert("There is something Wrongs");
       }

    } 
    const handleChange=(e)=>{
        setCreadentials({...credentials,[e.target.name]:e.target.value})

    }
  return (
    <div style={{height:"90vh",backgroundImage:'url("https://wallpapers.com/images/hd/fantastic-stagioni-pizza-toxdmwcsg37qfhw3.jpg")',backgroundSize:"cover",}}  className='flex justify-center items-center'>
        <div className="container w-full max-w-md">
            <form onSubmit={handleSubmit} className='bg-gray-100  dark:bg-gray-900 dark:text-gray-100  rounded-lg shadow-2xl px-8 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
                    <label htmlFor="name" className='text-gray-700 dark:text-gray-300 font-bold mb-2'>Name</label>
                    <input onChange={handleChange}  
                    required
                    name='name' placeholder='Enter your name' type="text" value={credentials.name} className='shadow appearance-none border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-900 dark:text-gray-100' />
                </div>
                <div className='mb-4'>
                    <label htmlFor="email">Email</label>
                    <input onChange={handleChange} name='email'placeholder='Enter your email' type="email" value={credentials.email} className='shadow appearance-none border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-900 dark:text-gray-100 ' />
                </div>
                <div className='mb-4'>
                    <label htmlFor="password">Password</label>
                    <input onChange={handleChange} 
                    required
                    name='password' type="password" placeholder='******' value={credentials.password} className='shadow appearance-none border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-900 dark:text-gray-100' />
                </div>
                <div className='mb-4'>
                    <label htmlFor="geolocation">Address</label>
                    <input onChange={handleChange} 
                    required
                    name='geolocation' type="text" placeholder='' value={credentials.geolocation} className='shadow appearance-none border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-900 dark:text-gray-100' />
                </div>
                <div className='fle x justify-between items-center'>
                <button type="submit" className='border font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700'>Sign Up</button>
                <Link href={"/login"} style={{all:"unset"}}>
                <button type="" className='border font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700 text-gray-900 dark:text-gray-100'>Already a user?</button>
                </Link>
                </div>
                
            </form>
        </div>
    </div>
  )
}

export default Signup