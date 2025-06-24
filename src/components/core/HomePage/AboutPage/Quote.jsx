import React from 'react'
import HighlightText from '../HighlightText'

const Quote = () => {
  return (
    <div className="text-richblack-50">
      We are passionate about revolutionizing the way we learn. Our innovative platform 
      <HighlightText text={"combines technology"}/>
      , 
      <span className=" text-transparent bg-gradient-to-r from-[#FF512F] to-[#F09819] bg-clip-text"> {" "} expertise</span>, and community to create an 
     <span className=" text-transparent bg-gradient-to-r from-[#E65C00] to-[#F9D423] bg-clip-text">
        {" "}
        unparalleled educational experience.
     </span>
    </div>
  )
}

export default Quote
