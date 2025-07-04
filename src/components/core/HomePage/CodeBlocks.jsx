import React from 'react'
import Button from "../HomePage/Button"
import HighlightText from "./HighlightText"
import { FaArrowRightLong } from "react-icons/fa6";
import { TypeAnimation } from 'react-type-animation';


const CodeBlocks = ({position,heading, subheading,ctabtn1,ctabtn2,codeblock,backgroundGradient,codeColor}) => {
  return (
    <div className={`flex   ${position} flex-col  my-20 justify-between gap-10`}>
      
      {/* section 1 */}
      <div className=" w-[100%] lg:w-[50%] flex flex-col gap-8">
         {heading}
         <div className="text-richblack-300  font-bold w-[85%] ml-2 md:ml-0">
            {subheading}
         </div>  

         <div className="flex gap-7 mt-7">
          <Button active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
                {ctabtn1.btnText}
                <FaArrowRightLong/>
            </div>
          </Button>

          <Button active={ctabtn2.active} linkto={ctabtn2.linkto}>   
                {ctabtn2.btnText}
          </Button>
           
         </div>             
      </div>

      {/* section 2 */} 

      <div className="h-fit flex flex-row sm:text-sm leading-[18px] sm:leading-6  py-4 w-[100%] lg:w-[470px] 
">
        {/* HW: add BG gradient  */}
         <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold ">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
         <p className="block sm:block md:hidden">12</p>
         </div>

         <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2 `}>
            <TypeAnimation
                sequence={[codeblock, 5000, ""]}
                repeat={Infinity}
                cursor={true}
                omitDeletionAnimation={true}
                style={
                    {
                        whiteSpace:"pre-line",
                        display:"block",

                    }
                }
            />
         </div>
      </div>

    </div>
  )
}

export default CodeBlocks
