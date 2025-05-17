import React from 'react';
import { useParams } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import useAuthStore from '../stores/useAuthStore';
import Sidebar from '../components/Sidebar';
import SidebarFooter from '../components/SidebarFooter';

const Profile = () => {
  const { id } = useParams();
  const { user } = useAuthStore();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl px-6">
          {/* Profile Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Profile Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Profile Card - Single Column */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100 dark:border-neutral-700">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                Personal Information
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your basic profile information
              </p>
            </div>
            <ProfileDetails user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;