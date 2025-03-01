export const options = {
  responsive: true,
  scales: {
    x: { ticks: { color: "rgb(216, 213, 212)" } },
    y: { ticks: { color: "rgb(216, 213, 212)" } },
  },
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "rgb(216, 213, 212)",
        font: { size: 10 },
      },
    },
    title: {
      display: true,
      text: "Аналитика постов",
      color: "rgb(216, 213, 212)",
    },
  },
};
