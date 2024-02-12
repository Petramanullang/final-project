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
    <div>
      <p className="text-5xl font-bold mt-20 text-center">Top values for you</p>
      <p className="my-5 lg:text-center font-extralight lg:font-medium w-64 lg:w-full lg:mb-10">
        Try variety of benefits when using our services
      </p>

      <ul className="lg:flex gap-5">
        {valueList.map(({ label, icon, description }, key) => (
          <li key={label} className="pointer-events-none">
            <div className="font-bold text-black text-lg mb-8">
              <MenuItem
                placeholder={""}
                className="flex lg:flex-col items-center gap-3 lg:gap-2 hover:bg-transparent">
                {React.createElement(icon, {
                  className: "w-16 bg-gray-200 rounded-full p-3",
                  strokeWidth: 1.5,
                })}
                <div className="flex flex-col lg:m-0">
                  <span className="text-black mb-1 lg:mb-0 lg:text-center">
                    {label}
                  </span>
                  <span className="text-gray-600 text-sm w-44 lg:w-2/3 lg:text-center lg:mx-auto">
                    {description}
                  </span>
                </div>
              </MenuItem>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Value;
