import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/core/Dashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import useOnClickOutside from '../hooks/useOnClickOutside';
import ConfirmationModal from '../components/common/ConfirmationModal';
const Dashboard = () => {

  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const ref=useRef(null);
  useOnClickOutside(ref, ()=>{setSidebarOpen(false)});
  const [confirmationModal, setConfirmationModal] = useState(null);


  if (profileLoading || authLoading) {
    return <div className="spinner mt-10">Loading...</div>;
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] w-full">
      
      {/* Hamburger icon (visible only on small screens) */}

      <button
        className="md:hidden absolute top-2 left-4 z-50 text-3xl text-white"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        &#9776;
      </button>

      {/* Sidebar - responsive behavior */}
      <div
        className={`fixed md:static top-14 left-0 h-full z-40  transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:block`}
        
        ref={ref}

      >
        <Sidebar
        confirmationModal={confirmationModal}
        setConfirmationModal={setConfirmationModal} />
      </div>

      {/* Main content area */}
      <div className="h-[calc(100vh-3.5rem)] mx-auto overflow-auto w-full md:w-[80%] py-10 px-4">
        <Outlet />
      </div>

      

       {/* Confirmation Modal */}
            {confirmationModal && (
                <ConfirmationModal modalData={confirmationModal} />
            )}
            
    </div>
  );
};

export default Dashboard;
