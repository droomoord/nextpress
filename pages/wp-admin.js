import { useEffect } from "react";

const WpAdmin = () => {
  useEffect(() => {
    window.location.href = `${process.env.NEXT_PUBLIC_TARGET_URL}/wp-admin`;
  }, []);

  return <></>;
};

export default WpAdmin;
