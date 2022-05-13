/* eslint-disable @next/next/no-sync-scripts */
import "../styles/globals.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import Navbar from "../components/navbar";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = () => setLoading(false);
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return loading ? (
    <>
      <Navbar
        navItems={[
          { text: "Culturele Vrijhaven", path: "/culturele-vrijhaven", id: 10 },
          { text: "Kunstcafe", path: "/kunstcafe", id: 82 },
          { text: "Expo", path: "/expo", id: 85 },
          { text: "Verhuur", path: "/verhuur", id: 88 },
          { text: "Praktisch", path: "/praktisch", id: 94 },
          { text: "Home", path: "/", id: 9 },
          {
            text: "Agenda",
            path: "/agenda",
            id: "agenda",
          },
          {
            text: "Nijveraars",
            path: "/nijveraars",
            id: "nijveraars",
          },
        ]}
      />
      <Loader />
    </>
  ) : (
    <>
      <Head>
        {/* {(router.asPath == "/" || router.asPath == "/praktisch") && ( */}
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
        {/* )} */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
