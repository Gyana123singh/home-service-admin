import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollRestoration() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Enable automatic scroll restoration by the browser
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "auto";
    }
  }, [pathname]);

  return null;
}
