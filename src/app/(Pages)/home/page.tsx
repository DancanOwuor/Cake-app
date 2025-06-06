'use client';
import React from 'react'
import CakeCard from '@/app/Components/CakeCard'
import SearchBar from '@/app/Components/SearchBar'
import { useState } from 'react'

const Page = () => {
      const [search, setSearch] = useState("");
  return (
    <div style={{backgroundImage: "url(/purple-bg.jpg)"}}
         className='flex flex-col items-center gap-6 h-full bg-cover bg-center bg-no-repeat'>
        <div><SearchBar search={search} setSearch={setSearch}/></div>
        <CakeCard search={search}/>
     
    </div>
  )
}

export default Page
