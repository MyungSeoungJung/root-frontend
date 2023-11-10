import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import http from "../../utils/http";
import SettlementMoney from "../SettlementMoney";

class SalesGraphComponent extends Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      selectedYear: new Date().getFullYear(),
      selectedYear2: new Date().getFullYear() - 1,
      series: [
        // {
        //   name: "series1",
        //   data: [31, 40, 28, 51, 42, 109, 100, 156, 241, 124, 50, 12],
        // },
        // {
        //   name: "series2",
        //   data: [51, 30, 68, 21, 72, 123, 70, 46, 11, 224, 260, 65],
        // },
      ],
      options: {
        chart: {
          height: 350,
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              const formattedValue = new Intl.NumberFormat("ko-KR", {
                style: "currency",
                currency: "KRW",
              }).format(value);
              return formattedValue.replace("₩", "") + " 원";
            },
          },
        },
        xaxis: {
          type: "category",
          categories: [
            "01월",
            "02월",
            "03월",
            "04월",
            "05월",
            "06월",
            "07월",
            "08월",
            "09월",
            "10월",
            "11월",
            "12월",
          ],
        },
        tooltip: {
          x: {
            format: "MM월",
          },
          y: {
            formatter: function (value) {
              const formattedValue = new Intl.NumberFormat("ko-KR", {
                style: "currency",
                currency: "KRW",
              }).format(value);
              return formattedValue.replace("₩", "") + " 원";
            },
          },
        },
      },
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const { selectedYear } = this.state;
    const { selectedYear2 } = this.state;
    try {
      const response = await http.get(
        `/chart/salesGraphBlueGraph?year=${selectedYear}`
      );
      const salesData = response.data;
      this.setState({
        series: [
          {
            name: salesData.name,
            data: salesData.data,
          },
        ],
      });
      const response2 = await http.get(
        `/chart/salesGraphGreenGraph?year=${selectedYear2}`
      );
      const salesData2 = response2.data;
      this.setState((prevState) => ({
        series: [
          ...prevState.series, // 기존 시리즈를 유지한 채로
          {
            name: salesData2.name,
            data: salesData2.data,
          },
        ],
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  render() {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flex: "1",
          marginLeft: "10px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <div
          id="salesGraph1"
          style={{
            backgroundColor: "white",
            width: "100%",
            borderRadius: "15px",
          }}
        >
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="area"
            height={300}
          />
        </div>
      </div>
    );
  }
}
export default SalesGraphComponent;
