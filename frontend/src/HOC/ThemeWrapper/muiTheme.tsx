import { createTheme } from '@mui/material/styles';
const muiTheme = createTheme({
  direction: 'rtl',
  // Other theme configurations if needed
  components: {
    MuiInputLabel: {},
    MuiFormLabel: {},
  },
});

export default muiTheme;
