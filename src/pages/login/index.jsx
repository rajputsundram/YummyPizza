
'use client'
import React from 'react'
import { useState } from 'react';
import Link from "next/link";
import {useRouter} from "next/router"

function Login() {
    const router=useRouter();
    const [credentials,setCreadentials]=useState({email:"",password:""})

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch("api/UserLogin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
             
                email:credentials.email,
                password:credentials.password,
                

            })
        });
        const res=await response.json();
        if(res.success) {
         localStorage.setItem("token",res.authToken)
         localStorage.setItem("userEmail",credentials.email);
         router.push("/")
         
 
 
        }else{
         alert("Wrong Password");
        }
    } 
    const handleChange=(e)=>{
        setCreadentials({...credentials,[e.target.name]:e.target.value})

    }
     return (
    <div style={{height:"90vh",backgroundImage:'url("https://wallpapers.com/images/hd/fantastic-stagioni-pizza-toxdmwcsg37qfhw3.jpg")',backgroundSize:"cover",}}  className='flex justify-center items-center'>
        <div className="container w-full max-w-md">
            <form onSubmit={handleSubmit} className='bg-gray-100
              dark:bg-gray-900 dark:text-gray-100  rounded-lg shadow-2xl px-8 pt-6 pb-8 mb-4'>

                <div className='mb-4'>
                    <label htmlFor="email">Username</label>
                    <input onChange={handleChange} 
                    required name='email'placeholder='Enter your email/username' type="email" value={credentials.email} className='shadow appearance-none border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-900 dark:text-gray-100' />
                </div>
                <div className='mb-4'>
                    <label htmlFor="password">Password</label>
                    <input onChange={handleChange} name='password' type="password" 
                    required
                    placeholder='******' value={credentials.password} className='shadow appearance-none border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-900
                    dark:text-gray-100 ' />
                </div>
                <div className='fle x justify-between items-center'>
                <button type="submit" className='border font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700'>Log in</button>
                <Link href={"/signup"} style={{all:"unset"}}>
                <button type="" className='border font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700'>New User?</button>
                </Link>
                </div>
                
            </form>
        </div>
    </div>
  )
}

export default Login