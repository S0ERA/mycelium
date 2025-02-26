import { Pie } from "react-chartjs-2";
import styles from "./Charts.module.css";

const PieChart = ({ data, options, title }) => (
  <div className={styles.chart}>
    <h3 className={styles.chartTitle}>{title}</h3>
    <div className={styles.chartWrapper}>
      <Pie data={data} options={options} />
    </div>
  </div>
);

export default PieChart;
