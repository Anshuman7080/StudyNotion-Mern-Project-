import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import Button from './Button'
import { FaArrowRightLong } from "react-icons/fa6";

const InstructorSection = () => {
  return (
    <div className="mt-16 w-full">
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">

        {/* Image (hidden on small screens) */}
        <div className="hidden md:block w-full md:w-[50%]">
          <img
            src={Instructor}
            alt="Instructor"
            className="shadow-[-12px_-12px_0_0] shadow-white w-full max-w-[500px] mx-auto"
          />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-[50%] flex flex-col gap-8 px-4 sm:px-6 md:px-0 text-center md:text-left items-center md:items-start">
          <h2 className="text-3xl sm:text-4xl font-semibold">
            Become an <HighlightText text={"Instructor"} />
          </h2>

          <p className="font-medium text-base text-richblack-300 max-w-[90%] md:max-w-none">
            Instructors from around the world teach millions of students on StudyNotion.
            We provide the tools and skills to teach what you love.
          </p>

          <div className="w-fit">
            <Button active={true} linkto={"/signup"}>
              <div className="flex gap-2 items-center">
                Start Learning Today
                <FaArrowRightLong />
              </div>
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default InstructorSection
