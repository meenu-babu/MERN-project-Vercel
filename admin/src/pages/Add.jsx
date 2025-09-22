import React, { useState } from 'react'
import upload_icon from "../assets/upload_icon.png"
import { TbTrash } from 'react-icons/tb'
import { FaPlus } from 'react-icons/fa'
import axios from 'axios'
import { backend_url } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

  const [image, setImage] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Fiction')
  const [popular, setPopular] = useState(false)

  const handleChangeImage = (e) => {
    setImage(e.target.files[0])
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const formData=new FormData()

      formData.append("description",description)
      formData.append("name",name)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("popular",popular)
      formData.append("image",image)

      const response=await axios.post(`${backend_url}/product/create`,formData,{headers:{token}})
      console.log(response)

      if(response.data.success){
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setPrice('')
        setImage(null)
        setPopular(false)
      }
      else{
        toast.error(response.data.message)
      }
    

    } catch (error) {
      console.error(error)
      toast.error(error.message)
      
    }
  }
  return (
    <div className='px-2 sm:px-8 sm:mt-14 pb-16'>
      <form onSubmit={onSubmitHandler} className='flex flex-col gaap-y-3text-[14px] font-[500] lg:w-[777px]'>
        <div className='w-full'>
          <h5>Product Name</h5>
          <input onChange={(e) => setName(e.target.value)} value={name} type='text' placeholder='Write Here.....' className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-white mt-1 w-full max-w-lg' />
        </div>
        <div className='w-full'>
          <h5>Product description</h5>
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} type='text' rows={5} placeholder='Write Here...' className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-white mt-1 w-full max-w-lg' />
        </div>
        <div className='flex gap-x-2' >
          {/* categories */}
          <div>
            <h5> Category</h5>
            <select onChange={(e) => setCategory(e.target.value)} value={category} className='px-3 py-3 ring-1 ring-slate-900/10 rounded bg-white mt-1 sm:w-full text-gray-400'>
              <option value='Fiction'>Fiction</option>
              <option value='Children'>Children</option>
              <option value='Health'>Health</option>
              <option value='Academic'>Academic</option>
              <option value='Business'>Business</option>
              <option value='Religious'>Religious</option>
            </select>
          </div>
          <div className='flex items-end gap-x-2 pt-2'>
            <label htmlFor='image'>
              <img src={image ? URL.createObjectURL(image) : upload_icon} alt="" className='w-14 h-14 aspect-square object-cover ring-1 ring-slate-900/5 bg-white rounded-lg' />
              <input type='file' onChange={handleChangeImage} name='image' id='image' hidden />
            </label>
          </div>
        </div>

        <div>
          <h5>Price</h5>
          <input onChange={(e) => setPrice(e.target.value)} value={price} type='number' placeholder='Price' min={0} className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-white mt-1' />
        </div>
        <div className='flex items-center justify-start gap-2 my-2'>
          <input onChange={(e) => setPopular((prev) => !prev)} type="checkbox" checked={popular} id='popular' />
          <label htmlFor='popular' className='cursor-pointer'>Add to popular</label>
        </div>
        <button type='submit' className=' medium-14 bg-pink-900/80 text-white ring-1 ring-tertiary px-7 py-2.5 rounded-full mt-3 max-w-44 sm:w-full'>Add product</button>
      </form>
    </div>
  )
}

export default Add