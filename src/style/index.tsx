import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFDE03',
      dark: '#FFC233',
    },
    secondary: {
      main: '#0336FF',
    },
    warning: {
      main: '#FF0266',
    },
  }
})

export {theme};