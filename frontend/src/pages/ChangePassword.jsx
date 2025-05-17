import React, { useState } from 'react';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }
    // API call logic here
  };

  return (
    <div className="max-w-md mx-auto">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg dark:bg-green-900/30 dark:border-green-800 dark:text-green-400">
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:focus:ring-blue-400"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:focus:ring-blue-400"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-150 ease-in-out"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;