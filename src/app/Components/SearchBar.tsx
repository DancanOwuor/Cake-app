"use client";
import React, { useEffect, useState } from 'react'
import { Dispatch, SetStateAction } from 'react';
import { BiHelpCircle, BiUserCheck } from 'react-icons/bi';
interface SearchBarProps {
  setSearch: Dispatch<SetStateAction<string>>;
  search: string
}


const SearchBar = ({search, setSearch}: SearchBarProps) => {
  const [loggedInUser, setLoggedinUser] = useState("")

  useEffect(()=>{
       const storedUser =  localStorage.getItem("Userdata");
       if (storedUser) {
        try{
          console.log(storedUser)
          const Userinfo = JSON.parse(storedUser);// converts the storedUser into valid JSON
          console.log(Userinfo)
          setLoggedinUser(Userinfo.username);

        } catch (error:unknown){
             if (error instanceof Error) {
                console.error("Error parsing user data:", error);
                setLoggedinUser("Error loading user");
             }
        }
    }
    if(!storedUser){
      setLoggedinUser("No User");
    }
  }, []);
  return (
    <div className='bg-white w-full flex items-center rounded-[6px] justify-center h-[72px] gap-3 shadow-[0_10px_20px_rgba(12,12,12,0.2)] fixed top-[73px] left-0 z-200'>
      <div>
        <input   
         onChange={e => {setSearch(e.target.value)                
         console.log("Current search:", search);
}}
        type="search" 
        placeholder='Search' 
        className=' text-[18px] w-[600px] p-2 border-2 rounded-[10px] border-gray-300'/>
      </div>
      <div className='flex items-center justify-between p-2 w-[300px]'>
           <h1 className='font-bold flex'><BiUserCheck size={25} className='mr-2'/> Hi, {loggedInUser}</h1>
           <p className='flex hover:text-blue-500'> <BiHelpCircle className='mr-2' size={24}/> Help </p>
      </div>
    </div>
  )
}

export default SearchBar
