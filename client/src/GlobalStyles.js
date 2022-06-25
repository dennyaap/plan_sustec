import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export default function GlobalStyleOverrides() {
  const theme = createTheme({       
    typography: {
      fontFamily: [
       "'Poppins', sans-serif",
      ].join(','), 
    //   body1: {
    //     fontFamily: "Arial, sans-serif",
    //   },
    },
  });

  return responsiveFontSizes(theme);
}