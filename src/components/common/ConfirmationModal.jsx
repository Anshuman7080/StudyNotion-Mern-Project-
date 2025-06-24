import React from 'react';
import IconBtn from './IconBtn';

const ConfirmationModal = ({ modalData }) => {

  return (
    <div className="fixed top-0 left-0  w-full  h-full flex items-center 
    justify-center backdrop-blur-sm bg-black bg-opacity-50 z-50">
      
      <div className="text-white bg-richblack-500  rounded-lg px-6 py-4">
        <div className="flex flex-col gap-4">
          <p className="text-lg font-bold">{modalData.text1}</p>
          <p className="text-sm text-richblack-300">{modalData.text2}</p>
          <div className="flex gap-4">
            <IconBtn
              onclick={modalData?.btn1Handler}
              text={modalData?.btn1Text}
            />
            <button
              onClick={modalData?.btn2Handler}
              className="px-8 py-2 bg-richblack-600 text-center rounded-lg text-[13px] font-bold text-richblack-200 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]"
            >
              {modalData?.btn2Text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
