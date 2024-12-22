import { useState } from "react";
import { TfiTimer } from "react-icons/tfi";
import Button from "../ui/Button";

const HeroDesc = ({ title, tag }) => {
  return (
    <div className="text-secondary flex flex-col items-center justify-center gap-y-5 sm:gap-y-10 z-20">
      <div>
        <h2 className="text-xl md:text-3xl font-bold amatic-font text-center">
          {tag}
        </h2>
        <h2 className="text-accent text-2xl md:text-3xl lg:text-5xl font-bold quicksand-font text-center">
          {title}
        </h2>
      </div>
      <Button
        type="primary"
        label={"Learn More"}
        onClick={() => console.log("clicked")}
      />
    </div>
  );
};

export default HeroDesc;
