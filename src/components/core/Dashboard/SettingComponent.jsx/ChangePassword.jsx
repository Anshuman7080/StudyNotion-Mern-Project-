
import React from 'react'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from "../../../common/IconBtn"
import { changePassword } from '../../../../services/operations/settingAPI'
const ChangePassword = () => {
const navigate=useNavigate();
const dispatch=useDispatch();
  const {token}=useSelector((state)=>state.auth);
const {
  register,
  handleSubmit,
  formState:{errors},

}=useForm();

const formHandler=(data)=>{
 
  dispatch(changePassword(data,token,navigate,dispatch));

}

  return (
    <div className='w-11/12  text-white '>

      <div className=' w-full md:w-[80%] max-w-[800px] flex flex-col gap-3 mx-auto bg-richblack-800 py-4 px-5 rounded-xl'>
         <p className='text-richblack-5 font-bold text-xl pt-2
        '>Change Password</p>
     

          <form onSubmit={handleSubmit(formHandler)}
          className=' flex flex-col  gap-6'>

         <div className=' flex   gap-10   flex-col  lg:flex-row '>

         <div className='flex flex-col  w-full lg:w-[45%]'>
            <label className='pb-0.5 text-sm text-richblack-50'>Current Password</label>
            <input 
              type="text"
              name="oldPassword"
              id="oldPassword"
              placeholder='Enter Current Password'
              className='py-1 outline-none bg-richblack-700  px-2 rounded-lg  w-full lg:max-w-[300px]'
              {...register("oldPassword",{required:true})}
            />
            {errors.oldPassword && (
              <span>Please enter your Current Password</span>
            )}
          </div>

          <div className='flex flex-col w-full lg:w-[45%]'>
          <label className='pb-0.5 text-sm text-richblack-50'>New Password</label>
            <input 
              type="text"
              name="newPassword"
              id="newPassword"
              placeholder='Enter New Password'
                 className='py-1 outline-none bg-richblack-700 px-2 rounded-lg w-full lg:max-w-[300px]'
              {...register("newPassword",{required:true})}
            />
            {errors.newPassword && (
              <span>Please enter your new Password</span>
            )}

          </div>

         </div>

         <div className='flex flex-row gap-4 px-4 '>
         <button onClick={()=>{
            navigate("/dashboard/my-profile")
          }}
          className="px-8 py-2 text-center rounded-lg text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
           bg-richblack-700"
          >Cancel</button>

          <IconBtn type="submit" text="update"/>

         </div>

          </form>


         </div>

      </div>
  
  )
}

export default ChangePassword
