import React from "react";
import CardInfo from "components/Cards/CardInfo";
// components

import CardTable from "components/Cards/CardTable.js";

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">

          <CardInfo />
        </div>
        <div className="w-full mb-12 px-4">
          {/* <CardTable color="dark" /> */}
        </div>
      </div>
    </>
  );
}
