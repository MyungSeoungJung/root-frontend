import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import http from "../../utils/http";

class SalesChartComponet extends Component<any, any> {
  //클래스형 컴포넌트라 hook사용 불가
  constructor(props) {
    super(props);

    this.state = {
      selectedYear: new Date().getFullYear(), //기본 값
      highestSalesProduct: null,
      options: {
        series: [],
        chart: {
          type: "bar",
          height: 430,
        },

        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: "10px",
            colors: ["black"],
          },
        },
        tooltip: {
          shared: true,
          intersect: false,
        },
        xaxis: {
          categories: [
            "1월",
            "2월",
            "3월",
            "4월",
            "5월",
            "6월",
            "7월",
            "8월",
            "9월",
            "10월",
            "11월",
            "12월",
          ],
        },
      },
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const { selectedYear } = this.state;
    try {
      const response = await http.get(`/chart/salesChart?year=${selectedYear}`);
      const salesData = response.data;

      // Map name to color
      const colorMap = {
        tent: "#9bf6ff",
        table: "#caffbf",
        accessory: "#ad9bff",
        tableware: "#ffc6ff",
        other: "#fdffb6",
      };

      const seriesData = salesData.map((item) => ({
        name: item.name,
        data: item.data,
        color: colorMap[item.name] || "#ccc",
      }));

      // 가장 높은 판매량
      let highestSales = 0;
      let highestSalesProduct = null;
      salesData.forEach((item) => {
        const totalSales = item.data.reduce((acc, val) => acc + val, 0);
        if (totalSales > highestSales) {
          highestSales = totalSales;
          highestSalesProduct = item.name;
        }
      });
      this.setState({
        options: {
          series: seriesData,
        },
        highestSalesProduct,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  handleYearChange = (event) => {
    const selectedYear = event.target.value;
    this.setState({ selectedYear }, () => {
      this.fetchData();
    });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flex: "1",
          marginRight: "10px",
          background: "white",
          borderRadius: "15px",
          marginTop: "30px",
        }}
      >
        <ReactApexChart
          options={this.state.options}
          series={this.state.options.series}
          type="bar"
          width={580}
          height={300}
        />
      </div>
    );
  }
}

export default SalesChartComponet;
