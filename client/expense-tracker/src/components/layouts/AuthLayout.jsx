import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen items-center justify-center px-4 bg-white text-gray-900">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-violet-600 mb-1">Expense Tracker</h2>
        <p className="text-sm text-gray-500 mb-6">Track. Save. Grow.</p>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
