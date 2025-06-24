import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { useRef } from 'react';

const ViewCourse = () => {
    const [reviewModal, setReviewModal] = useState(false)
    const {courseId} = useParams();
    const {token} = useSelector((state)=> state.auth);
    const dispatch = useDispatch();
    const location = useLocation()
    const {courseSectionData, courseEntireData, completedLectures} = useSelector((state)=>state.viewCourse);

      const [isSidebarOpen, setSidebarOpen] = useState(false);
      const ref=useRef(null);
      useOnClickOutside(ref, ()=>{setSidebarOpen(false)});

    // useEffect(() => {
    //     dispatch(setCourseSectionData([]));
        
    //     dispatch(setEntireCourseData([]));
        
    //     dispatch(setCompletedLectures(0))
        
    // }, [])
    

    useEffect(() => {
    const setCourseSpecificDetails = async () => {
        // console.log("In video details page", courseId)
        const courseData = await getFullDetailsOfCourse(courseId, token);
        dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
        
        dispatch(setEntireCourseData(courseData.courseDetails));
        
        dispatch(setCompletedLectures(courseData.completedVideos));
        
        let lectures = 0;
        courseData.courseDetails.courseContent.forEach((sec) => {
            lectures += sec.subSection.length
        } )
        dispatch(setTotalNoOfLectures(lectures))
    }
    
    setCourseSpecificDetails()
    },[courseId])
    
  return (
    <>
        <div className="relative flex min-h-[calc(100vh-3.5rem)] w-full">
        
        <button
        className="md:hidden absolute top-2 right-4 z-50 text-3xl text-white"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        &#9776;
      </button>


 <div
        className={`fixed md:static top-14 left-0 h-full z-40  transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:block`}
        
        ref={ref}

      >
    
            <VideoDetailsSidebar setReviewModal={setReviewModal} />


</div>
            

            <div className="h-[calc(100vh-3.5rem)] mx-auto overflow-auto w-full md:w-[90%] py-2 px-4">

             

                <Outlet />

                
            </div>
            {reviewModal && (<CourseReviewModal setReviewModal={setReviewModal} />)}
        </div>
        
    </>
  )
}

export default ViewCourse