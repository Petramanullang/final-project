import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Cog6ToothIcon,
  PowerIcon,
  Bars3BottomRightIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid";

const navListItems = [
  {
    label: "About us",
  },
  {
    label: "Promo",
  },
  {
    label: "Blog",
  },
  {
    label: "FAQ",
  },
];

function ProfileMenu({ router }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

  const profileMenuItems = [
    {
      label: "Dashboard",
      icon: AdjustmentsHorizontalIcon,
      onClick: () => router.push("/dashboard"),
    },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
      onClick: () => router.push("/dashboard/user"),
    },
    {
      label: "Log out",
      icon: PowerIcon,
      onClick: handleLogout,
    },
  ];

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <div
          color="blue-gray"
          className="lg:flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto">
          <Avatar
            placeholder={""}
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform hidden lg:block ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </MenuHandler>
      <MenuList placeholder={""} className="p-1">
        {profileMenuItems.map(({ label, icon, onClick }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              placeholder={""}
              key={label}
              onClick={() => {
                onClick && onClick();
                closeMenu();
              }}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}>
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                placeholder={""}
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}>
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

function NavList() {
  return (
    <ul className="flex">
      {navListItems.map(({ label }, key) => (
        <Typography
          placeholder={""}
          key={label}
          as="a"
          href="#"
          variant="small"
          color="gray"
          className="font-bold text-black text-lg">
          <MenuItem
            placeholder={""}
            className="flex items-center gap-2 lg:rounded-full">
            <span className="text-gray-900 font-OpenSans font-thin text-[17px]">
              {label}
            </span>
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}

const NavbarLayout = () => {
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`mx-auto w-full bg-white fixed top-0 z-50 py-3 px-2 lg:px-7 left-0 border-none transition-shadow ${
          hasScrolled ? "shadow-md" : ""
        }`}>
        <div className="relative flex items-center text-blue-gray-900">
          <Typography
            placeholder={""}
            as="a"
            href="#"
            className=" ml-2 cursor-pointer py-1.5 font-extrabold text-3xl">
            Destinify
          </Typography>
          <div className="hidden lg:block mx-auto -translate-x-10">
            <NavList />
          </div>
          <IconButton
            placeholder={""}
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden">
            <Bars3BottomRightIcon className="h-9 w-9" />
          </IconButton>
          <div className="absolute right-10">
            {!isLoggedIn && (
              <Button
                className="normal-case tracking-widest bg-white text-black py-2 lg:py-3 lg:px-10 text-xs rounded-xl border-black border font-bold shadow-md mr-2"
                size="md"
                placeholder={""}
                onClick={() => router.push("/login")}>
                <span>Login</span>
              </Button>
            )}
            {isLoggedIn && <ProfileMenu router={router} />}
          </div>
        </div>
        <Collapse open={isNavOpen} className="overflow-scroll">
          <NavList />
        </Collapse>
      </div>
    </>
  );
};

export default NavbarLayout;
