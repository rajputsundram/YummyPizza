import React from 'react'
import Link from "next/link"
import Image from "next/image"
import { IoMdArrowRoundBack } from "react-icons/io";
import {baseUrl} from "../../utils/baseUrl"

const Item = ({data}) => {
  // console.log(data);
  return (
   
    <>

    <div className='min-h-screen px-10'>
      <Link href={"/"}>
      <div className=' flex container max-w-md my-6 cursor-pointer hover:scale-125 justify-center items-center mx-auto '>

<IoMdArrowRoundBack/>
      </div>
      
      </Link>

      <div className="container  max-w-md p-6 md:p-8 mb-16 mx-auto flex space-y-4 flex-col items-center justify-center">
       <div className='relative w-full h-96 rounded-lg lg:w-96'>

       <Image src={data.img} className="" 
        layout='fill'
        objectFit='cover'
        alt='image'
        
        />
       </div>
       <div className="font-extrabold mb-2 text-base md:text-2xl uppercase">
    
        {data.name}
       </div>

       <div className="">{data.description}</div>
        

         
      </div>
      
    </div>
    </>
  )
}

export default  Item


export async function getServerSideProps(context){
  const {item}=context.query;
  // Fetch data from external API
  const res=await fetch(baseUrl + "api/getDataById"
     ,{method:"POST",
      headers:{
    "Content-Type":"application/json",
  },
  body:JSON.stringify({item})
});
  const data=await res.json();
  // pass data to the page via props
  return {props:{data:data.data}};
}