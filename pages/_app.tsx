import { ThemeProvider } from '@material-ui/core/styles';
import React, { ReactElement, useEffect } from 'react';
import theme from '../lib/theme';

export default function _app(props): ReactElement {
    const { Component, pageProps } = props;

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
