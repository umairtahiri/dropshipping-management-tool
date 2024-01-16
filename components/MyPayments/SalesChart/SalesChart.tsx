// @ts-nocheck
import { Box, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import Chart from "chart.js/auto";
import React, { useEffect, useRef, useState } from "react";

const usersData = [50, 60, 150, 300, 400, 600, 280, 150];

const data = {
  labels: [
    "October 1",
    "October 5",
    "October 10",
    "October 15",
    "October 20",
    "October 25",
    "October 30",
  ],
  datasets: [
    {
      label: "Sales",
      data: usersData,
      borderColor: "#4BBCAA",
      backgroundColor: "#4BBCAA",
    },
    // {
    //   label: "Sales",
    //   data: usersData,
    //   borderColor: "#4BBCAA",
    //   backgroundColor: "#4BBCAA",
    // },
  ],
};

export function SalesChart() {
  const salesChart = useRef<HTMLCanvasElement | null | undefined>();
  const salesChartRef = salesChart?.current?.getContext("2d");

  const [salesChartElement, setSalesChartElement] = useState<any>(null);
  const [month, setMonth] = useState(0);
  const [store, setStore] = useState(0);

  const handleSelectMonth = (value) => {
    setMonth(value);
  };

  const handleSelectStore = (value) => {
    setStore(value);
  };

  useEffect(() => {
    if (salesChartElement) {
      salesChartElement.destroy();
    }

    /* eslint-disable */
    const chart = new Chart(salesChartRef, {
      type: "bar",
      data,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: {
            ticks: {
              callback: function (value) {
                return "$" + value;
              },
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
          },
        },
        tooltips: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              return "$" + label;
            },
          },
        },
      },
    });
    /* eslint-enable */

    setSalesChartElement(chart);
  }, [salesChartRef, month, store]);

  return (
    <Paper
      elevation={0}
      className="h-[500px] py-4 px-10 mt-7 rounded-t hidden relative sm:block"
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className="w-full"
      >
        <Box>
          <Typography variant="h5">Total Sales</Typography>
          <Typography variant="h4" className="text-[#111] text-2xl">
            $2,500.50
          </Typography>
        </Box>
        <Box>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            className="w-44 mr-6"
            value={store}
            size="small"
            onChange={(event) => handleSelectStore(event.target.value)}
          >
            <MenuItem value={0}>Store 1</MenuItem>
            <MenuItem value={1}>Store 2</MenuItem>
            <MenuItem value={2}>Store 3</MenuItem>
          </Select>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            className="w-44"
            value={month}
            size="small"
            onChange={(event) => handleSelectMonth(event.target.value)}
          >
            <MenuItem value={0}>Today</MenuItem>
            <MenuItem value={1}>This Month</MenuItem>
            <MenuItem value={2}>6 Months</MenuItem>
            <MenuItem value={3}>This Year</MenuItem>
          </Select>
        </Box>
      </Stack>
      <canvas
        ref={salesChart}
        height={250}
        className="mb-16"
        data-testid="sales-chart"
      />
    </Paper>
  );
}
