"use client";

import React, { useEffect, useState } from "react";
import { Providers as SessionProvider } from "@/components/Provider";
import AppBar from "@/components/AppBar";
import BottomTabs from "@/components/BottomNavigation";
import SplashScreen from "@/components/SplashScreen";
import useSessionStorage from "@/hooks/useSessionStorage";
import { Providers as StateProvider } from "@/redux/providers";

const IntermediatoryPage = ({ children }: { children: React.ReactNode }) => {
  // const pathname = usePathname();
  // const isHome = pathname === "/";
  // const [isLoading, setIsLoading] = useState(true);
  const { getItem } = useSessionStorage();
  const [isFinishLoading, setIsFinishLoading] = useState(false);
  const isInitialVisit = !!sessionStorage.getItem("isInitialVisit");
  useEffect(() => {
    if (!isInitialVisit) {
      sessionStorage.setItem("isInitialVisit", "true");
    }
  }, [isInitialVisit]);

  // useEffect(() => {
  //   const isInitialVisit = !!sessionStorage.getItem("isInitialVisit");
  //   if (!isInitialVisit) {
  //     sessionStorage.setItem("isInitialVisit", "true");
  //   }
  // }, []);
  console.log(
    "🚀 ~ file: intermediatory.tsx:16 ~ isFinishLoading:",
    isFinishLoading
  );

  return (
    <>
      {/* {!isInitialVisit ? ( */}
      {!isInitialVisit ? (
        <SplashScreen finishLoading={() => setIsFinishLoading(true)} />
      ) : (
        <SessionProvider>
          <StateProvider>
            <AppBar />
            {children}
            <BottomTabs />
          </StateProvider>
        </SessionProvider>
      )}
    </>
  );
};

export default IntermediatoryPage;
