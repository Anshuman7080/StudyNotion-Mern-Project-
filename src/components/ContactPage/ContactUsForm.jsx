import React, { useEffect, useState } from 'react';
import CountryCode from "../../data/countrycode.json";
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';
import toast from 'react-hot-toast';

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneNo: "",
                countrycode: "",
            });
        }
    }, [reset, isSubmitSuccessful]);

    const submitContactForm = async (data) => {
        console.log("Logging data", data);
        try {
            setLoading(true);
            // Uncomment when you have API setup
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            const response = { status: "OK" }; // Placeholder for testing
            console.log("Logging response", response);
            
            setLoading(false);
            toast.success("We will contact you Soon");
        } catch (error) {
            console.log("Error", error.message);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(submitContactForm)}>
            <div className="flex flex-col gap-3  max-w-[500px] w-[400px] min-h-[430px]">
                {/* First Name */}
                <div className="flex flex-col lg:flex-row  gap-5 ">
                    <div className="flex flex-col gap-1 lg:w-[48%]">
                        <label htmlFor="firstName"
                        className="text-richblack-700 font-sm text-[12px]">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Enter first name"
                            {...register("firstName", { required: true })}
                            className='px-4 bg-richblack-700 rounded-md outline-none py-1
                            shadow-sm'
                        />
                        {errors.firstName && <span className="text-[10px] text-pink-600 ">Please enter your first name</span>}
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col gap-1 lg:w-[48%]">
                        <label htmlFor="lastName"
                          className="text-richblack-700 font-sm text-[12px]">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Enter last name"
                            {...register("lastName")}
                             className='px-4 bg-richblack-700 rounded-md outline-none py-1'
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1 ">
                    <label htmlFor="email"
                     className="text-richblack-700 font-sm text-[12px]">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter email address"
                        {...register("email", { required: true })}
                         className='px-4 bg-richblack-700 rounded-md outline-none py-1'
                    />
                    {errors.email && <span className="text-[10px] text-pink-600 ">Please enter your email address</span>}
                </div>

                {/* Phone Number */}
                <div className="flex  flex-col gap-1">
                    <label htmlFor="phonenumber"
                      className="text-richblack-700 font-sm text-[12px]">Phone Number</label>
                    <div className="flex flex-row gap-14 items-center  w-[81px]">
                        {/* Dropdown */}
                        <div className="w-5">
                            <select
                                name="countrycode"
                                id="dropdown"
                                className='bg-richblack-700 text-black w-14 py-1  rounded-md gap-2'
                                {...register("countrycode", { required: true })}
                            >
                                {CountryCode.map((element, index) => (
                                    <option key={index} value={element.code}>
                                        {element.code}-{element.country}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="w-[calc(100%-90px)] ">
                            <input
                                type="number"
                                name="phoneNo"
                                id="phonenumber"
                                placeholder="1234567890"
                                {...register("phoneNo", {
                                    required: { value: true, message: "Please enter your phone number" },
                                    maxLength: { value: 10, message: "Invalid phone number" },
                                    minLength: { value: 8, message: "Invalid phone number" }
                                })}
                                className='px-4 bg-richblack-700 rounded-md outline-none py-1'
                            />
                        </div>
                    </div>
                    {errors.phoneNo && <span className="text-[10px] text-pink-600 ">{errors.phoneNo.message}</span>}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="message"
                      className="text-richblack-700 font-sm text-[12px]">Message</label>
                    <textarea
                        name="message"
                        id="message"
                        cols="30"
                        rows="7"
                        placeholder="Enter your message here"
                        {...register("message", { required: true })}
                        className="bg-richblack-700 rounded-md  px-2 py-2"
                    />
                    {errors.message && <span className="text-[10px] text-pink-600 ">Please enter your message</span>}
                </div>

                <button type='submit'
            className='rounded-md bg-yellow-50 px-6 py-2 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         transition-all duration-200 hover:scale-95 hover:shadow-none  disabled:bg-richblack-500 sm:text-[16px] '>
                    Send Message
            </button>
            </div>
        </form>
    );
};

export default ContactUsForm;
