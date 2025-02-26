import { useEffect, useState } from "react";
import styles from "./Analytics.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import BarChart from "../../components/Charts/BarChart";
import LineChart from "../../components/Charts/LineChart";
import PieChart from "../../components/Charts/PieChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Colors,
);

const Analytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const options = {
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

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setData(data.posts);
        setLoading(false);
      });
  }, []);

  const getBarLineData = () => ({
    labels: data.map((p) => p.id),
    datasets: [
      {
        label: "Лайки",
        data: data.map((p) => p.reactions.likes),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgb(53, 162, 235)",
      },
      {
        label: "Дизлайки",
        data: data.map((p) => p.reactions.dislikes),
        backgroundColor: "rgba(74, 252, 88, 0.5)",
        borderColor: "rgb(74, 252, 88)",
      },
      {
        label: "Просмотры",
        data: data.map((p) => p.views),
        backgroundColor: "rgba(252, 74, 88, 0.5)",
        borderColor: "rgb(252, 74, 88)",
      },
    ],
  });

  const getPieData = () => ({
    labels: ["Лайки", "Дизлайки", "Просмотры"],
    datasets: [
      {
        data: [
          data.reduce((acc, p) => acc + p.reactions.likes, 0),
          data.reduce((acc, p) => acc + p.reactions.dislikes, 0),
          data.reduce((acc, p) => acc + p.views, 0),
        ],
        backgroundColor: [
          "rgba(74, 88, 252, 0.5)",
          "rgba(74, 252, 88, 0.5)",
          "rgba(252, 74, 88, 0.5)",
        ],
        borderColor: [
          "rgb(74, 88, 252)",
          "rgb(74, 252, 88)",
          "rgb(252, 74, 88)",
        ],
      },
    ],
  });

  if (loading) return <div className="loading">Загрузка данных...</div>;

  return (
    <div className={styles.analyticsContainer}>
      <BarChart
        data={getBarLineData()}
        options={options}
        title="Столбчатая диаграмма"
      />

      <LineChart
        data={getBarLineData()}
        options={options}
        title="Линейный график"
      />

      <PieChart
        data={getPieData()}
        options={options}
        title="Круговая диаграмма"
      />
    </div>
  );
};

export default Analytics;
