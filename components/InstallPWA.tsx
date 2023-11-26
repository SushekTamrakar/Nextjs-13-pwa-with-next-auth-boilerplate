"use client";

import React, { useEffect, useState } from "react";

const InstallPWA = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  console.log(
    "🚀 ~ file: InstallPWA.tsx:7 ~ InstallPWA ~ installPrompt:",
    installPrompt
  );
  const [displayMode, setDisplayMode] = useState(null);

  function getDisplayMode() {
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    const navigatorStandalone =
      "standalone" in window.navigator && window.navigator["standalone"];
    if (document.referrer.startsWith("android-app://")) {
      return "twa";
    } else if (navigatorStandalone || isStandalone) {
      return "standalone";
    }
    return "browser";
  }

  function handleInstallPrompt(e: Event) {
    alert("You can install this as a PWA on your desktop or your phone.");
    e.preventDefault();
    setInstallPrompt(e);
  }

  async function handleInstallClick(e) {
    alert("clicked!");
    if (installPrompt) {
      alert("has install prompt");
      installPrompt.prompt();
      let choice = await installPrompt.userChoice;
      if (choice?.outcome === "accepted") {
        alert("accepted install");
        setInstallPrompt(null);
      }
      if (choice?.outcome === "dismissed") {
        alert("dismissed install");
        setInstallPrompt(null);
      }
    }
  }

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handleInstallPrompt);
    setDisplayMode(getDisplayMode());

    return () => {
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
    };
  }, []);

  return (
    <a href="#" onClick={handleInstallClick}>
      {" "}
      Install me{" "}
    </a>
  );
};

export default InstallPWA;
