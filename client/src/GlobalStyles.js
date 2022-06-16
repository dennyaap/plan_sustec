import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export default function GlobalStyleOverrides() {
  const theme = createTheme({       
    typography: {
      fontFamily: [
        "'Poppins', Arial, sans-serif"
      ].join(','),         
      body1: {
        fontFamily: "'Poppins', Arial, sans-serif",
      },
    },
  });

  return responsiveFontSizes(theme);
}