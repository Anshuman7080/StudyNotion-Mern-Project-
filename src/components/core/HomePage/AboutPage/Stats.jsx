import React from 'react'

const Stats=[
    {count:"5K" , label:"Active Students"},
    {count:"10+" , label:"Mentors"},
    {count:"200+" , label:"Courses"},
    {count:"50+" , label:"Awards"},
]
const StatsComponent = () => {
  return (
  
    <div className=" bg-richblack-800 flex w-full  items-center justify-center">
        <div className='flex flex-col md:flex-row lg:flex-row items-center justify-center  gap-[10px] md:[50px] lg:gap-[190px] '>
            {
                Stats.map((data,index)=>{
                    return (
                     <div key={index} 
                     className='flex flex-col gap-2 mt-14 mb-14 justify-center items-center '>
                      <h1 className='font-bold text-2xl'>  {data.count}</h1>
                      <p className="text-[10px] text-richblack-400">  {data.label}</p>

                     </div>

                    )
                })
            }
        </div>
    </div>
 
  )
}

export default StatsComponent
