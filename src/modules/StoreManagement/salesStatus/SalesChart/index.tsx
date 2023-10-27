import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import http from "../../utils/http";

class SalesChart extends Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
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
    try {
      const response = await http.get("/chart/salesChart");
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

      this.setState({
        options: {
          series: seriesData,
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <h1>판매 현황</h1>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button>이전</button>
          <p>2021</p>
          {/* 다음 or 이전 버튼 클릭하면 p숫자의 + 1 -1 해서 페이징 */}
          <button>다음</button>
        </div>
        <div
          style={{ background: "white", width: "85%", borderRadius: "15px" }}
        >
          <ReactApexChart
            options={this.state.options}
            series={this.state.options.series}
            type="bar"
            height={300}
          />
        </div>
      </div>
    );
  }
}

export default SalesChart;
