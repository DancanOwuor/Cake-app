"use client";
import React, { useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode";
import SearchBar from '@/app/Components/SearchBar';
import Image from 'next/image';
type Cake = {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}; 

type Cart = {
  name: string
  description: string
  price: string
  imageUrl: string
}

interface JwtPayload {
  userId: string;
  // Add other expected claims from your JWT
}
const Page = () => {

  const [cart, setCart] = useState<Cake[]>([]);
  const [search, setSearch] = useState("");

    useEffect(()=>{ 
      const fetchCart = async ()=>{
        try{
          const token = localStorage.getItem("token");
          if(!token) 
            return alert("token not found");

          const decoded: JwtPayload = jwtDecode(token);
          const userId = decoded.userId;

          const res = await fetch(`/api/Cart?userId=${userId}`,{
                                      method: "GET",
                                      headers: { "Content-Type": "application/json" }
                                  });

          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || "Failed to fetch cart");
          }                        
          const data:Cart[] = await res.json();
          setCart(data);
        } catch(error:unknown){
           if (error instanceof Error) {
                          console.error("Error fetching cart:", error.message);
           }
        }
      };

        fetchCart();
  }, [])
    
  return (
    <div className='flex flex-col'>
      <SearchBar search={search} setSearch={setSearch}/>
      <h1 className="text-2xl font-bold text-center">Your Cart</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 w-full h-s p-6'>
         {cart.length === 0 ? (<p>No cakes yet 🥲</p>) : (cart.map((cake, i) => (
           <div key={i}
                className="w-52  rounded-xl overflow-hidden shadow-lg mt-26">
              <div className="h-48 w-full relative">
                <Image
                  src={cake.imageUrl}
                  alt={cake.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-3 text-center space-y-1">
                <p className="font-bold text-purple-700 text-lg">{cake.name}</p>
                <p className="text-sm text-gray-600">{cake.description}</p>
                <p className="font-semibold text-black">Ksh {cake.price}</p>
                <div>
                   <button className="mt-2 border-2 border-orange-500 hover:bg-red-700 hover:text-white text-black transition-all duration-150 bg-transparent px-4 py-1 rounded-[3px]">
                      Remove-item
                   </button>
                  <button className="mt-2 bg-orange-500 hover:bg-green-600 transition-all duration-150 text-white px-7 py-1 rounded-[3px]">
                      Check Out
                  </button>
               
                </div>
              </div>
           </div>
        )))}
      </div>
     
    </div>
  )
}

export default Page
