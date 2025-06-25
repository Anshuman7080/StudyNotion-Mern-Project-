import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageDetail } from '../services/operations/pageAndComponentData';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Course_Card from '../components/core/Catalog/Course_Card';
const Catalog = () => {

    const {catalogName}=useParams();
    const [catalogPageData,setCatalogPageData]=useState(null);
const [categoryId,setCategoryId]=useState("");

  const [loading, setLoading] = useState(false)
  const [mostPopular ,setMostPopular]=useState(true)
// fetch all categries

useEffect(()=>{
    const getCategoies=async()=>{
        const res=await apiConnector("GET",categories.CATEGORIES_API);
      
        const category_id = 
            res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName.split(" ").join("-").toLowerCase())[0]._id;

            setCategoryId(category_id);
    }
    getCategoies();
},[catalogName]);

 useEffect(() => {
        const getCategoryDetails = async() => {
            setLoading(true)
            try{
                const res = await getCatalogPageDetail(categoryId);
               
                if (res.success) {
                    setCatalogPageData(res);
                }
                else{
                    setCatalogPageData(null)
                }
                setLoading(false)
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId])

//     console.log("catalog page data frontend....->", catalogPageData)
// console.log("name is", catalogPageData?.selectedCourses?.name)
// console.log("description is ", catalogPageData?.selectedCourses?.description )

  return (
    <div className='text-white flex flex-col '>
 
<div className="bg-richblack-800 p-6 flex flex-col gap-4 ">
    <p className="text-sm flex gap-2 text-richblack-400"> {` Home / Catalog / `}
    <span className="text-md text-yellow-300 font-semibold">
  {catalogPageData?.selectedCourses?.name}
    </span>
    </p>
    <p className="text-richblack-50 font-extrabold">{catalogPageData?.selectedCourses?.name} </p>
    <p className="text-sm  text-richblack-400" > {catalogPageData?.selectedCourses?.description}</p>
</div>

<div className="mt-7 w-11/12 flex flex-col mx-auto">
    {/* section 1 */}
    <div className="pt-2 ">
    <div className='text-lg  text-richblack-25 font-bold px-5 '>Courses to get you started</div>
        <div className='flex gap-x-3 px-5  '>
            <p onClick={()=>{setMostPopular(true)}} 
            className={mostPopular ? (" text-yellow-200 text-sm cursor-pointer  "): (" text-richblack-100 text-sm cursor-pointer ")  }>Most Popular</p>
            <p onClick={()=>{setMostPopular(false)}}
                className={!mostPopular ? (" text-yellow-200 text-sm cursor-pointer  "): (" text-richblack-100 text-sm cursor-pointer ")  }>New</p>
        </div>
        <div className='bg-richblack-700 w-full py-[1px] mb-1'></div>

      <div className="mt-5">
      
          <CourseSlider Courses={catalogPageData?.selectedCourses?.courses}/>
      </div>
    </div>


    {/* section 2 */}
    <div className='mt-5' >
        <div className='text-lg  text-richblack-25 font-bold px-5 ' >Top Courses in {catalogPageData?.selectedCourses?.name}</div>
        <div className='mt-5'>
            <CourseSlider Courses={catalogPageData?.selectedCourses
?.courses}/>
        </div>

    </div>

    {/* section 3 */}

    <div  className='mt-5' >
        <div className='text-lg  text-richblack-25 font-bold px-5 '>Frequently Bought </div>
    <div className='py-8'>
        <div className='grid gap-2  grid-cols-1 lg:grid-cols-2'>
                {
                                catalogPageData?.mostSellingCourses.length === 0 ? (<p className=' text-xl text-white'>No Most selling courses</p>) : (catalogPageData?.mostSellingCourses?.slice(0,8)
                                .map((course, index) => (
                                    <Course_Card course={course} key={index} Height={"h-[250px]"}/>
                                )))
                            }
        </div>
    </div>

    </div>
</div>

<Footer/>
    </div>
  )
}

export default Catalog
