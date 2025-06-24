import React from 'react';
import { AiTwotoneDelete } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount } from '../../../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onClickHandler = () => {
        if (user?.additionalDetails?._id) {
            dispatch(deleteAccount(user.additionalDetails._id, token, navigate));
        } else {
            console.error("User ID is missing.");
        }
    };

    return (
        <div className="text-white w-11/12 ">
            <div className=' w-full md:w-[80%] max-w-[800px] mx-auto  px-4 flex  gap-1 py-3 bg-pink-900 rounded-xl'>
                <div className=' my-auto  flex items-center justify-center w-[20%]'>
                    <AiTwotoneDelete fontSize={38}
                    color="pink" />
                </div>
                <div className=' flex flex-col   gap-2 w-[65%]'>
                <p className='text-richblack-5 font-bold text-xl pt-2'>Delete Account</p>
                    <p className='text-sm '>Would you like to delete your account?</p>
                    <p className='text-sm w-full'>
                        This account contains Paid Courses. Deleting your account will remove all
                        the content associated with it.
                    </p>
                    <button onClick={onClickHandler}
                    className='text-sm  text-pink-400 items-start flex'>I want to delete my account.

                    </button>

                </div>
            </div>
        </div>
    );
};

export default DeleteAccount;
