import React, { useEffect } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
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
];

function ProfileMenu({ router }: any) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

  const profileMenuItems = [
    {
      label: "Dashboard",
      icon: AdjustmentsHorizontalIcon,
    },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
    },
    {
      label: "Log out",
      icon: PowerIcon,
      onClick: handleLogout,
    },
  ];

  const hasAccessToken =
    typeof window !== "undefined" && !!localStorage.getItem("accessToken");

  if (!hasAccessToken) {
    return (
      <Button
        placeholder={""}
        variant="text"
        color="blue-gray"
        onClick={() => router.push("/login")}
        className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto">
        Login
      </Button>
    );
  }

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          placeholder={""}
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto">
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
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
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
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label }, key) => (
        <Typography
          placeholder={""}
          key={label}
          as="a"
          href="#"
          variant="small"
          color="gray"
          className="font-bold text-black text-base">
          <MenuItem
            placeholder={""}
            className="flex items-center gap-2 lg:rounded-full">
            <span className="text-gray-900"> {label}</span>
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}

const NavbarLayout = () => {
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [hasScrolled, setHasScrolled] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

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
        className={`mx-auto w-full bg-white fixed top-0 z-50 py-3 px-16 left-0 border-none transition-shadow ${
          hasScrolled ? "shadow-md" : ""
        }`}>
        <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
          <Typography
            placeholder={""}
            as="a"
            href="#"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-extrabold text-3xl">
            Destinify
          </Typography>
          <div className="hidden lg:block mx-auto translate-x-20">
            <NavList />
          </div>
          <IconButton
            placeholder={""}
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden">
            <Bars2Icon className="h-6 w-6" />
          </IconButton>
          {/* <Button
            placeholder={""}
            size="sm"
            variant="text"
            className="absolute right-16">
            <span>Log In</span>
          </Button> */}
          <ProfileMenu router={router} />
        </div>
        <Collapse open={isNavOpen} className="overflow-scroll">
          <NavList />
        </Collapse>
      </div>
    </>
  );
};

export default NavbarLayout;
