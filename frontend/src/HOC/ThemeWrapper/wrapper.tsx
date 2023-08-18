// ThemeProviderWrapper.tsx

import React, { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import muiTheme from './muiTheme'; // Import your custom theme file
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { Button } from '@mui/material';

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({
  children,
}) => {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default ThemeProviderWrapper;
