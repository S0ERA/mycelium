import { Line } from "react-chartjs-2";

const LineChart = ({ data, options, title }) => (
  <div className="chart">
    <h3>{title}</h3>
    <div className="chartWrapper">
      <Line data={data} options={options} />
    </div>
  </div>
);

export default LineChart;
