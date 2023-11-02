import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import http from "../../utils/http";

class SalesGraph extends Component<any, any> {
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
  handleYearChangeBlue = (event) => {
    const selectedYear = event.target.value;
    this.setState({ selectedYear }, () => {
      this.fetchData();
    });
  };
  handleYearChangeGreen = (event) => {
    const selectedYear2 = event.target.value;
    this.setState({ selectedYear2 }, () => {
      this.fetchData();
    });
  };
  render() {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            width: "81%",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <h1>매출관리</h1>
        </div>
        <div style={{ display: "flex", width: "85%" }}>
          <div style={{ display: "flex", flex: "1" }}></div>
          <div style={{ display: "flex", flex: "1" }}></div>
          <div
            style={{
              marginBottom: "10px",
              flex: "0.6",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <div style={{ display: "flex", marginRight: "40px" }}>
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#3772FF",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "5px",
                }}
              ></span>
              <select onChange={this.handleYearChangeBlue}>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
            </div>
            <div style={{ display: "flex" }}>
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#48E5C2",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "5px",
                }}
              ></span>
              <select onChange={this.handleYearChangeGreen}>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </select>
            </div>
          </div>
        </div>

        <div
          id="salesGraph1"
          style={{
            backgroundColor: "white",
            width: "85%",
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
export default SalesGraph;
