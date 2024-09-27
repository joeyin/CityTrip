import React from "react";
import { IconStar } from "@images/icons";

const Overview = () => {
  return (
    <div className="py-6 px-5 flex flex-col gap-4 border-t-1 border-gray-200">
      <div className="flex flex-col gap-1">
        <div className="text-xs font-bold">Name:</div>
        <div className="text-[13px] font-light">Fort York  Blvd / Capreol Ct</div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-xs font-bold">Status:</div>
        <div className="text-[13px] font-light">In Service</div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-xs font-bold">Rating:</div>
        <div className="text-[13px] font-light flex gap-0.5">
          <IconStar className="text-primary" />
          <IconStar className="text-primary" />
          <IconStar className="text-primary" />
          <IconStar className="text-primary" />
          <IconStar className="text-gray-200" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-xs font-bold">Address:</div>
        <div className="text-[13px] font-light">Fort York  Blvd / Capreol Ct, Toronto, ON M5V 3Y7</div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-xs font-bold">Charging Station:</div>
        <div className="text-[13px] font-light">No</div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-xs font-bold">Capacity:</div>
        <div className="text-[13px] font-light">47</div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-xs font-bold">Rental Method:</div>
        <div className="text-[13px] font-light">Key, Transit Card, Credit Card, Phone</div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-xs font-bold">Available Bikes:</div>
        <div className="text-[13px] font-light">4</div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-xs font-bold">Available E-Bikes:</div>
        <div className="text-[13px] font-light">4</div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-xs font-bold">Available Docks:</div>
        <div className="text-[13px] font-light">2</div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-xs font-bold">Last Reported:</div>
        <div className="text-[13px] font-light">September 24, 2024 9:21:26 PM</div>
      </div>
    </div>
  );
};

export default React.memo(Overview);
