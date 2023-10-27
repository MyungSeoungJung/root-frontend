import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import http from "../../utils/http";

class SalesChart extends Component<any, any> {
  //클래스형 컴포넌트라 hook사용 불가
  constructor(props) {
    super(props);

    this.state = {
      selectedYear: new Date().getFullYear(), //기본 값
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

      this.setState({
        options: {
          series: seriesData,
        },
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
            width: "80%",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h1>판매 현황</h1>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "30%",
            backgroundColor: "white",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          {/* 연도 선택 */}
          <div>
            <select onChange={this.handleYearChange}>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
            <p></p>
          </div>
          {/* 차트 */}
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
