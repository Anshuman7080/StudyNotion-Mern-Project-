
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'
import { updateProfilePicture } from '../../../../services/operations/settingAPI'
import { useNavigate } from 'react-router-dom'

const ChangeProfilePicture = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null); 
  const [previewSource, setPreviewSource] = useState(null);
  const fileRef = useRef(null);

  const navigate=useNavigate();

  const handleClick = () => {
    fileRef.current.click();
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      previewFile(file);
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  }

  const handleFileUpload = () => {
    try {
      console.log("uploading")
      setLoading(true);
      const formData = new FormData()
      formData.append("displayPicture", imageFile);
      
    dispatch(updateProfilePicture(token,formData,navigate,dispatch))
    } catch (error) {
      console.log("error message ", error.message);
    } finally { 
      setLoading(false);
    }
  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <div className='w-11/12  text-white mt-4 '>
      <div  className='  w-full md:w-[80%] max-w-[800px] mx-auto bg-richblack-800 flex  gap-10 py-4 rounded-lg px-6 '>
      <img
  src={previewSource || user?.image}
  className="w-[78px] h-[78px] min-w-[78px] min-h-[78px] rounded-full object-cover"
/>

        <div className="flex flex-col mt-2">
          <p className="text-sm text-richblack-100">Change profile Picture</p>
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <input type="file" 
            ref={fileRef} 
            onChange={handleFileChange} 
            className="hidden"
             accept="image/png,image/gif,image/jpg" />
            <button onClick={handleClick}  className="px-8 py-2 text-center rounded-lg text-[13px] font-bold text-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
           bg-richblack-700" >
              Select
            </button>
            <IconBtn
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
                
              >
                {/* {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )} */}
              </IconBtn>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangeProfilePicture


//*************useRef hook*************

// To persist a value across re-renders 
// means ensuring that a certain piece of data or
//  reference remains consistent and does not reset
//  whenever the React component re-renders.


//when we delcare an variable using use state 
// ,its value get updated everytime we render the page 
// means it does not persist its value

// so ,when we need to keep the value across rerender then
// for that we use useref hook
// it persist the value across various re-render


//it return a single object.
// value of useref stores in current field


// the main use of useRef hook is to directly access 
// and change the element from  DOM
// for this we create a refrence of useRef and link with the 
// element whome we want to access