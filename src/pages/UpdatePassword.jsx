import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../services/operations/authAPI';
import { useLocation } from 'react-router-dom';
import { IoEyeOffSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";

const UpdatePassword = () => {
  
    const [formData,setFormData]=useState({
        password:"",
        confirmPassword:"",
    });
    const location=useLocation();
    const dispatch=useDispatch();
    const [showPassword,setShowPassword]=useState(false);
    const {loading}=useSelector((state)=>state.auth);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);

    const {password,confirmPassword}=formData;

    const handleOnChange=(e)=>{
        setFormData((prevData)=>(
            {
                ...prevData,
                [e.target.name]: e.target.value,
            }
        ))
    }

    const handleOnSubmit=(e)=>{
e.preventDefault();
const token=location.pathname.split('/').at(-1);
dispatch(resetPassword(password,confirmPassword,token));
    }

  return (
    <div className=" text-white flex justify-center items-center">
  {loading ? (
    <div className="spinner"></div>
  ) : (
    <div className="w-11/12 mt-[5rem] flex flex-col items-center justify-center">
      <h1 className="w-[35%]  text-[30px] font-semibold leading-[2] ">Choose new Password</h1>
      <p className="w-[35%] text-[16px] text-richblack-300">Almost done. Enter your new password and you are all set.</p>
      <form onSubmit={handleOnSubmit}
      className="flex flex-col w-[35%]  pt-5 gap-8 ">

        <label className="flex flex-col  relative gap-1">
          <p className="text-[10px] text-richblack-25">
            New Password<sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter new password"
            className="w-[95%] text-white relative pl-2 outline-none bg-richblack-600  rounded-md h-8 placeholder:px-4  drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none "
          />
          <span onClick={() => setShowPassword((prev) => !prev)}
           className=" right-[10%]  absolute top-[50%] z-[10] cursor-pointer ">
            {showPassword ? (
              <IoEyeOffSharp fontSize={24} />
            ) : (
              <FaEye fontSize={24} />
            )}
          </span>
        </label>

        <label className="flex flex-col relative gap-1">

        <p className="text-[10px] text-richblack-25">
           Confirm  New Password<sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleOnChange}
            placeholder="Confirm Password"
             className="w-[95%] text-white  pl-2 outline-none bg-richblack-600  rounded-md h-8 placeholder:px-4  drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none "
          />
          <span onClick={() => setShowConfirmPassword((prev) => !prev)}
          className=" right-[10%]  absolute top-[50%] z-[10] cursor-pointer ">
            {showConfirmPassword ? (
              <IoEyeOffSharp fontSize={24} />
            ) : (
              <FaEye fontSize={24} />
            )}
          </span>

        </label>

        <button type="submit"
         className="w-[95%] bg-yellow-50 rounded-md h-8 text-black text-sm font-medium 
         drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none ">
         Reset Password</button>
      </form>
      <div className="flex items-center w-[35%]  justify-start gap-2 mt-2">
                <Link to="/login" className="flex items-center gap-2">
             <IoIosArrowRoundBack size={20} />
              <p className="text-[10px]">Back to Login</p>
             </Link>
                      </div>
    </div>
  )}
</div>

  )
}

export default UpdatePassword
