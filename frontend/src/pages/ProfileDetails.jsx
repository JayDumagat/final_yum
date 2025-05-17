import PropTypes from 'prop-types';
import { useState } from 'react';
import { User, Mail, UserCircle, Lock } from 'lucide-react';
import axios from 'axios';

const ProfileDetails = ({ user }) => {
  const [error, setError] = useState(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords don't match");
      return;
    }

    try {
      const response = await axios.put(`/api/users/${user.id}/change-password`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      if (response.status === 200) {
        setIsChangingPassword(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        // Show success message
        alert('Password updated successfully');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    }
  };

  // Add this after the email information card
  const passwordChangeForm = (
    <div className="flex items-center p-4 bg-gray-50 ">
      <Lock strokeWidth={1.5} className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-4" />
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Password</p>
        {isChangingPassword ? (
          <form onSubmit={handlePasswordChange} className="mt-2 space-y-3">
            <input
              type="password"
              placeholder="Current Password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-neutral-600 dark:bg-neutral-800"
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-neutral-600 dark:bg-neutral-800"
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-neutral-600 dark:bg-neutral-800"
              required
            />
            <div className="flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setIsChangingPassword(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsChangingPassword(true)}
            className="mt-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Change Password
          </button>
        )}
      </div>
    </div>
  );

  console.log('ProfileDetails user prop:', user);

  if (!user) {
    return <div className="p-4 text-red-500 bg-red-100 rounded-lg dark:bg-red-900/30">No user data available</div>;
  }

  try {
    return (
      <div className="max-w-lg mx-auto p-6 bg-white">
        {/* Profile Header with Avatar */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <UserCircle className="w-8 h-8 text-blue-500 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Profile Details</p>
          </div>
        </div>

        {/* Profile Information */}
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-gray-50 rounded-lg dark:bg-neutral-700/30">
            <User strokeWidth={1.5} className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-4" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Username</p>
              <p className="text-base font-semibold text-gray-900 dark:text-white">{user.username}</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-gray-50 rounded-lg dark:bg-neutral-700/30">
            <Mail strokeWidth={1.5} className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-4" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-base font-semibold text-gray-900 dark:text-white">{user.email}</p>
            </div>
          </div>

          {passwordChangeForm}
        </div>
      </div>
    );
  } catch (err) {
    setError(err.message);
    return <div className="p-4 text-red-500 bg-red-100 rounded-lg dark:bg-red-900/30">Error loading profile: {error}</div>;
  }
};

ProfileDetails.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string
  })
};

export default ProfileDetails;