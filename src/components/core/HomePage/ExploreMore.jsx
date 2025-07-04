import React from 'react'
import { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from './HighlightText'
import CourseCard from './CourseCard'

const tabsName=[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths", 
    "Career paths"
]

const ExploreMore = () => {

    const [currentTab,setCurrentTab]=useState(tabsName[0]);
    const [courses,setCourses]=useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);

    const setMyCards=(value)=>{
        setCurrentTab(value);
        const result=HomePageExplore.filter((course)=>course.tag===value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);  
    }

  return (
    <div className='flex flex-col gap-5'>

      <div className="text-4xl px-2 font-semibold text-center">
        Unlock the 
        <HighlightText text={"Power of Code"}/>
      </div>

      <p className="text-center text-richblack-300 text-sm text-[16px] mt-3 ">
        Learn to build anything you can imagine
      </p>

      <div className="flex flex-row flex-wrap rounded-full bg-richblack-800 mb-5 border-richblack-100 mt-5 px-2 py-2">
       { tabsName.map((element,index)=>{
            return (
                <div className={`text-[16px] flex flex-row mx-auto items-center gap-2 ${currentTab===element ? "bg-richblack-900 text-richblack-25 font-medium": "text-richblack-200"}
                 rounded-full duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-25 px-7 py-2`}
                key={index}
                onClick={()=>setMyCards(element)}>
                    {element}
                </div>
            )
        })
       }
      </div>


      <div className="h-[150px]  mt-72 md:mt-20 lg:mt-20 flex  justify-center items-center ">

        <div className="absolute flex flex-col  items-center  justify-center lg:flex-row lg:justify-between gap-8 w-full mt-5 ">
 
                 {
                    courses.map((element,index)=>{
                        return (
                            <CourseCard
                            key={index}
                                cardData={element}
                                currentCard={currentCard}
                                setCurrentCard={setCurrentCard}
                            />
                        )
                    })
                 }

        </div>

      </div>



    </div>
  )
}

export default ExploreMore
