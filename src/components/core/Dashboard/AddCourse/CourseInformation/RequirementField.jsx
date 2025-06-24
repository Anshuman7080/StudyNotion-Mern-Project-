import React, { useState,useEffect } from 'react'

const RequirementField = ({name,label ,register,errors,setValue,getValues}) => {

    const [requirement,setRequirement] =useState("");
    const [requirementList,setReuirementList]=useState([]);

useEffect(()=>{
    register(name,{
        required:true,
        validate:(value)=>value.length>0
    })
},[]);

useEffect(()=>{
    setValue(name,requirementList)
},[requirementList]);

 const handleAddRequirement=()=>{
    if(requirement){
        setReuirementList([...requirementList,requirement]);
        setRequirement("");
    }
 }

 const handleRemoveRequirement=(index)=>{
    const updateRequirementList=[...requirementList];
    updateRequirementList.splice(index,1);
    setReuirementList(updateRequirementList);
      
 }



  return (
    <div>
    <label htmlFor={name}
    className='text-sm text-richblack-25'>{label}<sup className='text-pink-500'>*</sup></label>
    <div>
        <input
            type="text"
            id={name}
            value={requirement}

            onChange={(e)=>setRequirement(e.target.value)}
   className="w-full  bg-richblack-700 py-1 rounded-md px-3 outline-none"
        />
        <button
        type="button"
        onClick={handleAddRequirement}
        className='font-semibold text-yellow-50'>
        Add
        </button>
    </div>

    {
        requirementList.length > 0 && (
             <ul>
                {
                    requirementList.map((requirement,index)=>(
                        <li key={index} 
                        className='flex items-center text-richblack-5 gap-2'>
                            <span className='text-sm '>{requirement}</span>
                            <button
                            type="button"
                            onClick={()=>handleRemoveRequirement(index)}
                            className='text-xs text-pure-greys-300'>
                                clear
                            </button>
                        </li>
                    ))
                }
             </ul>
        )
    }
    {
        errors[name] && (
            <span>{label} is required</span>
        )
    }
      
    </div>
  )
}

export default RequirementField
