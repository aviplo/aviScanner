import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';
import { Roboto } from '@material-ui/core/styles/fonts';



const fontTheme = createTheme({
    navbar: {
        fontFamily: 'Roboto Serif',
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
        h1: {
            fontSize: '2rem',
            fontWeight: 500,
            color: '#333',
        },
    },
    card: {

    }
})


export const CustomThemeProvider = ({ children }) => (
    <ThemeProvider theme={fontTheme}>{children}</ThemeProvider>
);

export const CustomTypography = styled(Typography)({
    fontFamily: 'Roboto Serif',
});