/* eslint-disable @next/next/no-sync-scripts */
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="nl">
        <Head>
          <link
            rel="preload"
            href="/assets/fonts/Takraf.otf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/assets/fonts/Franchise-Bold.ttf"
            as="font"
            crossOrigin=""
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="shortcut icon"
            type="image/png"
            href="/assets/img/icon-small.png"
            sizes="96x96"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
