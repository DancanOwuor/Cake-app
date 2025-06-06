"use client"
import React from 'react'
import AdminCakeCard from '@/app/Components/AdminCakeCards'
import SearchBar from '@/app/Components/SearchBar'
import { useState} from 'react'

const Page = () => {
    const [search, setSearch] = useState<string>("");
    const handleDelete = async (id: string) => {
    try {
      // Send a DELETE request to your API
      const res = await fetch(`/api/GetCakes?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete cake");

      // Optionally, you can refetch the cakes or update state locally
      console.log("Cake deleted successfully!");
    } catch (error) {
      console.error("Error deleting cake:", error);
    }
  };
  return (
    <div className='flex p-3 gap-5 flex-col items-center mt-35'>
              <SearchBar search={search} setSearch={setSearch}/>
        <h1 className='text-pink-500 font-bold text-center text-3xl'>Cake Catalogue</h1>
        <AdminCakeCard search={search} onDelete={handleDelete}/>
    </div>
  )
}

export default Page
