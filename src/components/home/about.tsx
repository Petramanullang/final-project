import React from "react";
import { Button } from "@material-tailwind/react";

const About = () => {
  return (
    <>
      <div className="flex justify-between px-16 mt-20">
        <h1 className="text-6xl font-medium w-1/2">Blog about <br/> traveling</h1>
        <div className="flex flex-col gap-10 w-1/2">
          <p className="text-lg text-gray-600 font-thin">
            The most exotic island in Europe of the vast blue ocean, enveloped
            by a mild maritime climate and the paradisiacal beauty of untouched
            nature imaginable
          </p>
          <Button placeholder={""} className="item-left w-fit normal-case">
            Read all article
          </Button>
        </div>
      </div>
    </>
  );
};

export default About;
