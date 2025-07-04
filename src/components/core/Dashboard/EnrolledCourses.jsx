import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [enrolledCourses, setEnrolledCourses] = useState([]); 
    

    const getEnrolledCourses = async () => {
  
        try {
            const response = await getUserEnrolledCourses(token);
       
            if (response && Array.isArray(response)) {
                
                setEnrolledCourses(response);
            } else {
                setEnrolledCourses([]);
            }
        } catch (error) {
            console.error("Error fetching enrolled courses:", error);
            setEnrolledCourses([]); // Handle error gracefully
        }
    };

    useEffect(() => {
        getEnrolledCourses();
    }, []);
     
    console.log("enrolled courses are", enrolledCourses);

    return (
        <>
            <div className="text-3xl text-richblack-50">Enrolled Courses</div>
            {enrolledCourses?.length === 0 ? (
                <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
                    You have not enrolled in any course yet.
                </p>
            ) : (
                <div className="my-8 text-richblack-5">
                    {/* Headings */}
                    <div className="flex rounded-t-lg bg-richblack-500 ">
                        <p className="w-[45%] px-5 py-3">Course Name</p>
                        <p className="w-1/4 px-2 py-3">Duration</p>
                        <p className="flex-1 px-2 py-3">Progress</p>
                    </div>
                    {/* Course List */}
                    {enrolledCourses.map((course, i) => (
                        <div
                            className={`flex items-center border border-richblack-700 ${
                                i === enrolledCourses?.length - 1 ? "rounded-b-lg" : ""
                            }`}
                            key={course._id}
                        >
                            <div
                                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                                onClick={() =>
                                    navigate(
                                        `/view-course/${course._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                    )
                                }
                            >
                                <img
                                    src={course.thumbnail}
                                    alt="course_img"
                                    className="h-14 w-14 rounded-lg object-cover"
                                />
                                <div className="flex max-w-xs flex-col gap-2">
                                    <p className="font-semibold">{course.courseName}</p>
                                    <p className="text-xs text-richblack-300">
                                        {course.description?.length > 50
                                            ? `${course.description.slice(0, 50)}...`
                                            : course.description}
                                    </p>
                                </div>
                            </div>
                            <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
                            <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                                <p>Progress: {course.progressPercentage || 0}%</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default EnrolledCourses;
