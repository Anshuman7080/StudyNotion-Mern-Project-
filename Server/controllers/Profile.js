const User = require('../models/User');
const Profile = require("../models/Profile");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");

const { convertSecondsToDuration } = require("../utils/secToDuration");exports.updateProfile = async (req, res) => {
    try {   
        //get data

        const {DOB='', About='', contactNumber, Gender=''} = req.body;
        //Find the profile by id
   const id=req.user.id;
        const user = await User.findById(id);
  
        const profile = await Profile.findById(user.additionalDetails);
       
     
        //update profile fields
        profile.dateOfBirth = DOB;
        profile.about = About;
        profile.contactNumber = contactNumber;
        profile.gender = Gender;

  
        //Save the updated profile
        await profile.save();

        //return response
        return res.status(200).json({
            success: true,
            message: 'Profile Updated Successfully',
            profile,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error in Updating Profile',
            error: error.message,
        });
    }
};

//delete Account

exports.deleteAccount = async (req, res) => {
 
    try {    
        //get id
       
        const userId = req.user.id
       
        //validation of id
        const userDetails = await User.findById(userId);
        console.log("userDetails is",userDetails);
        //delete profile
        if(!userDetails) {
            return res.status(404).send({
                success: false,
                message: 'User Not Found',
            });
        }
        //delete associated profile with user
        await Profile.findByIdAndDelete({_id: userDetails.additionalDetails});
        //TODO: HW unenroll user form all enroled courses
        //Now delete user
        await User.findByIdAndDelete({_id:userId});
        //return response
        return res.status(200).json({
            success: true,
            message: 'User Deleted Successfully',
        });

    } catch(error) {
        console.log(error);
        return res
            .status(500)
            .json({
            success: false,
            message: 'User Cannot Be Deleted',
            error: error.message,
        });
    }
}


exports.getAllUserDetails = async (req, res) => {
    try {
        //get id
        const id = req.user.id;
        
        //validation and get user details
        const userDetails = await User.findById(id)
            .populate('additionalDetails')
            .exec();
       
        //return response
        return res.status(200).json({
            success: true,
            message: 'User Data Fetched Successfully',
            data: userDetails,
        });
        
    } catch(error) {
        return res.status(501).json({
            success: false,
            message: error.message,
        });
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(image);
        const updatedProfile = await User.findByIdAndUpdate(
            {_id: userId},
            {image: image.secure_url},
            {new: true}
        )
        console.log("updated profile is",updatedProfile);
        const user=await User.findById({_id: userId});
        console.timeLog("user is ",user);

        console.log("user is ",user);
        res.send ({
            success: true,
            message: `Image Updated Successfully`,
            data: updatedProfile,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


 
exports.getEnrolledCourses = async (req, res) => {
  
    try {
      const userId = req.user.id
      let userDetails = await User.findOne({
        _id: userId,
      })
      .populate({
        path: "courses",
        populate: {
        path: "courseContent",
        populate: {
          path: "subSection",
        },
        },
      })
      .exec()

      userDetails = userDetails.toObject()
	  var SubsectionLength = 0
	  for (var i = 0; i < userDetails.courses.length; i++) {
		let totalDurationInSeconds = 0
		SubsectionLength = 0
		for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
		  totalDurationInSeconds += userDetails.courses[i].courseContent[
			j
		  ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
		  userDetails.courses[i].totalDuration = convertSecondsToDuration(
			totalDurationInSeconds
		  )
		  SubsectionLength +=
			userDetails.courses[i].courseContent[j].subSection.length
		}
		let courseProgressCount = await CourseProgress.findOne({
		  courseID: userDetails.courses[i]._id,
		  userId: userId,
		})
		courseProgressCount = courseProgressCount?.completedVideos.length
		if (SubsectionLength === 0) {
		  userDetails.courses[i].progressPercentage = 100
		} else {
		
		  const multiplier = Math.pow(10, 2)
		  userDetails.courses[i].progressPercentage =
			Math.round(
			  (courseProgressCount / SubsectionLength) * 100 * multiplier
			) / multiplier
		}
	  }

      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};


exports.instructorDashborad=async(req,res)=>{
  try{
const courseDetails = await Course.find({instructor:req.user.id});

const courseData=courseDetails.map((course)=>{
  const  totalStudentEnrolled=course.studentsEnrolled.length;
  const totalAmountGenerated = course.price * totalStudentEnrolled;

  // create a new object with the additional fields

  const courseDataWithStats={
    _id:course._id,
    courseName:course.courseName,
    courseDescription:course.courseDescription,
  totalStudentEnrolled,
    totalAmountGenerated,

  
  }
  return courseDataWithStats;


})

res.status(200).json({
  courses:courseData,
});

  }
  catch(error){
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Internal server error",
    })
  }
}