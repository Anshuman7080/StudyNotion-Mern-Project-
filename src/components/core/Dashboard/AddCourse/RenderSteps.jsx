import React from 'react';
import { useSelector } from 'react-redux';
import { FaCheck } from 'react-icons/fa';
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import PublishCourse from './PublishCourse';
const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);
 
  const steps = [
    { id: 1, title: 'Course Information' },
    { id: 2, title: 'Course Builder' },
    { id: 3, title: 'Publish' },
  ];


  return (
    <div className=' flex flex-col  gap-5 '>

      <div >

      <div className='grid grid-cols-3 grid-rows-1 ' >
        {steps.map((item) => (
          <div key={item.id} className='mx-auto '>
            <div
              className={`${ 
                step === item.id
                  ? 'bg-yellow-800 px-2 aspect-square rounded-full border-yellow-100  text-yellow-50 '
                  : 'border-richblack-700  px-2  bg-richblack-800  text-richblack-300 aspect-square rounded-full'
              }`}
            >
              {step > item.id ? <FaCheck /> : item.id}
            </div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-3 grid-rows-1'>
        {steps.map((item) => (
          <div key={item.id} className='mx-auto py-2'>
            <p>{item.title}</p>
          </div>
        ))}
      </div>

      </div>


      {step === 1 && <CourseInformationForm />}
     
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse/>}
    </div>
  );
};

export default RenderSteps;
