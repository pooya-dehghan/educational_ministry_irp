import { createTheme } from '@mui/material/styles';
const muiTheme = createTheme({
  direction: 'rtl',
  // Other theme configurations if needed
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          right: '1.5rem !important',
        },
        focused: {
          right: '2rem !important',
        },
      },
    },
    MuiFormLabel: {},
  },
});

export default muiTheme;
