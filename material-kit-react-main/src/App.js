import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import ThemeProvider from './theme';
import RouterProvider from './RouterProvider';

import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <RouterProvider />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
