const express = require('express');
const router = express.Router();

const {auth, isStudent, isInstructor} = require('../middlewares/auth');

const {
    deleteAccount, 
    updateProfile,
    getAllUserDetails,
    updateDisplayPicture,
    getEnrolledCourses,
    instructorDashborad
} = require('../controllers/Profile');

//  Profile routes

//Delete User Account
router.delete('/deleteProfile', auth, deleteAccount);
router.put('/updateProfile', auth, updateProfile);
router.get('/getUserDetails', auth, getAllUserDetails);
router.get("/instructorDashboard", auth, isInstructor, instructorDashborad)
//Get Enrolled Courses
router.get('/getEnrolledCourses', auth, getEnrolledCourses);
router.put('/updateDisplayPicture', auth, updateDisplayPicture);

module.exports = router;