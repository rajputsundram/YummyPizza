import React, { useContext } from 'react'
import {CartContext} from "@/utils/ContextReducer"
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const Page = () => {

  const {state,dispatch}=useContext(CartContext)
  let totalPrice=state.reduce((total,food)=>total+food.price,0)

  const handleCheckout= async()=>{
    let userEmail=localStorage.getItem("userEmail");

await fetch("api/orderData",{
  method:"POST",
  headers:{
    "Contenet-Type":"application/json"
  },
  body:JSON.stringify({
    order_data:state,
    email:userEmail,
    order_data:new Date().toDateString(),
  })
}).then(response=>{
  if(response.status===200){
    dispatch({type:"DROP"}),
    alert("Sucessfull")

  }
}).catch((response)=>response.status!==200);


  }
  return (
    <div style={{minHeight:"95vh"}} className='flex items-center'>
      <div className="container mx-auto  p-3 pb-10 m-10 rounded-lg flex-col">
        <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
          <div className='overflow-hidden'>

            {
              state.length>0? 
              <>

               <table className='min-w-full text-left text-lg font-light'>
              <thead className='border-b font-medium dark:border-neutral-500'>
                <tr>
                  <th scope='col' className='px-6 py-4'>#</th>
                  <th scope='col' className='px-6 py-4'>
                    <div className='flex items-center'>
                      Item name
                    </div>
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    <div className='flex items-center'>
                      Size
                    </div>
                    </th>


                    <th scope='col' className='px-6 py-4'>
                    <div className='flex items-center'>
                      QTY
                    </div>
                 
                  </th>
                    <th scope='col' className='px-6 py-4'>
                    <div className='flex items-center'>
                      Price
                    </div>
                 
                  </th>
                
                </tr>
              </thead>

              <tbody>
                {state.map((data,index)=>{
                  return(
                    <>
                    <tr>
                      <td className='whitespace-nowrap px-6 py-4 font-medium'>
                        {index+1}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 font-medium'>
                        {data.name}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 font-medium'>
                        {data.size}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 font-medium'>
                        <div className='flex justify-start items-center gap-1'>
                      <span onClick={()=>{
                       if(data.qty>1)
                       {
                        dispatch({type:"DECREMENT",
                          tempId:data.tempId,
                          unitPrice:data.price/data.qty})
                       }
                       if(data.qty<=1)
                       {
                        dispatch({type:'REMOVE',index:index})
                       }

                       }}><FaMinusCircle  /></span>
                        {data.qty}
                        <span  onClick={()=>{dispatch({type:"INCREMENT", tempId:data.tempId,unitPrice:data.price/data.qty})}}><FaPlusCircle/></span>
                        </div>
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 font-medium'>
                        {data.price}
                      </td>
                    <td onClick={()=>dispatch({type:'REMOVE',index:index})} className='whitespace-nowrap px-6 py-4 font-medium'>
                    <MdDelete/>
                    </td>
                    </tr>
                    </>
                  )
                })}
              </tbody>
            </table>
          <div className=''>Total Price{totalPrice}</div>
              <button onClick={handleCheckout} className='border dark:border-gray-400 rounded p-2 bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gary- 700'>Check out</button>
            
            </>:
            <div className='text-red-400 font-medium flex justify-center items-center'>

your cart is empty
            </div>
            }

           
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page