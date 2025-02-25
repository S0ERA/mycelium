import { Bar } from "react-chartjs-2";

const BarChart = ({ data, options, title }) => (
  <div className="chart">
    <h3>{title}</h3>
    <div className="chartWrapper">
      <Bar data={data} options={options} />
    </div>
  </div>
);

export default BarChart;
