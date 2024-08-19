import { useState, useEffect } from "react";

const useCoupon = (delay: number) => {
  const [showCoupon, setShowCoupon] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCoupon(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return showCoupon;
};

export default useCoupon;
