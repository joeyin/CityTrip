import React from "react";
import Button from "@/components/Button";
import cx from "classnames";

const Reviews = () => {
  return (
    <div className="relative">
      <Button
        fullWidth
        color="primary"
        size="lg"
        radius="none"
        className="h-[52px] text-base	font-roboto sticky top-0"
      >
        Write a review
      </Button>

      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
        <div
          key={index}
          className={cx(
            "flex",
            "flex-col",
            "py-4",
            "px-3.5",
            {
              "border-b-1": index !== 8,
              "border-gray-200": index !== 8,
            },
            "transition-all",
            "duration-500",
            "hover:bg-gray-50"
          )}
        >
          <div className="flex items-center gap-3.5">
            <img
              className="w-[42px] h-[42px] border-2 rounded-full border-primary object-cover"
              src="https://images.unsplash.com/photo-1645378999496-33c8c2afe38d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <div className="flex flex-col font-inter gap-0.5">
              <div className="text-sm font-semibold">Liam Smith</div>
              <div className="text-[12px] font-normal italic">
                September 24, 2024 17:21:26
              </div>
              <div className="text-xs font-light">
                The bike station is super convenient, located right next to the
                metro and park. I use it daily for my commute and it saves me a
                lot of time.
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(Reviews);
