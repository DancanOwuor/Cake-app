"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'


type Cake = {
  _id:string
  name: string
  description: string
  price: string
  imageUrl: string
}
interface AdminCakeCardProps {
  search: string
  onDelete: (id: string) => void;
}

const AdminCakeCard = ({search, onDelete}: AdminCakeCardProps) => {
       const [cakes, setCakes] = useState<Cake[]>([]);
       const filteredCakes = search ? 
       (cakes.filter(cake =>cake.name.toLowerCase().includes(search.toLowerCase()) )) : cakes

        useEffect(()=>{  
            const fetchCakes = async ()=>{
                            const res = await fetch('/api/GetCakes',{
                                method: "GET",
                                headers: { "Content-Type": "application/json" }
                            })
                            const data:Cake[] = await res.json();
                            setCakes(data);
                        }
                fetchCakes();

        }, [])
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-7 w-full h-s p-6'>
          {filteredCakes.map((cake: Cake, index:number)=>(
          <div key={index} className=' h-[333px] w-[234px] overflow-hidden flex flex-col shadow-2xl rounded-[5px]'>
            <div className='relative h-[293px] w-[234px]'>
               <Image className='rounded-[4px] object-cover'
                  src={cake.imageUrl}
                  alt={cake.name}
                  fill
                  sizes="250px"
                  priority={index < 4}
                  />
            </div>
           
          
            <div className=' flex flex-col text-center justify-center items-center py-2 '>
              <p className='font-bold text-purple-500 text-2xl'>{cake.name}</p>
              <p className='font-bold'>{cake.description}</p>
              <p className='font-bold'>Ksh: {cake.price}</p>
              <div className='flex gap-3 text-white font-bold'>
                <button onClick={() => onDelete(cake._id)} className='bg-red-500 h-[35px] w-[100px] hover:bg-red-600 rounded-[3px]'>Delete</button>
                <button className='bg-green-500 h-[35px] w-[100px] hover:bg-green-600 rounded-[3px]'>Edit</button>
              </div>
              
            </div>
          </div>
        ))}  
    </div>
  )
}

export default AdminCakeCard
