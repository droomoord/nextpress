/* eslint-disable @next/next/no-sync-scripts */
import "../styles/globals.scss";
import Head from "next/head";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        {(router.asPath == "/" || router.asPath == "/praktisch") && (
          <>
            <link
              rel="stylesheet"
              href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
              integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
              crossOrigin=""
            />
            <script
              src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
              integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
              crossOrigin=""
            ></script>
          </>
        )}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
