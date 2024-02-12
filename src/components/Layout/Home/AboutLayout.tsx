import React from "react";
import { Button } from "@material-tailwind/react";

const AboutLayout = () => {
  return (
    <>
      <div className="lg:flex justify-between mt-10 lg:mt-20 px-4 lg:px-16 pt-0">
        <h1 className="text-4xl lg:text-6xl font-medium lg:w-1/2">
          Blog about <br /> traveling
        </h1>
        <div className="flex flex-col gap-10 mt-4 lg:mt-0 lg:w-1/2">
          <p className="text-lg text-gray-600 font-thin text-balance">
            The most exotic island in Europe of the vast blue ocean, enveloped
            by a mild maritime climate and the paradisiacal beauty of untouched
            nature imaginable
          </p>
          <Button placeholder={""} className="item-left w-fit normal-case hidden lg:block">
            Read all article
          </Button>
        </div>
      </div>
    </>
  );
};

export default AboutLayout;
