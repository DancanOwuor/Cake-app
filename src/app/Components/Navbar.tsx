import React from 'react'
import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'
import { IoNotifications } from 'react-icons/io5'
import { BiCategory, BiHome } from 'react-icons/bi'
import { FcAbout } from 'react-icons/fc';
import Image from 'next/image'
const Navbar = () => {
  return (
    <div className='flex justify-between items-center px-5 bg-pink-400 h-[74px] w-full fixed top-0 z-200'>
        <div>
          <p className='text-pink-600 font-extrabold text-3xl'>CakeMania</p>
        </div>
        <div className=''>
            <nav>
            <ul className='flex gap-6 font-bold text-black text-[18px]'>
                <li><Link className='hover:text-white transition-all duration-200 flex items-center justify-baseline gap-1' href='/home'><BiHome size={20}/>Home</Link></li>
                <li><Link className='hover:text-white transition-all duration-200 flex items-center justify-baseline gap-1' href="/About"><FcAbout size={20}/>About</Link></li>
                <li><Link className='hover:text-white transition-all duration-200 flex items-center justify-baseline gap-1' href='/Categories'><BiCategory size={20}/>Categories</Link></li> 
                <li><Link className='hover:text-white transition-all duration-200 flex items-center justify-baseline gap-1' href='/BestSellers'>Best Sellers</Link></li>
                <li><Link className='hover:text-white transition-all duration-200 flex items-center justify-baseline gap-1' href='/cart'><FaShoppingCart size={20}/>Cart</Link></li>
                <li><Link className='hover:text-white transition-all duration-200 flex items-center justify-baseline gap-1' href='/notifications1'><IoNotifications size={20}/>Notifications</Link></li>

            </ul>
        </nav>
        </div>
        <div className='relative flex gap-4  w-[250px]'>
            <button className=' flex rounded-[36px] bg-black p-2 h-[40px] w-[110px] text-white justify-center items-center hover:z-100 hover:bg-gray-200 hover:text-black transition-all duration-300'><Link href='/login'>Login</Link></button>
            <button className='absolute left-[78px] flex rounded-3xl bg-green-500 p-4 h-[40px] w-[100px] text-white justify-center items-center hover:bg-green-400 transition-all duration-200'><Link href="/Register"> Sign Up</Link></button>
        </div>
      <div>
        <Image className='rounded-full'
        src="/shop logo.jpg"
        width={50}
        height={50}
        alt="Bakery"/>
      </div>
    </div>
  )
}

export default Navbar
