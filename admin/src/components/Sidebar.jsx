import React from 'react'
import { BiLogOut } from 'react-icons/bi'
import { FaListAlt } from 'react-icons/fa'
import { FaSquarePlus } from 'react-icons/fa6'
import { MdFactCheck } from 'react-icons/md'
import { NavLink, Link } from 'react-router-dom'
import logo from '../assets/logo.png'




const Sidebar = ({setToken}) => {
  return (

    <div className='w-full sm:w-1/5 sm:min-h-screen bg-white rounded pb-3 flex flex-col items-center'>
      <Link to='/' className='text-2xl font-bold flex items-center sm:pl-6 pt-6'>
        <img src={logo} alt='Logo' width={64} height={64} />
        <span className='pl-2 hidden lg:flex'>Bookkart</span>
      </Link>

      <div className='flex sm:flex-col gap-5 pt-10 w-full items-center'>

        <NavLink
          to="/"
          className={({ isActive }) =>
            `w-full flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
     ${isActive ? " bg-blue-100 text-blue-600" : " text-gray-600 hover:bg-gray-200"}`
          }
        >
          <FaSquarePlus />
          <span className="hidden lg:inline">Add Item</span>
        </NavLink>


        <NavLink
          to="/list"
          className={({ isActive }) =>
            `w-full flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
     ${isActive ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-200"}`
          }
        >
          <FaListAlt />
          <span className="hidden lg:inline">List</span>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `w-full flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
     ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-200'}`
          }
        >
          <MdFactCheck />
          <span className="hidden lg:inline">Orders</span>
        </NavLink>


        {/* logout button */}
        <div className='max-sm:ml-5 sm:mt-72'>
          <button onClick={()=>setToken('')}  className='flex items-center justify-start gap-x-2 sm:pl-2 p-5 text-[16px] font-[400] cursor-pointer h-10  rounded-xl bg-amber-900/80'>
            <BiLogOut className='text-lg' />
            <div className='hidden lg:flex '>Logout</div>
          </button>
        </div>
      </div>
    </div>

  )
}

export default Sidebar