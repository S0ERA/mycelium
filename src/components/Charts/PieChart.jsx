import { Pie } from "react-chartjs-2";

const PieChart = ({ data, options, title }) => (
  <div className="chart">
    <h3>{title}</h3>
    <div className="chartWrapper">
      <Pie data={data} options={options} />
    </div>
  </div>
);

export default PieChart;
