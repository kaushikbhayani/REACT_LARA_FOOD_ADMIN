import React from 'react';
import AuthUser from './layouts/AuthUser';
import DashboardLayout from './layouts/dashboard/DashboardLayout';
import GuestLayout from './layouts/guest/GuestLayout';

function RouterProvider() {
  const { getToken } = AuthUser();

  if (!getToken()) {
    return <GuestLayout />;
  }
  return <DashboardLayout />;
}

export default RouterProvider;
