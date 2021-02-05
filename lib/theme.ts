import { createMuiTheme, ThemeOptions } from '@material-ui/core';

export const themeOptions: ThemeOptions = {
    palette: {
        type: 'dark',
    },
    typography: {
        htmlFontSize: 16,
    },
};

export default createMuiTheme(themeOptions);
