import React, { useState } from "react";
import LineChart from "./pages/LineChart/LineChart";
import "./App.css"
const PeriodSelector = () => {
  const [period, setPeriod] = useState("1M"); // Default to 1 Month

  // Handle period change when a button is clicked
  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Forex Data for USD to EUR</h1>

      {/* Buttons for different periods */}
      <button onClick={() => handlePeriodChange("1M")} className="buttondiv">
        1 Month
      </button>
      <button onClick={() => handlePeriodChange("3M")} className="buttondiv">
        3 Months
      </button>
      <button onClick={() => handlePeriodChange("6M")} className="buttondiv">
        6 Months
      </button>

      {/* Pass the selected period to the LineChart component */}
      <LineChart period={period} />
    </div>
  );
};

export default PeriodSelector;
