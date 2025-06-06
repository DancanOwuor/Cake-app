"use client"
import React, { useEffect, useState } from 'react'

type User = {
  username: string
  role: string
  email: string
  createdAt: string
}

const AdminUsercards = () => {
     const [users, setUsers] = useState<User[]>([])
    useEffect(()=>{
        const fetchUsers = async ()=>{
                    const res = await fetch('http://localhost:3000/api/users',{
                        method: "GET",
                        headers: { "Content-Type": "application/json" }
                    })
                    const data:User[] = await res.json();
                    setUsers(data);
                }
        fetchUsers()
    },[])

  return (
    <div className='flex flex-col gap-4 w-screen mt-26 px-5'>
          <h1 className='text-center text-3xl font-bold'>Registered Accounts</h1>
          <div className='flex gap-4'>
              {users.map((user:User, index:number) => ( <div key={index} className=' bg-blue-950 shadow-2xl text-white p-3 rounded-2xl'>
            <p className='text-center text-3xl font-extrabold'>{user.username}</p>
            <p className='text-center font-bold'>Role: {user.role}</p>
            <p>Email: {user.email}</p>
            <p>DateCreated: {new Date(user.createdAt).toLocaleDateString('en-GB',   //formating the date object from the user schema
              {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
              }
            )}
            </p>
            </div>))}
          </div>
            
    </div>
  )
}
export default  AdminUsercards
