import { useRef, useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

const LazyLoad = (props) => {
  const [inView, setInView] = useState(false);
  const lazyLoadRef = useRef(null);
  const [once, setOnce] = useState(false);
  useEffect(() => {
    let options = {
      // root: lazyLoadRef.current,
      // rootMargin: '0px',
      // threshold: 1.0
    };
    let callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // setTimeout(() => {
          setInView(true);
          if (typeof props.onLoadFunc == "function" && once == false) {
            props.onLoadFunc(lazyLoadRef.current);
            setOnce(true);
          }
          // }, 3000);
        }
      });
    };
    let observer = new IntersectionObserver(callback, options);
    observer.observe(lazyLoadRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        ref={lazyLoadRef}
        style={{
          ...props.childStyle,
          width: "100%",
          position: "relative",
          minHeight: "5em",
        }}
        className={props.childClassName}
      >
        {inView && props.children}
        <div
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            right: "0",
            bottom: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1",
            backgroundColor: "white",
            visibility: once ? "hidden" : "visible",
          }}
        >
          <PulseLoader color={"#af1b19"} />
        </div>
      </div>
    </>
  );
};

export default LazyLoad;
