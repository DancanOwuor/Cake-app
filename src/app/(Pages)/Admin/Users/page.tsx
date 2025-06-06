"use client";
import React, {useState} from 'react'
import AdminUsercards from '@/app/Components/Admin-usercards'
import SearchBar from '@/app/Components/SearchBar'

const Page = () => {
        const [search, setSearch] = useState<string>("");
  return (
    <div className='flex p-1 gap-3 flex-col items-center w-screen bg-gray-200 h-screen'>
      <SearchBar search={search} setSearch={setSearch}/>
      <h1 className='text-pink-500 font-bold text-center text-3xl'>{"User's Catalogue"}</h1>
        <AdminUsercards/>
    </div>
  )
}

export default Page
