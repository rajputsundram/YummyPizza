import React, { useContext } from 'react';
import { CartContext } from "@/utils/ContextReducer";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Page = () => {
  const { state, dispatch } = useContext(CartContext);
  let totalPrice = state.reduce((total, food) => total + food.price, 0);

  const handleCheckout = async () => {
    let userEmail = localStorage.getItem("userEmail");

    await fetch("api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: state,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: "DROP" });
          alert("Order placed successfully!");
        }
      })
      .catch(() => alert("Failed to place the order."));
  };

  return (
    <div style={{ minHeight: "95vh" }} className="flex items-center">
      <div className="container mx-auto p-3 pb-10 m-4 sm:m-6 md:m-10 rounded-lg flex flex-col">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 overflow-auto">
          <div>
            {state.length > 0 ? (
              <>
                <table className="min-w-full text-left text-sm sm:text-base md:text-lg font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-4 py-2 sm:px-6 sm:py-4">#</th>
                      <th scope="col" className="px-4 py-2 sm:px-6 sm:py-4">Item Name</th>
                      <th scope="col" className="px-4 py-2 sm:px-6 sm:py-4">Size</th>
                      <th scope="col" className="px-4 py-2 sm:px-6 sm:py-4">QTY</th>
                      <th scope="col" className="px-4 py-2 sm:px-6 sm:py-4">Price</th>
                      <th scope="col" className="px-4 py-2 sm:px-6 sm:py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.map((data, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-4 py-2 sm:px-6 sm:py-4 font-medium">{index + 1}</td>
                        <td className="whitespace-nowrap px-4 py-2 sm:px-6 sm:py-4 font-medium">{data.name}</td>
                        <td className="whitespace-nowrap px-4 py-2 sm:px-6 sm:py-4 font-medium">{data.size}</td>
                        <td className="whitespace-nowrap px-4 py-2 sm:px-6 sm:py-4 font-medium">
                          <div className="flex items-center gap-2">
                            <span onClick={() => {
                              if (data.qty > 1) {
                                dispatch({ type: "DECREMENT", tempId: data.tempId, unitPrice: data.price / data.qty });
                              } else {
                                dispatch({ type: 'REMOVE', index: index });
                              }
                            }}>
                              <FaMinusCircle />
                            </span>
                            {data.qty}
                            <span onClick={() => dispatch({ type: "INCREMENT", tempId: data.tempId, unitPrice: data.price / data.qty })}>
                              <FaPlusCircle />
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 sm:px-6 sm:py-4 font-medium">{data.price}</td>
                        <td className="whitespace-nowrap px-4 py-2 sm:px-6 sm:py-4 font-medium">
                          <MdDelete onClick={() => dispatch({ type: 'REMOVE', index: index })} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 text-right text-lg font-semibold">Total Price: {totalPrice}</div>
                <button
                  onClick={handleCheckout}
                  className="mt-4 w-full sm:w-auto border rounded p-2 bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 text-white hover:bg-indigo-800"
                >
                  Check Out
                </button>
              </>
            ) : (
              <div className="text-red-400 font-medium flex justify-center items-center">
                Your cart is empty.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
