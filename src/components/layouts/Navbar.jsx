import React, { useContext, useEffect, useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineLogin } from "react-icons/hi";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { useTheme } from 'next-themes';
import { CartContext } from '@/utils/ContextReducer';
const Navbar = () => {
  const [mounted,setMounted]=useState(false)
  const {state}=useContext(CartContext)
  const {theme,setTheme}=useTheme();

  useEffect(()=>{
    setMounted(true);
  },[])
if(!mounted) return null;
  return (
  <header className='text-white  top-0 z-30 bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 body-font'>
    <div className="container mx-auto flex flex-wrap p-3 md:flex-row items-center justify-center ">
      <Link href={"/"} className='flex title-font font-extrabold items-center uppercase text-gray-100'>
      
      <Image alt="" src={"/assets/logo.png"}  width={250} height={40} className=''/>
     
      </Link>
      <nav className='md:ml-auto flex flex-wrap items-center text-base justify-center'>
        <Link href={"/cart"} className='text-white mr-5 cursor-pointer hover:text-gray-200 flex items-center'>
        Cart <FaShoppingCart />
        <span className='inline-flex items-center bg-red-50 py-1 mx-1 px-2 rounded-full text-xs font-medium text-red-600 ring-1 shadow-[0_0_15px_1px]'>{state.length}</span>
        </Link>
   
        {localStorage.getItem("token")?
        ( 
          <>
           <Link href={"/login"}
           onClick={()=>{
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
           }}
            className='text-white mr-5 cursor-pointer hover:text-gray-200 flex items-center'>
        Logout <span className='mx-1 font-bold'><HiOutlineLogin/></span> 
    
        </Link>
          <Link href={"/order"} className='text-white mr-5 cursor-pointer hover:text-gray-200 flex items-center'>
          My order <span className='mx-1'><FaShoppingCart /></span>
         
        
          </Link>
          </>
          )
          
          :
          (
            <>
        <Link href={"/login"} className='text-white mr-5 cursor-pointer hover:text-gray-200 flex items-center'>
        Login <HiOutlineLogin/>
    
        </Link>
        <Link href={"/signup"} className='text-white mr-5 cursor-pointer hover:text-gray-200 flex items-center'>
        Sign up < IoPersonAddSharp />
        
        </Link>
        </>
        )
        }
    

      </nav>
      <button onClick={()=>setTheme(theme==="dark"?"light":"dark")} className='text-white bg-black rounded-full p-1 dark:text-black dark:bg-white  flex items-center '>
      
        <FaMoon/>
        /
        <IoSunnyOutline/>
      
      </button>
    </div>
  </header>
  )
}

export default Navbar