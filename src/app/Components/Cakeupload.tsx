"use client"
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const Cakeupload = () => {
 const [preview, setPreview] = useState<string | null>(null)
 const [isUploaded, setIsUploaded] = useState(false);
 const [alertMsg, setAlertMsg] = useState('')
 const router = useRouter()

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsUploaded(true)
    setAlertMsg('')
    const form = e.currentTarget
    const formData = new FormData(form)

    const res = await fetch('/api/UploadCakes', {
      method: 'POST',
      body: formData,
    })
    
    const data = await res.json()

      if (res.ok) {
          setAlertMsg('✅ Cake Successfully Added!')
          console.log(data)
          setIsUploaded(false)

          setTimeout(() => {
        router.push('/home') // 🔁 Change to your desired route
      }, 1000)
        
      }else{
          const text = await res.text()
          console.error('API Error:', text)
          setAlertMsg(data.error || 'Something went wrong!')
          return
      }
  }
  return (
    <div style={{backgroundImage:"url(/shopLogo.jpg)"}}
      className='w-full h-screen font-bold text-white rounded-2xl relative mt-7 flex justify-center items-center'>
       <div>  
            {alertMsg && (
                <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-sm px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 z-10">
                    {alertMsg}
                </div>)}
        </div>
      <form onSubmit={handleSubmit} method="POST" className='p-4 bg-purple-950 flex justify-center items-center text-white rounded-[8px] w-[300px] h-[380px] flex-col'>
              <h1 className='text-4xl text-center text-white'>Cake Factory</h1>
                  <input 
                    placeholder='Cake Name:'
                    name ="name" 
                    type='text' 
                    className='border-b-1 border-b-white block mb-4 mt-3 text-white'/>
          
               <input
                  placeholder='Cake Price:' 
                  name ="price" 
                  type='text' 
                  className='border-b-1 border-b-white mb-5'/>
        
                <input name ="image" 
                    type='file'
                    accept="image/*"  //limits the file picker to Images only
                    onChange={(e)=>e.target.files?.[0] &&
                      setPreview(URL.createObjectURL(e.target.files[0]))}
                    className='border-1 border-gray-300 p-5 h-[80px] w-[210px] mb-4 flex justify-center items-centertext-centre rounded-[5px]'/>

                        {preview && (
                            <div className="mb-4 w-full flex justify-center">
                              <Image 
                                src={preview} 
                                alt="Preview" 
                                className="max-h-32 object-contain rounded-md"
                              />
                            </div>
                          )}

                      <textarea 
                          placeholder='Description'
                          name ="description" 
                          className='border-1 px-2 border-gray-200 h-[50px] w-[210px] rounded-[6px]'/>

                        <button type='submit' className='bg-pink-400 hover:bg-pink-500 rounded-[4px] h-[45px] w-[133px] flex items-center justify-center mt-6'>{isUploaded? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />) : ('Upload Cake')
                                    }</button>
              </form>
    </div>
  )
}

export default Cakeupload
