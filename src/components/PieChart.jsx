
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Chart from 'react-google-charts';

const PieChart = () => {
  const axiosPublic = useAxiosPublic()

  const { data:articles=[] } = useQuery({
    queryKey: ["pieChart"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/all-articles-user")
      return data
    }
  })


  const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];

  const options = {
    title: "My Daily Activities",
    pieHole: 0.4, // Creates a Donut Chart. Does not do anything when is3D is enabled
    is3D: true, // Enables 3D view
    pieStartAngle: 100, // Rotates the chart
    sliceVisibilityThreshold: 0.02, // Hides slices smaller than 2%
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "#233238",
        fontSize: 14,
      },
    },
    colors: ["#8AD1C2", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A"],
  };
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
};

export default PieChart;