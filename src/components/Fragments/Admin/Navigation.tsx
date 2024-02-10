import React from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  Bars3BottomLeftIcon,
  MapIcon,
  XMarkIcon,
  UserIcon,
  GlobeAltIcon,
  TagIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
useRouter;

const Sidebar = () => {
  const navigate = useRouter().push;

  const sidebarMenu = [
    {
      label: "User",
      icon: UserIcon,
      onClick: () => {},
    },
    {
      label: "Banner",
      icon: MapIcon,
      onClick: () => navigate("/banner"),
    },
    {
      label: "Promo",
      icon: BanknotesIcon,
      onClick: () => navigate("/promo"),
    },
    {
      label: "Activities",
      icon: GlobeAltIcon,
      onClick: () => navigate("/activities"),
    },
    {
      label: "Categories",
      icon: TagIcon,
      onClick: () => navigate("/categories"),
    },
  ];
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <div className="bg-gray-200 shadow-lg">
        <IconButton
          placeholder={""}
          variant="text"
          size="lg"
          onClick={isDrawerOpen ? closeDrawer : openDrawer}>
          {isDrawerOpen ? (
            <XMarkIcon className="h-8 w-8 stroke-2" />
          ) : (
            <Bars3BottomLeftIcon className="h-8 w-8 stroke-2 " />
          )}
        </IconButton>
        <Drawer placeholder={""} open={isDrawerOpen} onClose={closeDrawer}>
          <Card
            placeholder={""}
            color="transparent"
            shadow={false}
            className="h-[calc(100vh-2rem)] w-full p-10">
            <div className="mb-2 flex items-center gap-4 p-4">
              <Typography placeholder={""} variant="h3" color="blue-gray">
                Dashboard
              </Typography>
            </div>

            <List placeholder={""} className="gap-4">
              {sidebarMenu.map(({ label, icon, onClick }, key) => (
                <ListItem
                  placeholder={""}
                  key={label}
                  onClick={onClick}
                  className="w-full font-semibold text-xl rounded-lg">
                  <ListItemPrefix placeholder={""}>
                    {React.createElement(icon, {
                      className: "h-5 w-5",
                    })}
                  </ListItemPrefix>
                  {label}
                </ListItem>
              ))}
            </List>
          </Card>
        </Drawer>
      </div>
    </>
  );
};

export default Sidebar;
