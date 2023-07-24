import { useState } from 'react';

import { Outlet, Route, Routes } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
//
import AuthUser from '../AuthUser';
import Header from './header';
import Nav from './nav';
import DashboardAppPage from '../../pages/DashboardAppPage';
import UserPage from '../../pages/UserPage';
import ProductsPage from '../../pages/ProductsPage';
import BlogPage from '../../pages/BlogPage';
import Page404 from '../../pages/Page404';


// ----------------------------------------------------------------------

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const { token, logout } = AuthUser();

  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  };
  return (
    <>
      <StyledRoot>
        <Header onOpenNav={() => setOpen(true)} />

        <Nav openNav={open} onCloseNav={() => setOpen(false)} />

        <Outlet />

        <Routes>
          <Route exact path="/" element={<DashboardAppPage />} />
          <Route exact path="/user" element={<UserPage />} />
          <Route exact path="/products" element={<ProductsPage />} />
          <Route exact path="/blog" element={<BlogPage />} />
          <Route exact path="*" element={<Page404 />} />
        </Routes>
      </StyledRoot>
    </>
  );
}
