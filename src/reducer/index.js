import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/profileSlice';
import cartReducer from '../slices/cartSlice';
import courseReducer from "../slices/courseSlice"
import viewCourseReducer from "../slices/viewCourseSlice"
const rootReducer = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
    viewCourse:viewCourseReducer,

});

export default rootReducer;

//........................combineReducers....................
//  combineReducers is a function from Redux Toolkit that helps you
//  organize multiple reducers into one big root reducer.
//In Redux, the state of your application is managed by reducers. 
// But in a large app, you usually have multiple reducers, each handling
// different parts of the state (like authentication, user profile, cart, courses, etc.).
// Instead of manually merging them, combineReducers helps combine them into one object.