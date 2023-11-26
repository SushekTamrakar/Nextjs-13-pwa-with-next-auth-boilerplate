"use client";

import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import {
  HomeOutlined,
  Home,
  Notifications,
  SettingsOutlined,
  Settings,
  PersonOutline,
  Person,
  NotificationsOutlined,
} from "@mui/icons-material";
import { GetScreenSize } from "@/utils/GetScreenSize";
import { styled } from "@mui/system";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { blackListedRoutes } from "@/lib/Constants";

const TabBarButton = styled(BottomNavigationAction)({
  color: "#bebebe",
  "&.Mui-selected": {
    color: "#fff",
  },
});

export default function BottomTabs() {
  const session = useSession();
  const router = useRouter();
  const pathName = usePathname();

  const [value, setValue] = React.useState(0);
  const screenSizeState: string = GetScreenSize();
  const iconIndex = [
    {
      icon1: 0,
      path: "/",
    },
    { icon2: 1, path: "/signup" },
    { icon3: 2, path: "/signIn" },
    { icon4: 3, path: `/dashboard/user/${session.data?.user.id}` },
  ];

  const [show, setShow] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  const controlNavbar = React.useCallback(() => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setShow(false);
      } else {
        setShow(true);
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  }, [lastScrollY]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [controlNavbar]);

  if (blackListedRoutes.includes(pathName.toString())) return null;

  return (
    <div
      className={`fixed w-full duration-500 transition-all ${
        show ? "bottom-0" : "bottom-[-5%]"
      }`}
    >
      <BottomNavigation
        showLabels
        style={{
          display: screenSizeState === "sm" && show ? "flex" : "none",
          backgroundColor: "#242424",
          height: 70,
          paddingTop: 25,
          paddingBottom: 25,
        }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <TabBarButton
          id="home"
          label="Home"
          icon={value === iconIndex[0].icon1 ? <Home /> : <HomeOutlined />}
          onClick={(value) => {
            router.push(iconIndex[0].path);
          }}
        />
        <TabBarButton
          id="notification"
          label="Notification"
          icon={
            value === iconIndex[1].icon2 ? (
              <Notifications />
            ) : (
              <NotificationsOutlined />
            )
          }
          onClick={(value) => {
            router.push(iconIndex[1].path);
          }}
        />
        <TabBarButton
          id="settings"
          label="Settings"
          icon={
            value === iconIndex[2].icon3 ? <Settings /> : <SettingsOutlined />
          }
          onClick={(value) => {
            router.push(iconIndex[2].path);
          }}
        />
        <TabBarButton
          id="profile"
          label="Profile"
          icon={value === iconIndex[3].icon4 ? <Person /> : <PersonOutline />}
          onClick={(value) => {
            router.push(iconIndex[3].path);
          }}
        />
      </BottomNavigation>
    </div>
  );
}
