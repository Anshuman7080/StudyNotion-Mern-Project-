const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");




exports.updateCourseProgress=async (req , res)=>{

    const {courseId,subSectionId}=req.body;
    const userId=req.user.id;

try{
    const subSection=await SubSection.findById(subSectionId);

    if(!subSection){
        return res.status(400).json({error:"Invalid subSection"})
    }

    // check for old entry
    let courseProgress=await CourseProgress.findOne({
        courseId:courseId,
        userId:userId,
    });

    if(!courseProgress){
        return res.status(404).json({
            success:false,
            message:"Course progress does not exist"
        })
    }else{
        // check for re-completing video /subsection
        if(courseProgress.completedVideos.includes(subSectionId)){
            return res.status(400).json({
                error:"SubSection already completed",
            })
        }
        // push into completed videos
        courseProgress.completedVideos.push(subSectionId);

    }

    await  courseProgress.save();
    return res.status(200).json({
        success:true,
        message:"Course progress updated successfully",
    })

}
catch(error){
console.error(error);
return res.status(400).json({error:"Internal server Error"});
}


}