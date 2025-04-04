import { useRef } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { IconFullscreen, IconPlus } from "../assets/icons";
import "highcharts/modules/full-screen";
import chartOptions from "../lib/chartOptions";

function ChartTab({ onUpdate }) {
  const chartRef = useRef(null);

  return (
    <div id="container" className="py-5 w-[78%] relative">
      <HighchartsReact
        ref={chartRef}
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={chartOptions(onUpdate)}
      />
      <button
        onClick={() => {
          if (chartRef.current) {
            chartRef.current.chart.fullscreen.toggle();
          }
        }}
        className="absolute top-8 flex items-center gap-3 cursor-pointer text-lg text-[#6F7177]"
      >
        <IconFullscreen />
        Fullscreen
      </button>
      <button className="absolute top-8 left-40 flex items-center gap-3 cursor-pointer text-lg text-[#6F7177]">
        <IconPlus />
        Compare
      </button>
    </div>
  );
}

export default ChartTab;
