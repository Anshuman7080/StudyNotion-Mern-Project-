import React from 'react'
import HighlightText from './HighlightText'
import Know_your_progress from "../../../assets/Images/Know_your_progress.png"
import Compare_with_others from "../../../assets/Images/Compare_with_others.png"
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import Button from './Button'

const LearningLanguageSection = () => {
  return (
    <div className="mt-[130px]  mb-28">
    <div className="flex flex-col gap-5 items-center">

    <div className="text-4xl font-semibold text-center">
              Your Swiss Knife for 
              <HighlightText text={"Learning any language"}/>

    </div>

    <div className="text-center text-richblack-600 mx-auto text-base font-medium w-[70%]">
    Using spin making learning multiple language easy,with 20+ languages realistic voice-over,
    progress tracking ,custom schedule and more.

    </div>

     <div className='flex flex-col lg:flex-row items-center justify-center mt-5'>
                <img 
                    src = {Know_your_progress}
                    alt = "KNowYourProgressImage"
                    className='object-contain lg:mt-0  lg:-mr-32 '
                />
                <img 
                    src = {Compare_with_others}
                    alt = "KNowYourProgressImage"
                    className='object-contain lg:mt-0 -mt-10'
                />
                <img 
                    src = {Plan_your_lessons}
                    alt = "KNowYourProgressImage"
                    className='object-contain lg:mt-0 -mt-14 lg:-ml-36'
                />
            </div>

    <div className="w-fit items-center">
  <Button active={true} linkto={"/signup"}>
    <div>Learn more</div>
  </Button>
    </div>

    </div>
      
    </div>
  )
}

export default LearningLanguageSection
