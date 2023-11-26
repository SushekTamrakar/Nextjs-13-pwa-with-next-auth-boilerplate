"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import anime from "animejs/lib/anime.es.js";

const SplashScreen = ({ finishLoading }: any) => {
  const [isMounted, setIsMounted] = useState(false);

  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader.add({
      targets: "#logo",
      delay: 1,
      scale: 1,
      duration: 500,
      easing: "easeInOutExpo",
    });
    loader.add({
      targets: "#logo",
      delay: 1,
      scale: 1.25,
      duration: 500,
      easing: "easeInOutExpo",
    });
    loader.add({
      targets: "#logo",
      delay: 1,
      scale: 1,
      duration: 500,
      easing: "easeInOutExpo",
    });
    loader.add({
      targets: "#logo",
      delay: 1,
      scale: 1.25,
      duration: 500,
      easing: "easeInOutExpo",
    });
    loader.add({
      targets: "#logo",
      delay: 1,
      scale: 1,
      duration: 500,
      easing: "easeInOutExpo",
    });
    loader.add({
      targets: "#logo",
      delay: 1,
      scale: 1.25,
      duration: 500,
      easing: "easeInOutExpo",
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <Image id="logo" src="/splash_screen.png" alt="" width={60} height={60} />
    </div>
  );
};

export default SplashScreen;
