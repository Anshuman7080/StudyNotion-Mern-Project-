

import React from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { useState } from 'react';
import { FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowForward } from "react-icons/io";
import toast from 'react-hot-toast';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import NestedView from './NestedView';
import { updateSection, createSection } from '../../../../../services/operations/courseDetailsAPI';

const CourseBuilderForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  console.log("course is",course);
  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  }

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }
 const goToNext = () => {

    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section")
      return
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section")
      return
    }
    dispatch(setStep(3))
  }

  const onSubmit = async (data) => {
    setLoading(true);
    let result;
    if (editSectionName) {
      result = await updateSection({
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId: course._id,
      }, token)
    } else {
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id,
      }, token)
    }
    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    setLoading(false);
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }

  return (
    <div className="text-white bg-richblack-800 rounded-lg p-4">
      <p className="text-lg font-bold text-richblack-50 mt-2">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}
      className='mb-5'>
        <div className=" mt-5">
         
          <input id="sectionName" placeholder='Add a section to build your course ' {...register("sectionName", { required: true })} 
          className="w-full py-1.5 rounded-md px-2 bg-richblack-700 text-black" />
          {errors.sectionName && (
            <span className='text-white'>Section Name is Required</span>
          )}
        </div>
        <div className=' mt-5 relative flex gap-3'>
          <IconBtn type="submit" text={editSectionName ? "Edit Section Name" : "Create Section"} outline={true} >
            <FaPlusCircle  className='absolute left-3 top-2.5'/>
          </IconBtn>
          
          {editSectionName && (
            <button type="button" onClick={cancelEdit} className='text-sm text-richblack-300 underline'>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className="flex justify-end gap-x-3 pt-5">
        <button onClick={goBack} className={`px-8 py-2 text-center rounded-lg text-[13px] font-bold bg-richblack-700 text-richblack-200 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
           `}>
          Back
        </button>
         <div className="relative">
          <IconBtn disabled={loading} text="Next" onclick={goToNext}>
           <IoIosArrowForward className="absolute top-2.5 right-4" />
        </IconBtn>
         </div>
      </div>
    </div>
  )
}

export default CourseBuilderForm;


