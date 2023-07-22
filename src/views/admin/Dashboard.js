import React, { useContext } from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import { AuthContext } from "Context/AuthContext";
import Tables from "./Tables";

export default function Dashboard() {

  const { currentUser } = useContext(AuthContext)
  return (
    <>
      <div className="flex flex-wrap">
        {<div className={currentUser.email !== 'admin@gmail.com' ? 'hidden' : "w-full xl:w-8/12 mb-12 xl:mb-0 px-4"}>
          <CardLineChart />
        </div>}
        <div className={currentUser.email == 'admin@gmail.com' ? 'hidden' : "w-full xl:w-8/12 px-4"}>
          <Tables />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </>
  );
}
