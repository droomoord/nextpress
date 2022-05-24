/* eslint-disable @next/next/no-sync-scripts */
import "../styles/globals.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import getNavItems from "../functions/getNavItems";

function MyApp({ Component, pageProps }) {
  const navItems = getNavItems();
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
      <Navbar navItems={navItems} />
      <Loader />
    </>
  ) : (
    <>
      <script
        src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
        integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
        defer
        crossOrigin=""
      ></script>
      <Component {...pageProps} />
      {router.asPath != "/agenda" && <Footer />}
    </>
  );
}

export default MyApp;
