import React from 'react'
import ContactUsForm from '../../../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className=" mt-[50px]  flex flex-col gap-2">
    <h1 className="text-center font-semibold text-xl ">
        Get in Touch
    </h1>
    <p className="-mt-2 text-center text-[12px] text-richblack-500">
        We'd love to here for you, please fill out this form.
    </p>
   
      
<div className=" flex justify-center items-center mt-5 w-[800px]">
    <ContactUsForm/>
</div>

    </div>
  )
}

export default ContactFormSection
