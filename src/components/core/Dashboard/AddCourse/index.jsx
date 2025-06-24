
import RenderSteps from "./RenderSteps"

export default function  AddCourse(){
    return (
        <div className="w-11/12 flex items-center lg:mx-0 justify-center">

<div className="text-white flex flex-col  lg:flex-row w-full gap-8 justify-center  ">
         <div className="max-w-[100%] w-[600px]">
             <h1 className=" text-lg font-bold -my-1 pb-3">Add Course</h1>
             <RenderSteps/>
         </div>
         
         <div className="w-[400px] hidden lg:block max-w-[45%]   pr-3    min-h-[390px] ">
           <div className="bg-richblack-800 py-5 rounded-lg">
               <p className="px-5  text-lg font-bold">Code Upload Tips</p>
             <ul className="text-sm gap-2 flex flex-col">
                 <li className="px-5">Set the Course Price option or make it free.</li>
                 <li  className="px-5">Standard size for the course thumbnail is 1024x576.</li>
                 <li  className="px-5">Video section controls the course overview video.</li>
                 <li  className="px-5">Course Builder is where you create & organize a course.</li>
                 <li  className=" px-5">Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                 <li className="px-5">Information from the Additional Data section shows up on the course single page.</li>
                 <li className="px-5">Make Announcements to notify any important</li>
                 <li className="px-5">Notes to all enrolled students at once.</li>
             </ul>

</div>
         </div>

        </div>
       
 
     </div>
    )
}