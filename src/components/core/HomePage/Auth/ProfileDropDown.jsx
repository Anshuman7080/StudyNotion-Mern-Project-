
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import useOnClickOutside from "../../../../hooks/useOnClickOutside"

import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../../../slices/profileSlice"
import { resetCart } from "../../../../slices/cartSlice"
import { setToken } from "../../../../slices/authSlice"
import { Link, useNavigate } from "react-router-dom"
import {toast} from "react-hot-toast"

const ProfileDropDown = () => {


   const [isOpen,setIsOpen]=useState(false);
   const ref=useRef(null);
   const dispatch=useDispatch();
   const {user}=useSelector((state)=>state.profile);
const navigate=useNavigate();

useOnClickOutside(ref, ()=>{setIsOpen(false)});

   const Logout=()=>{
   dispatch(setToken(null));
 dispatch(setUser(null));
   dispatch(resetCart());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out")
    navigate("/")
   }

  return (
   

    <button onClick={()=>setIsOpen(true)}
    className="text-white flex items-center gap-2 relative">
 <div className="flex items-center gap-2">
  <img
    src={user?.image}
    alt={user?.firstName}
    className="aspect-square rounded-full w-[30px] object-cover"
  />
  <AiOutlineCaretDown className="text-sm text-richblack-100"/>

 </div>  

{
  isOpen && (
    <div
    onClick={(e)=>e.stopPropagation()}
    ref={ref}
   className="absolute top-[118%] right-0 z-50 divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
    >

      <Link to="/dashboard/my-profile">
      <div className="flex items-center gap-2 px-4 py-2 hover:bg-richblack-700">
        <VscDashboard className="text-lg" />
        <span>Dashboard</span>
      </div> 
      </Link> 

      <div 
      onClick={Logout}
      className="flex items-center gap-2 px-4 py-2 hover:bg-richblack-700">
        <VscSignOut className="text-lg" />
        <span >Logout</span>
      </div>  

    </div>
  )
};

    </button>
    
  
  )
}

export default ProfileDropDown

























