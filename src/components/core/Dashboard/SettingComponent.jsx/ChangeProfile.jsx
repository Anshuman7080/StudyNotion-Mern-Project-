import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CountryCode from "../../../../data/countrycode.json";
import IconBtn from '../../../common/IconBtn';
import { updateProfileDetails } from '../../../../services/operations/settingAPI';

const ChangeProfile = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    console.log('user is ',user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const formHandler = (data) => {
      console.log("updated profile data is ",data);
        dispatch(updateProfileDetails(data, token, dispatch));
    };

    return (
        <div className="text-white w-11/12 ">
            <div className=' w-full md:w-[80%] max-w-[800px] mx-auto bg-richblack-800 flex flex-col gap-4 py-2 rounded-lg px-6'>
                <p className='text-richblack-5 font-bold text-xl pt-2  '>Profile Information</p>

                
                 <div className=''>

            <form onSubmit={handleSubmit(formHandler)}
            className='flex flex-col gap-5
            mx-auto lg:mx-0'>
                        {/* First Section */}
                     
                      <div className=' flex flex-col  gap-10 md:flex-row ' >

                      <div className='flex flex-col gap-1  lg:w-[45%] ' >
                            <label htmlFor="Name"
                            className='pb-0.5 text-sm text-richblack-50'>Display Name</label>
                            <input
                                type="text"
                                name="Name"
                                id="Name"
                                placeholder="*******"
                              className='py-1 outline-none  bg-richblack-700 px-2 rounded-lg w-full lg:max-w-[300px]'
                                {...register("Name", { required: "Name is required" })}
                            />
                            {errors.Name && <span
                             className='text-sm text-richblack-600'>{errors.Name.message}</span>}
                        </div>

                        <div className="text-richblack-600 flex flex-col gap-1  lg:w-[45%] ">
                            <label htmlFor="profession"
                            className='pb-0.5 text-sm text-richblack-50'>Profession</label>
                            <select
                                id="profession"
                                {...register("profession", { required: "Profession is required" })}
                                   className='py-1 outline-none  bg-richblack-700 px-2 rounded-lg  lg:max-w-[300px] text-richblack-5'
                            >
                                <option value="">Select a profession</option>
                                <option value="Developer">Developer</option>
                                <option value="Student">Student</option>
                                <option value="Admin">Admin</option>
                            </select>
                            {errors.profession && <span
                            className='text-sm'>{errors.profession.message}</span>}
                        </div>

                      </div>

                      

                        {/* Second Section */}
                       <div className=' flex flex-col  gap-10  md:flex-row'>

                       <div className='flex flex-col gap-1  lg:w-[45%] ' >
                            <label htmlFor="DOB"
                            className='pb-0.5 text-sm text-richblack-50'>Date of Birth</label>
                            <input
                                type="date"
                                name="DOB"
                                id="DOB"
                                placeholder="dd/mm/yyyy"
                               className='py-1 outline-none  bg-richblack-700 px-2 rounded-lg w-full lg:max-w-[300px]'
                                {...register("DOB", { required: "Date of Birth is required" })}
                            />
                            {errors.DOB && <span
                             className='text-sm text-richblack-600'>{errors.DOB.message}</span>}
                        </div>

                        <div className='flex flex-col gap-1  lg:w-[45%] '>
                            <p   className='pb-0.5 text-sm text-richblack-50'>Gender</p>
                           <div className='flex flex-row gap-8 justify-evenly py-1 bg-richblack-700 px-2 rounded-lg  lg:max-w-[300px]'>
                           <label htmlFor="Male">
                                <input
                                    type="radio"
                                    name="Gender"
                                    value="Male"
                                    id="Male"
                                    
                                    {...register("Gender", { required: "Gender is required" })}
                                />
                                Male
                            </label>
                            <label htmlFor="Female">
                                <input
                                    type="radio"
                                    name="Gender"
                                    value="Female"
                                    id="Female"
                                    {...register("Gender", { required: "Gender is required" })}
                                />
                                Female
                            </label>
                            <label htmlFor="Others">
                                <input
                                    type="radio"
                                    name="Gender"
                                    value="Others"
                                    id="Others"
                                    {...register("Gender", { required: "Gender is required" })}
                                />
                                Others
                            </label>
                          
                           </div>
                        </div>

                       </div>

                        {/* Third Section */}

                        <div  className=' flex flex-col  gap-10  md:flex-row'>
                        <div className='flex flex-col gap-1  lg:w-[45%] '>
                            <label htmlFor="contactNumber"
                            className='pb-0.5 text-sm text-richblack-50'>Phone Number</label>
                            <div className="flex flex-row gap-10 items-center w-[81px]">
                                {/* Dropdown */}
                                <div className="w-5">
                                    <select
                                        id="dropdown"
                                        className="bg-richblack-700 text-black w-14 py-1 rounded-md gap-2"
                                        {...register("countrycode", { required: "Country code is required" })}
                                    >
                                        {CountryCode.map((element, index) => (
                                            <option key={index} value={element.code}>
                                                {element.code} - {element.country}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div  className=" w-[calc(100%-90px)]">
                                    <input
                                        type="number"
                                        name="contactNumber"
                                        id="contactNumber"
                                        placeholder="1234567890"
                                        {...register("contactNumber", {
                                            required: "Phone number is required",
                                            maxLength: {
                                                value: 10,
                                                message: "Phone number must be 10 digits",
                                            },
                                            minLength: {
                                                value: 8,
                                                message: "Phone number must be at least 8 digits",
                                            },
                                        })}
                                        className="px-4 bg-richblack-700  lg:max-w-[200px] rounded-md outline-none py-1"
                                    />
                                </div>
                            </div>
                            {errors.phoneNo && <span>{errors.contactNumber.message}</span>}
                        </div>

                        <div className='flex flex-col gap-1   lg:w-[45%] ' >
                            <label htmlFor="About"
                             className='pb-0.5 text-sm text-richblack-50'>About</label>
                            <input
                                type="text"
                                name="About"
                                id="About"
                                placeholder="Write about yourself"
                                 className='py-1 outline-none  bg-richblack-700 px-2 rounded-lg max-w-[300px]'
                                {...register("About", { required: "About section is required" })}
                            />
                            {errors.About && <span
                             className='text-sm text-richblack-600'>{errors.About.message}</span>}
                        </div>
                        </div>



                       <div className=' flex flex-row gap-5  pb-3 '>
                       <button
                            type="button"
                            onClick={() => {
                                navigate("/dashboard/my-profile");
                            }}
                             className="px-8 py-2 text-center rounded-lg text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
           bg-richblack-700"
                        >
                            Cancel
                        </button>

                        <IconBtn type="submit" text="Update" />
                       </div>
                    </form>
</div>
               
            </div>
        </div>
    );
};

export default ChangeProfile;
