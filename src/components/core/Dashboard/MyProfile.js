import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from "../../common/IconBtn"
const { useState } = require("react")

const MyProfile = () => {
    
    const {user}=useSelector((state)=>state.profile);
    console.log("user is",user);
   
    const navigate=useNavigate();
  return (
 <div className="text-white flex flex-col justify-center items-center gap-5 w-full">

<h1 className="text-2xl font-bold ">My Profile</h1>

{/* first col */}

<div className=' flex flex-row  w-full lg:w-[70%] mx-auto gap-5  lg:gap-20  bg-richblack-800 py-4 rounded-lg'>
{/* left side */}
<div className='flex flex-row gap-6 mx-8 w-[50%]'>
<img src={user?.image}
    alt={`profile-${user?.firstName}`}
    className="aspect-square w-[30%] rounded-full object-cover"
/>
<div className=' flex flex-col w-[40%] '>
    <p className="text-richblack-5 py-3 font-xl uppercase">{user?.firstName+" "+ user?.lastName}</p>
    <p className='text-sm -mt-3  text-richblack-400 break-words md:break-normal'>{user?.email}</p>
</div>
</div>

{/* right side */}
<div  className='flex items-center justify-center w-[60%] '>
<IconBtn 
    text="Edit"
    onclick={()=>{
        navigate("/dashboard/settings");
    }}

>

</IconBtn>
</div>

</div>



{/* Second coloumn */}


<div className="flex flex-col w-full lg:w-[70%] mx-auto gap-5  bg-richblack-800 py-4 rounded-lg ">
    <div className='flex   gap-3 px-3 lg:gap-0 lg:px-0 flex-row  justify-around w-[100%] ' >
        <p className='w-[60%] pt-1 text-md text-richblack-50 font-bold '>Personal Details</p>
        <div className='w-[25%] '>

       <IconBtn text="Edit"
    onclick={()=>{
        navigate("/dashboard/settings")
    }}
   />
       </div>

    </div>


    <div className='flex flex-col mt-4 gap-4 mb-1'>
       
       <div className='flex  sm:gap-2 sm:mx-4 flex-row justify-around'>
 
       <div className="flex flex-col gap-0.5 w-[40%]">
            <p className='text-[15px] text-richblack-600 '>FirstName</p>
            <p className=' text-[20px] font-sm text-richblack-400'>{user?.firstName}</p>
        </div>
        <div className='w-[30%]'>
            <p className='text-[15px] text-richblack-600 '>LastName</p>
            <p className='text-richblack-400'>{user?.lastName}</p>
        </div>

       </div>



        
        <div className='flex  gap-16 mx-7 lg:mx-0 lg:gap-0 lgflex-row lg:justify-around'>

        <div className='flex flex-col w-[40%] gap-0.5'>
            <p className='text-[15px] text-richblack-600 '>Email</p>
            <p className='text-richblack-400 text-sm break-words md:break-normal'>{user?.email ?? "Add email"}</p>
        </div>

        <div className=' w-[30%] '>
            <p className='text-[15px] text-richblack-600 '>Phone Number</p>
            <p className='text-richblack-400 text-sm'>{user?.additionalDetails?.contactNumber ?? "Add contact number"}</p>
        </div>

        </div>



    </div>
</div>

      
    </div>
  )
}

export default MyProfile
