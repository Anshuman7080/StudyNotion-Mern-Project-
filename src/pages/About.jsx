import React from 'react';
import aboutus1 from "../assets/Images/aboutus1.webp"; 
import aboutus2 from "../assets/Images/aboutus2.webp"; 
import aboutus3 from "../assets/Images/aboutus3.webp"; 
import FoundingStory from "../assets/Images/FoundingStory.png"
import HighlightText from '../components/core/HomePage/HighlightText';
import Quote from '../components/core/HomePage/AboutPage/Quote';
import StatsComponent from '../components/core/HomePage/AboutPage/Stats';
import LearningGrid from '../components/core/HomePage/AboutPage/LearningGrid';
import ContactFormSection from '../components/core/HomePage/AboutPage/ContactFormSection';
import Footer from '../components/common/Footer';
import ReviewSlider from '../components/common/ReviewSlider';
const About = () => {
  return (
   <div className=" text-white w-full ">
{/* Section 1 */}
<section className='bg-richblack-800 pt-[80px] h-[500px]'>
<div className="flex flex-col items-center justify-center mx-auto gap-16">
    <header className="flex flex-col gap-9 px-1.5 items-center w-full ">
   <p className="text-center font-semibold text-4xl mx-auto w-[75%]">
   Driving Innovation in Online Education for a 
   <HighlightText text={"Brighter Future"}/>
   </p>

    <p className="text-center px-1">
    Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, 
    leveraging emerging technologies, and nurturing a vibrant learning community.
    </p>

    </header>

    <div className="flex flex-col  gap-5 lg:flex-row lg:gap-x-5 mx-auto">
        <img src={aboutus1} 
          className=' min-h-[300px] min-w-[330px]'
        />
        <img src={aboutus2} 
           className=' min-h-[300px] min-w-[330px]'
        />
        <img src={aboutus3} 
           className=' min-h-[300px] min-w-[330px]'
        />
    </div>

</div>
</section>



{/* Section 2 */}


<section className="  lg:mt-[10rem]  mt-[59rem]  w-full mx-auto  flex flex-col flex-wrap ">
    <div className=" mx-auto w-full md:w-[70%] px-2 text-center font-semibold text-2xl">
        <Quote/>
    </div>
</section>




{/* Section 3 */}

<section className="mt-[100px] w-full flex mx-auto ">
    <div className="flex flex-col  gap-[120px]">
{/* first story div */}
        <div className="flex  justify-between items-center flex-col lg:flex-row  mx-auto text-center w-full md:w-[90%] ">
        {/* Founding  story left box */}
          <div className="flex flex-col w-full md:w-[40%] px-2 gap-4 text-start" >
          <h1 className="font-semibold mx-auto md:mx-0 text-3xl text-transparent bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text">Our Founding story</h1> 
           <p className="text-sm text-richblack-200 px-2 leading-5">Our e-learning platform was born out of a shared vision and 
           passion for transforming education. It all began with a group of educators,
            technologists, and lifelong learners who recognized the need for accessible, 
            flexible, and high-quality learning opportunities in a rapidly evolving digital world.
            </p>

           <p className="text-sm text-richblack-200 px-2 leading-5">
           As experienced educators ourselves, we witnessed firsthand the limitations
            and challenges of traditional education systems. We believed that education 
            should not be confined to the walls of a classroom or restricted by geographical
             boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all
              walks of life to unlock their full potential.
           </p>
          </div>
 {/* Founding  story right box */}
<div className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] px-2 mx-auto md:mx-7 mt-14 md:mt-8">
  <img
    src={FoundingStory}
    alt="Founding Story"
    className="w-full h-auto rounded-md shadow-lg shadow-pink-600 lg:shadow-[-3px_-2px_30px_-8px_rgba(255,105,180,0.6)]"
  />
</div>


        </div>


       
{/* visson and misson */}

<div className="flex  justify-between items-center flex-col   lg:flex-row   mx-auto text-center w-[90%]">
    {/* left box */}
 
  <div className="flex flex-col  text-start px-2  gap-4 w-full md:w-[40%]">
    <h1 className="font-semibold text-3xl mx-auto md:mx-0  text-transparent bg-gradient-to-r from-[#E65C00]  to-[#F9D423] bg-clip-text" >Our Vision</h1>
    <p className="text-sm text-richblack-200 leading-5">
    With this vision in mind, we set out on a journey to create 
    an e-learning platform that would revolutionize the way people 
    learn. Our team of dedicated experts worked tirelessly to develop
     a robust and intuitive platform that combines cutting-edge technology
      with engaging content, fostering a dynamic and interactive learning experience.
    </p>
  </div>

    {/* right box */}

<div className="flex flex-col  text-start px-2 mt-8 lg:mt-0  gap-4 w-full md:w-[40%]">
    <h1 className="font-semibold text-3xl  mx-auto md:mx-0  text-transparent bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA]  to-[#A6FFCB] bg-clip-text">Our Mission</h1>
    <p className="text-sm text-richblack-200 leading-5">
    our mission goes beyond just delivering courses online. We wanted to create 
    a vibrant community of learners, where individuals can connect, collaborate, 
    and learn from one another. We believe that knowledge thrives in an environment 
    of sharing and dialogue, and we foster this spirit of collaboration through forums, 
    live sessions, and networking opportunities.
    </p>
</div>

</div>

    </div>
</section>


{/* Section 4 */}

<section className='mt-[100px] lg:mt-[80px]'> 
<StatsComponent/>
</section>


{/* Section 5 */}


<section className="mx-auto mt-[60px] flex items-center justify-center flex-col gap-5 mb-[140px]">

<LearningGrid/>

<ContactFormSection/>


  
</section>

<section className="w-full">
  <div className="">
    <ReviewSlider />
  </div>
</section>

<section>
<Footer/>
</section>

   </div>

  );
};

export default About;
