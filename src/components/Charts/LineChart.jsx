import { Line } from "react-chartjs-2";
import styles from "./Charts.module.css";

const LineChart = ({ data, options, title }) => (
  <div className={styles.chart}>
    <h3 className={styles.chartTitle}>{title}</h3>
    <div className={styles.chartWrapper}>
      <Line data={data} options={options} />
    </div>
  </div>
);

export default LineChart;
