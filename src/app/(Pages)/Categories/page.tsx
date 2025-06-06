"use client"
import React,{useState} from 'react'
import CakeCard from '@/app/Components/CakeCard'
import SearchBar from '@/app/Components/SearchBar'


const Page = () => {
        const [search, setSearch] = useState("");
  
  return (
    <div>
      <SearchBar search={search} setSearch={setSearch}/>
      <CakeCard search={search}/>
    </div>
  )
}

export default Page
