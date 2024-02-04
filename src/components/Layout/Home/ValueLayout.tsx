import React from "react";
import { Typography } from "@material-tailwind/react";
import { MenuItem } from "@material-tailwind/react";
import {
  WalletIcon,
  PaperAirplaneIcon,
  BanknotesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const valueList = [
  {
    label: "Airport pickup",
    icon: PaperAirplaneIcon,
    description: "We provide escort from the airport to the hotel",
  },
  {
    label: "Easy booking",
    icon: WalletIcon,
    description: "Quick and easy booking of tours for upcoming dates",
  },
  {
    label: "Best tour guide",
    icon: UserGroupIcon,
    description: "Our best tour guid is ready to guide your trip",
  },
  {
    label: "Lost of promotion",
    icon: BanknotesIcon,
    description: "Various promotion and drawings of tours",
  },
];

const Value = () => {
  return (
    <div className="flex flex-col justify-center items-center my-10">
      <h1 className="text-5xl font-bold">Top values for you</h1>
      <p className="my-5 font-medium">
        Try variety of benefits when using our services
      </p>

      <ul className="flex gap-5">
        {valueList.map(({ label, icon, description }, key) => (
          <li key={label} className="pointer-events-none">
            <Typography
              placeholder={""}
              as="a"
              href="#"
              variant="small"
              color="gray"
              className="font-bold text-black text-lg">
              <MenuItem
                placeholder={""}
                className="flex flex-col items-center gap-2 hover:bg-transparent">
                {React.createElement(icon, {
                  className: "h-14 w-14 bg-gray-200 rounded-full p-3",
                  strokeWidth: 1.5,
                })}
                <span className="text-gray-900">{label}</span>
                <span className="text-gray-600 text-xs text-center w-2/3">
                  {description}
                </span>
              </MenuItem>
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Value;
