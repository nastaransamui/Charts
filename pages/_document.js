import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import appTheme from '../theme/appTheme';
import Loading from '../theme/Loding'
import { AppBar,Toolbar } from '@material-ui/core';
export default class MyDocument extends Document {
  render() {
    const theme = appTheme('dark',"deepBlue")

    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet"/>
          <script src="//cdnjs.cloudflare.com/ajax/libs/three.js/r75/three.min.js"></script>
          <script src="//cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenMax.min.js"></script>
          <script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/bas2.js"></script>
          <script src="https://cdn.ably.io/lib/ably.min-1.js"></script>
        </Head>
        <body>
          <div
            id="preloader"
            style={{
              position: 'fixed',
              zIndex: 10000,
              background: theme.palette.type === 'dark' ? '#131625' : '#fafafa',
              width: '100%',
              height: '100%',
            }}
          >
          <AppBar  position="fixed" >
          <Toolbar></Toolbar>
          </AppBar>
            <img
              style={{
                opacity: 0.5,
                position: 'fixed',
                top: 'calc(50% - 50px)',
                left: 'calc(50% - 50px)'
              }}
              src="/loading.gif"
              alt="loading"
            />
            </div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};
