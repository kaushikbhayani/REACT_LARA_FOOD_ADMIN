import { Outlet, Route, Routes } from 'react-router-dom';
// @mui

import { styled } from '@mui/material/styles';

import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import Page404 from '../../pages/Page404';

// ----------------------------------------------------------------------

const StyledHeader = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

// ----------------------------------------------------------------------

const GuestLayout = () => {
  return (
    <>
      <StyledHeader />

      <Outlet />
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};
export default GuestLayout;
