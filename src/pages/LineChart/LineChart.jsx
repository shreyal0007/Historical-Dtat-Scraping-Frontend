import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ period }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Exchange Rate (USD to EUR)",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  });

  // Function to fetch exchange rate data
  const fetchExchangeRateData = async (period) => {
    try {
      const response = await fetch(
        `https://historic-exchange-data-scraping-3.onrender.com/api/forex-data?from=USD&to=EUR&period=${period}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);

      // Check if the data is valid and non-empty
      if (data?.data && data.data.length > 0) {
        const labels = data.data.map((entry) => entry.date || "Unknown Date");
        const rates = data.data.map((entry) => entry.close || 0);
        console.log("labels", labels);
        console.log("rates", rates);

        setChartData({
          labels,
          datasets: [
            {
              label: "Exchange Rate (USD to EUR)",
              data: rates,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
              borderWidth: 2,
              tension: 0.4,
            },
          ],
        });
      } else {
        console.warn("No data returned from API.");
        setChartData({
          labels: [],
          datasets: [
            {
              label: "No Data Available",
              data: [],
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
            },
          ],
        });
      }
    } catch (error) {
      console.error("Error fetching exchange rate data:", error);
    }
  };

  // Fetch data whenever the `period` prop changes
  useEffect(() => {
    fetchExchangeRateData(period);
  }, [period]);

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h2>Exchange Rate Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default LineChart;
