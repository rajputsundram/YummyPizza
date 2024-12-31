'use client'
import CarouselComponent from '@/components/Home/CarouselComponents'
import Card from '@/components/Home/Card'
// import cardData from "../store/data.json"
import { useState } from 'react';
import { baseUrl } from "@/utils/baseUrl"


export default function Home({data}) {
  let categories = new Set();
  const [typeFilter, setTypeFilter] = useState(false);
  let categoryArray;
  const foodData = [];

  const handleData = () => {
    data?.map((data) => {
      return foodData.push(data), categories.add(data.category)
    });
  }

  handleData();
  categoryArray = [...categories];
  console.log(data?.data);

  return (
    <>
   
      <CarouselComponent />
      <div className='container mx-auto'>
        <div className='my-6 space-x-3'>
          <button className={`border-black rounded-full dark:border-white border-2 py-1 px-3 ${!typeFilter && "bg-slate-300 dark:bg-slate-600"}`} onClick={() => setTypeFilter(false)}>All</button>
          <button className={`border-black rounded-full dark:border-white border-2 py-1 px-3 ${typeFilter === "Veg" && "bg-slate-300 dark:bg-slate-600"}`} onClick={() => setTypeFilter("Veg")}>Veg</button>
          <button className={`border-black rounded-full dark:border-white border-2 py-1 px-3 ${typeFilter === 'Non-Veg' && "bg-slate-300 dark:bg-slate-600"}`} onClick={() => setTypeFilter("Non-Veg")}>Non Veg</button>
        </div>
        {
          categoryArray.map((category, index) => {
            return (
              <>
                <div key={index} className='text-4xl mt-10 mb-3 uppercase font-bold'>
                  {category}
                </div>
                <hr />
                <div className="flex flex-col items-center justify-center">
                  <div className="grid mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {
                      foodData
                        ?.filter((foodData) => category === foodData.category)
                        ?.filter((foodData) => typeFilter ? typeFilter === foodData.foodType : foodData)
                        ?.map((data) => {
                          return <Card key={data.name} foodData={data} /> || null;
                        })
                    }
                  </div>
                </div>
              </>
            )
          })
        }
      </div>
    </>
  );
}

export async function getStaticProps() {
  let data;
  try {
    const pizzaData = await fetch(baseUrl + "api/foodData", { method: "GET" }).then((response) => response.json()).catch((error) => error.message);
    data = await JSON.parse(JSON.stringify(pizzaData))
  } catch (error) {
    console.log(error.message);
  }
  return {
    props: {
      data: data.data ||null
    }
  }
}
