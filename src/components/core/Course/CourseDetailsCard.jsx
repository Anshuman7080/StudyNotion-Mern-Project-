import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {ACCOUNT_TYPE} from "../../../utils/constants"
import copy from "copy-to-clipboard"
import toast from 'react-hot-toast';
import { addToCart } from '../../../slices/cartSlice';

function CourseDetailsCard ({course,setConfirmationModal, handleBuyCourse}){

  
  const {
    thumbnail:ThumbnailImage,
    price:CurrentPrice,
  }=course;

  const {user}=useSelector((state)=>state.profile);
  const {token}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  
 

  const handleAddToCart= ()=>{

     if(user && user?.accountType !== ACCOUNT_TYPE.STUDENT){
      toast.error("You are not a Student ,You cant buy a course");
      return ;
     }
     if(token){
      dispatch(addToCart(course));
      return;
     }

     setConfirmationModal({
      text1:"You are not logged in",
      text2:"please login to add to cart",
      btn1Text:"login",
      btn2Text:"Cancel",
      btn1Handler:()=>navigate("/login"),
      btn2Handler:()=>setConfirmationModal(null),

     })


  }

  const handleShare=()=>{
copy(window.location.href);
toast.success("link copied to clipboard");
  }




  return (
<div>
  <img
    src={ThumbnailImage}
    alt="thumbnail image"
    className="max-h-[300px] min-h-[180px] w-[400px] rounded-xl " 
  />

<div>
  Rs. {CurrentPrice}
</div>


<div className="flex flex-col gap-y-6">
  <button
  className="bg-yellow-50"
  onClick={user && course?.studentsEnrolled.map(enrolled => enrolled._id).includes(user?._id)? 
  ()=>navigate("/dashboard/enrolled-courses"): 
   handleBuyCourse
   }
   >

  {

user && course?.studentsEnrolled.map(enrolled => enrolled._id).includes(user?._id) ? " Go to Course" :
"Buy Now"

  }
  </button>

{
  (!course?.studentsEnrolled.includes(user?._id))  && (
    <button 
      className="bg-yellow-50"
    onClick={handleAddToCart}>
      Add to Cart
    </button>
  )
}


</div>

<div>
  <p>
   30 days money back guarantee 
  </p>
  <p>
    This Course inlcudes:
  </p>
  <div className=' flex flex-col gap-y-3'>
{
  course?.instructions?.map((item,index)=>{
  <p key={index} className="flex gap-2">
    <span>{item}</span>
  </p>
})
}
  </div>
</div>

<div>
  <button
  className="mx-auto flex items-center gap-2 p-6 text-yellow-25 "
  onClick={handleShare}>
    Share
  </button>
</div>
 
</div>
  );
}

export default CourseDetailsCard