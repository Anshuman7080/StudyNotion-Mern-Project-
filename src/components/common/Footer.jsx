import React from 'react'
import { FooterLink2 } from '../../data/footer-links'
import { Link } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"

const Footer = () => {

const resources=[
          {
            title:"Articles",
            link: "/Articles",
          },
          {
            title:"Blogs",
            link: "/Blogs",
          },
          {
            title:"Chart Sheet",
            link: "/Chart-Sheet",
          },
          {
            title:"Challenges",
            link: "/Challenges",
          },
          {
            title:"Docs",
            link: "/Docs",

          },
          {
            title:"Projects",
            link: "/Projects",
            
          },
          {
            title:"Videos",
            link: "/Videos",
          },
          {
            title:"Workspaces",
            link: "/Workspaces",

          },
     ]

     const plans=[
      {
        title:"Paid Membership",
        link: "/Paid-Membership",
      },
      {
        title:"For students",
        link: "/For-students",
      },
      {
        title:"Business Solution",
        link: "/Business-Solution",

      },
 ]

 const community=[
  {
title:"forum",
link: "/forum",

  },
  {
title:"Chapters",
link: "/Chapters",
  },
  {
title:"Events",
link: "/Events",
  }
 ]

 const Company=[
  {
title:"About",
link: "/About",
  },
  {
title:"Careers",
link: "/Careers",
  },
  {
title:"Affiliates",
link: "/Affiliates",
  }
 ]

 const Subjects=FooterLink2.find(category=>category.title==="Subjects").links;
 const Languages=FooterLink2.find(category=>category.title==="Languages").links;
 const Career=FooterLink2.find(category=>category.title==="Career building").links;

  return (
    <div className=" flex justify-center w-full bg-richblack-800  ">


 
  <div className="w-11/12  gap-[5%] flex justify-center text-center items-center pb-[100px] ">


{/* left portion */}
<div className='w-[40%] -mt-[400px]  lg:-mt-[120px] flex gap-4  flex-col lg:flex-row justify-between '>

{/* Logo */}
<div className="flex flex-col gap-4">
 
<Link to="/">
    <img src={logo} height={42} width={160} loading ="lazy"  />
    </Link>

<div className="flex flex-col gap-2">
  <p className='text-richblack-300 font-semibold'>Company</p>
  {
    Company.map((element,index)=>(
      <Link key={index} to={`${element.link}`}
        className='text-sm text-richblack-600'>
       <p> {element.title}</p>
      </Link>
    ))
  }
</div>

</div>


<div className='flex flex-col gap-3 '>
  <h1 className='text-richblack-300 font-semibold'>Resources</h1>
  <div className="flex flex-col gap-2">
    {
      resources.map((element,index)=>(
        <Link key={index} to={`${element.link}`}
          className='text-sm text-richblack-600'>
          {element.title}
        </Link>
      ))
    }
  </div>

<h1 className='text-richblack-300 font-semibold mt-4'>Support</h1>
<div className=' mt-1'>
  <Link to="/help-center"
    className='text-sm text-richblack-600'>Help center</Link>
</div>

</div>


<div className="flex flex-col gap-2">
  <h1 className='text-richblack-300 font-semibold'>Plans</h1>
<div className="flex flex-col gap-2">
  {
    plans.map((element,index)=>(
      <Link key={index} to={`${element.link}`}
        className='text-sm text-richblack-600'>
        {element.title}
      </Link>
    ))
  }
</div>

<div className="mt-5">
  
<h1 className='text-richblack-300 font-semibold'>Community</h1>
<div className="flex flex-col gap-2 mt-2">
{
    community.map((element,index)=>(
      <Link key={index} to={`${element.link}`}
        className='text-sm text-richblack-600'>
        {element.title}
      </Link>
    ))
  }
</div>

</div>



</div>



</div>









<div className="h-[500px] w-[2%] border-richblack-500  border-l-2 mr-14"></div>


{/* right portion */}

<div className="flex  flex-col mt-[50px] lg:flex-row gap-[50px] w-[40%] justify-between">

{/* Subjects */}

<div className="flex flex-col gap-2">
<h1 className='text-richblack-300 font-semibold'>Subjects</h1>

<div className='flex gap-2 flex-col'>
{
  Subjects.map((element,index)=>(
    <Link key={index} to={`${element.link}`}
      className='text-sm text-richblack-600 '>
        <p>{element.title}</p>
           </Link>

  ))
}
</div>

</div>


{/* Language */}

<div className="flex flex-col gap-2">
<h1 className='text-richblack-300 font-semibold'>Languages</h1>
<div className='flex gap-2 flex-col'>
{
  Languages.map((element,index)=>(
   
    <Link key={index} to={`${element.link}`}
      className='text-sm text-richblack-600'>
        <p>{element.title}</p>
           </Link>

  ))
}
</div>
</div>

{/* Career Building */}

<div className="flex flex-col gap-2">
<h1 className='text-richblack-300 font-semibold'>Carrer Buildings</h1>
<div  className='flex gap-2 flex-col'>
{
 Career.map((element,index)=>(
  <Link key={index} to={`${element.link}`}
    className='text-sm text-richblack-600'>
        <p>{element.title}</p>
           </Link>
 ))

}
</div>
</div>


</div>






  </div>



    </div>
  )
}

export default Footer
