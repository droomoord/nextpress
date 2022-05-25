/* eslint-disable @next/next/no-sync-scripts */
import { useEffect } from "react";
// import Head from "next/head";
import createMap from "../functions/createMap";

const Map = () => {
  useEffect(() => {
    createMap();
  }, []);

  return (
    <>
      <div
        id="map"
        style={{
          height: "300px",
          zIndex: "2",
          marginTop: "1em",
          position: "relative",
        }}
      ></div>
    </>
  );
};

export default Map;
