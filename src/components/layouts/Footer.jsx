import React from 'react'
import Link from "next/link"
import Image from "next/image"
const Footer = () => {
  return (
    <footer className='text-white top-0 z-30 bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 body-font'>
<div className="container mx-auto text-white flex flex-wrap p-3 flex-col md:flex-row items-center justify-center space-x-10">
<Link href={"/"} className='flex title-font font-extrabold items-center uppercase text-gray-100'>
      <Image alt="" src={"/assets/logo.png"} width={200} height={60}/>
    
      </Link>

      <p className='text-sm text-gray-100 sm:ml-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4  '><span className='mx-2'>Copyright &copy; 2024 Pizza</span>  </p>
</div>
    </footer>
  )
}

export default Footer