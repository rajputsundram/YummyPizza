import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { CartContext} from '@/utils/ContextReducer'
import Link from 'next/link'
// import { usePathname } from 'next/navigation'

const Card = (props) => {
  // const pathname=usePathname();
// const size=["small","medium","large"]
const data=props.foodData;
const {state,dispatch}=useContext(CartContext)
const priceOption=Object.keys(data.price)
const [size,setSize]=useState(priceOption[0]);
const [qty,setQty]=useState(1);

const handleQty=(e)=>{
  setQty(e.target.value)

}
const handleSize=(e)=>{
  setSize(e.target.value)

}
const handleAddToCart=async()=>{
  const updateItem=await state.find(
    (item)=>item.tempId===data["_id"]+size);
    if(!updateItem)
    {
      dispatch({
        type:"ADD",
        id:data["_id"],
        tempId:data["_id"]+size,
        name:data.name,
        price:finalPrice,
        qty:qty,
        priceOption:size,
        img:data.img
      })
    }
 
    if(updateItem)
    {
      dispatch({
        type:"UPDATE",
      
        tempId:data["_id"]+size,
       
        price:finalPrice,
        qty:qty,
       
       
      })
      
    }
  // console.log(state)

}
var finalPrice=qty*parseInt(data.price[size]);
// console.log(finalPrice)
  return (
    <>
    <div className='box'>
    <div className='w-80 rounded-lg overflow-hidden bg-white dark:bg-black border-gradien'>
        <Link href={{pathname:"/Item/[item]"}} as={`Item/${data["_id"]}`}>
    <div className='relative w-full h-80'>
      <Image src={data.img} alt="pizza" layout='fill' objectFit='cover'/>
    </div>
   
    <div className='p-4'>
      <div className='font-bold text-xl uppercase'>{data.name}</div>
      <p className='text-gary-700 dark:text-gray-400 text-base short_description'>{data.description}</p>
    </div>
    </Link>
    <div className='flex px-4 justify-between'>
      <select  className='h-100 p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-gray-300 border border-black dark:border-gray-400 rounded' onChange={handleQty}>
{Array.from(Array(3),(e,i)=>{
  return(<>
  <option value={i+1} key={i+1}>{i+1}</option>
  </>)
})}
      </select>

      <select  className='h-100 p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-gray-300 border border-black dark:border-gray-400 rounded' onChange={handleSize}>
        {
          priceOption.map((options,index)=>{
            return(<>
 <option  key={index} className='uppercase'>{options}</option>
            </>)
          })
        }
       

      </select>
    </div>
    <div className='flex p-4 font-bold justify-between'>
      <button className='border dark:border-gray-400 rounded p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gary- 700' onClick={ handleAddToCart}>Add to cart</button>
      <p className='p-2 text-xl'>₹{finalPrice}/-</p>
    </div>
  
      </div>
     </div> 
      
 
    </>
  )
}

export default Card
