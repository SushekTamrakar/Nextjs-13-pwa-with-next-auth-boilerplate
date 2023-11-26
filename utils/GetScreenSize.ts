import { useEffect, useRef, useState } from "react";

export function GetScreenSize() {
  const resizeTimeoutRef = useRef<any>(0);
  const [screenSizeState, setScreenSizeState] = useState<string | null>(null);

  const getScreenSize = (windowWidth: number): string =>
    windowWidth < 768
      ? "sm"
      : windowWidth < 1024
      ? "md"
      : windowWidth < 1280
      ? "lg"
      : "xl";

  useEffect(() => {
    // here i set the current screen breakpoint immediately on the page load
    setScreenSizeState(getScreenSize(window.innerWidth));

    // here i add a listener for the resize event of the window
    window.addEventListener("resize", () => {
      // if a resize timout exists i clear it to prevent calling setState too many times
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);

      // here i set the timeout ref to the function that will be executed 150ms after the last resize event, again, to prevent calling setState too many times
      const value = setTimeout(
        () => setScreenSizeState(getScreenSize(window.innerWidth)),
        150
      );
      resizeTimeoutRef.current = value;
    });
  }, []);

  return screenSizeState as string;
}
