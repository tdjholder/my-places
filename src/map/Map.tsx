import React from "react";
import "./Map.css";
import Chart from "react-google-charts";

export const options = {
  backgroundColor: "#dbdbdb",
  datalessRegionColor: "#7e7f80",
  defaultColor: "#f5f5f5",
  magnifyingGlass: { enable: true },
  enableRegionInteractivity: true,
  legend: "none",
};

type MapProps = {
  data: any[];
};

export const Map = ({ data }: MapProps) => {
  return <Chart chartType="GeoChart" data={data} options={options} />;
};
