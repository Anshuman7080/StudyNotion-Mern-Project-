
import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import {Link} from "react-router-dom"
import HighlightText from '../components/core/HomePage/HighlightText';
import Button from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';

const Home = () => {
  return (
    <div>
      {/* section1 */}


<div className='relative mx-auto flex flex-col w-9/12  max-w-maxContent items-center 
text-white justify-between'>


<Link to={"/signup"}> 

<div className="group  mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 
transition-all duration-200 hover:scale-95 w-fit drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none  ">

<div className=" group-hover:bg-richblack-900 flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
">
    <p>Become an Instructor</p>
    <FaArrowRightLong />
</div>
</div>

</Link>

<div className="text-center text-4xl font-semibold mt-7">
  Empower Your Future with  
  <HighlightText text={"Coding Skills"}/>
</div>

<div className=" mt-4 w-[90%] text-center text-lg font-bold text-richblack-200"> 
With our online coding courses, you can learn at your own pace, 
from anywhere in the world, and get access to a wealth of resources,
 including hands-on projects, quizzes, and personalized feedback from instructors. 
</div>


<div className="flex flex-row gap-7 mt-8 flex-wrap sm:flex-col md:flex-col lg:flex-row">

  <Button active={true} linkto={"/signup"}>
    Learn More
  </Button>
  <Button active={false} linkto={"/login"}>
    Book a Demo
  </Button>
</div>


<div className="mx-3 my-12 shadow-blue-200 shadow-[10px_-2px_40px_-5px] ">

  <video
  className='shadow-[12px_12px_0_0] shadow-white border-none'
  muted 
  loop
  autoPlay
  >
<source src={Banner} type="video/mp4"/>
  </video>

</div>

{/* code section 1 */}

<div>
<CodeBlocks
  position={"lg:flex-row"}
  heading={
    <div className="text-4xl font-semibold">
      Unlock Your
      <HighlightText text={"coding potental"}/>{" "}
      with our online courses 
    </div>
  }
  subheading={
    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
  } 
  ctabtn1={
    {
      btnText:"try it yourself",
      linkto:"/signup",
      active:true,
    }
  }
  ctabtn2={
    {
      btnText:"learn more",
      linkto:"/login",
      active:false,
    }
  }
  codeblock={`<!DOCTYPE html>
<html>
head><title>Example</title><linkrel="stylesheet"href="styles.css">
/head>
body>
<h1><ahref="/">Header</a>
</h1>
nav><ahref="one/">One</a><ahref="two/">Two</a>
<ahref="three/">Three</a>
/nav>`
}
codeColor={"text-yellow-25"}
/>


</div>


{/* code section 2 */}
<div>
<CodeBlocks
  position={"lg:flex-row-reverse"}
  heading={
    <div className="text-4xl font-semibold">
    Start
      <HighlightText text={`coding  in second`}/>
      {" "}
    </div>
  }
  subheading={
   "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
  } 
  ctabtn1={
    {
      btnText:"continue lesson",
      linkto:"/signup",
      active:true,
    }
  }
  ctabtn2={
    {
      btnText:"learn more",
      linkto:"/login",
      active:false,
    }
  }
  codeblock={`<!DOCTYPE html>
<html>
head><title>Example</title><linkrel="stylesheet"href="styles.css">
/head>
body>
<h1><ahref="/">Header</a>
</h1>
nav><ahref="one/">One</a><ahref="two/">Two</a>
<ahref="three/">Three</a>
/nav>`
}
codeColor={"text-yellow-25"}
/>

</div>

<ExploreMore/>

</div>

       {/* section2 */}

       <div className="bg-pure-greys-5 text-richblack-700">

           <div className="homepage_bg h-[310px]">

            <div className="w-9/12 max-w-maxContent flex  flex-col justify-between items-center gap-5 mx-auto">
                    <div className="h-[150px]"></div>
              <div className="flex flex-row gap-7 text-white mt-8">
                <Button active={true} linto={"/signup"}>
                  <div className="flex items-center gap-3">
                    Explore Full Catalog
                    <FaArrowRightLong/>
                  </div>
                 
                </Button>

                <Button active={false} linkto={"/signup"}>
                  <div className="flex items-center gap-3">
                   Learn More
                  </div>
                 
                </Button>
              </div>
            </div>

           </div>

           <div className="mx-auto w-9/12 max-w-maxContent flex flex-col items-center justify-between
           gap-7  -mt-10">

                <div className="flex flex-row gap-5 mb-10 mt-[95px]">
                    <div className="text-4xl font-semibold w-[45%]">
                  Get the skills you need for a
                  <HighlightText text={"job that is in demand"}/>
                    </div>

                    <div className="flex flex-col gap-10 w-[40%] items-start">
                      <div className=" text-[16px]">
                      The modern StudyNotion is the dictates its own terms. Today, to be a competitive 
                      specialist requires more than professional skills.
                      </div>
                      <Button active={true} linkto={"/signup"}>
                        Learn more
                      </Button>
                    </div>

                </div>

           
                  <TimelineSection/>
         

<LearningLanguageSection/>

           </div>

              

       </div>


        {/* section3*/}
        <div className="w-9/12 mx-auto max-w-maxContent  flex flex-col items-center justify-between gap-8
        first-letter bg-richblack-900 text-white ">

             <InstructorSection/>
             <h2 className="text-center text-4xl font-semibold mt-10">Reviews from Other Learners</h2>
                {/* Review slider*/}
                <ReviewSlider/>
        </div>


         {/* footer */}

<div className="mt-[40px]">
<Footer/>
</div>

    </div>
  )
}

export default Home

