import React from 'react';
import ContactUsForm from '../components/ContactPage/ContactUsForm';
import Footer from '../components/common/Footer';
import ReviewSlider from '../components/common/ReviewSlider';

const ContactUs = () => {
  return (
    <div className="text-white">
      {/* Section 1 */}
      <section className="flex flex-col w-11/12 lg:flex-row mx-auto justify-center items-center mt-16">
        <div className="flex flex-col gap-8 justify-center lg:flex-row gap-x-48">
          {/* Left Side */}
          <div className="bg-richblack-700 max-w-[400px] mx-auto rounded-lg px-7 h-80 pt-6 flex flex-col gap-5 lg:-ml-60">
            <div className="flex flex-col gap-1">
              <p className="font-bold text-md">Chat on Us</p>
              <p className="font-sm font-semibold text-[12px] text-richblack-400">
                Our friendly team is here to help.
              </p>
              <p className="font-sm font-semibold text-[12px] text-richblack-400">@mail address</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-bold text-md">Visit Us</p>
              <p className="font-sm font-semibold text-[12px] text-richblack-400">
                Come and say hello at our office HQ.
              </p>
              <p className="font-sm font-semibold text-[12px] text-richblack-400">Here is the location/address</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-bold text-md">Call us</p>
              <p className="font-sm font-semibold text-[12px] text-richblack-400">
                Mon - Fri From 8am to 5pm
              </p>
              <p className="font-sm font-semibold text-[12px] text-richblack-400">+123 456 7890</p>
            </div>
          </div>

          {/* Right Side */}
          <div className="lg:-mr-60 mx-auto flex flex-col gap-2 border border-richblue-300 items-center justify-center pb-4 pt-4 rounded-lg">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-richblack-100 text-xl text-start font-bold w-[80%]">
                Got a Idea? We’ve got the skills. Let’s team up
              </h1>
              <p className="text-[12px] text-richblack-400 text-start">
                Tell us more about yourself and what you’ve got in mind.
              </p>
            </div>
            <div className="mx-4">
              <ContactUsForm />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mt-36 flex flex-col gap-4 justify-center items-center">
        <h1>Review from Others</h1>
      </section>

      {/* Section 3 */}
      <div className="mt-[40px]">
      <ReviewSlider/> 
<Footer/>
</div>

    </div>
  );
};

export default ContactUs;
