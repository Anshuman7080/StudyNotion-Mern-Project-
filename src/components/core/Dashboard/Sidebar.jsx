import React from 'react';
import { RxGear } from "react-icons/rx";
import { sidebarLinks } from '../../../data/dashboard-links';
import { logout } from '../../../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import SidebarLink from './SidebarLink';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../../common/ConfirmationModal';

const Sidebar = ({confirmationModal,setConfirmationModal}) => {
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  

   

    console.log("confirmational modal",confirmationModal);
    // Handle loading state
    if (profileLoading || authLoading) {
        return <div className="spinner">Loading...</div>;
    }

    return (
        <div className="text-white">
            {/* Sidebar Container */}
            <div className="flex min-w-[222px] flex-col border border-r-[1px] border-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10">
                <div className="flex flex-col">
                    {/* Render sidebar links dynamically */}
                    {sidebarLinks.map((link, index) => {
                        if (link.type && user?.accountType !== link.type) return null; // Render link based on user account type
                        return (
                            <SidebarLink key={link.id} link={link} iconName={link.icon} />
                        );
                    })}
                </div>

                {/* Divider */}
                <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600"></div>

                {/* Settings and Logout */}
                <div className="flex flex-col">
                    <SidebarLink
                        link={{ name: "Settings", path: "dashboard/settings" }}
                        iconName="VscSettingsGear"
                    />

                    {/* Logout Button */}
                    <button
                        onClick={() =>
                            setConfirmationModal({
                                text1: "Are you Sure?",
                                text2: "You will be logged out of your account",
                                btn1Text: "Logout",
                                btn2Text: "Cancel",
                                btn1Handler: () => dispatch(logout(navigate)),
                                btn2Handler: () => setConfirmationModal(null),
                            })
                        }
                        className="text-sm font-medium text-richblack-300"
                    >
                        <div className="flex items-center mx-8 mt-1 gap-x-2 text-richblack-5">
                            <VscSignOut className="text-lg" />
                            <span>LogOut</span>
                        </div>
                    </button>
                </div>
            </div>


         
        </div>
    );
};

export default Sidebar;
