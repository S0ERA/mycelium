import { useEffect, useState, useMemo } from "react";
import styles from "./Analytics.module.css";
import { options } from "../../constants/Charts/options.jsx";
import { getBarLineData } from "../../constants/Charts/getBarLineData.jsx";
import { getPieData } from "../../constants/Charts/getPieData.jsx";
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
import { fetchPosts } from "../../services/api.js";

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

  const barLineData = useMemo(() => getBarLineData(data), [data]);
  const pieData = useMemo(() => getPieData(data), [data]);

  useEffect(() => {
    const loadData = async () => {
      const posts = await fetchPosts();
      setData(posts);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) return <div className="loading">Загрузка данных...</div>;

  return (
    <div className={styles.analyticsContainer}>
      <BarChart
        data={barLineData}
        options={options}
        title="Столбчатая диаграмма"
      />

      <LineChart data={barLineData} options={options} title="Линейный график" />

      <PieChart data={pieData} options={options} title="Круговая диаграмма" />
    </div>
  );
};

export default Analytics;
