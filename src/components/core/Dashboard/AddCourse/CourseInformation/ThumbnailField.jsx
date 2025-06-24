import React, { useRef, useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import { FaCloudUploadAlt } from "react-icons/fa";

const ThumbnailField = ({name,label,errors,register,setValue,getValues}) => {

    const [imageFile,setImageFile]=useState("");
    const [previewImage,setPreviewImage]=useState("");
    const {course}=useSelector((state)=>state.course);


    const fileRef=useRef(null);
    
    const handleClick=()=>{
    fileRef.current.click();
    }

const imageFileHandler=(e)=>{
    const file=e.target.files[0];
    if(file){
        setImageFile(file);
        previewFile(file);
    }
}

const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        setPreviewImage(reader.result);
    }
  }

  useEffect(()=>{
    setValue(name,imageFile);
  })

   useEffect(() => {
      if (imageFile) {
        previewFile(imageFile);
      }
    }, [imageFile]);


    useEffect(()=>{
        register(name,{
            required:true,
        })
    },[])


  return (
    <div>

    <label className='text-sm text-richblack-25'> {label}<sup  className='text-pink-500'>*</sup></label>
 
   <div  className=' bg-richblack-700  relative min-h-[140px] py-1 flex justify-center items-center rounded-lg'>
   <div className=' mx-auto'>
   <img  src={previewImage || course?.thumbnail} 

      className="w-full h-full max-h-[440px] max-w-[400px] object-cover rounded-lg" />
   </div>
   <input
        type="file"
        ref={fileRef}
        id={name}
        onChange={imageFileHandler}
        accept="image/png,image/gif,image/jpg" 
    
     className="w-full hidden bg-richblack-700 py-1 rounded-md px-3 outline-none"

    />
    <button onClick={handleClick}
    className='absolute'>
    <FaCloudUploadAlt size={34} />
    </button>

   </div>

   
      
    </div>
  )
}

export default ThumbnailField
