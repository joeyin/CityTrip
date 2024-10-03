"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BikeStationProps, WaterFountainProp } from "@/hooks";
import { Facility } from "@/constants";
import WaterFountain from "./WaterFountain";
import BikeStation from "./BikeStation";

const Overview = (props: BikeStationProps | WaterFountainProp) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%" }}
        animate={{
          x: 0,
        }}
        exit={{
          x: "100%",
        }}
        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
        className="right-0"
      >
        {props.facility === Facility.BIKE_STATION ? (
          <BikeStation {...(props as BikeStationProps)} />
        ) : props.facility === Facility.WATER_FOUNTAIN ? (
          <WaterFountain {...(props as WaterFountainProp)} />
        ) : (
          <></>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default React.memo(Overview);
