import React, { Component, useContext } from "react";
import ReactApexChart from "react-apexcharts";
import axios, { AxiosResponse } from "axios";
import { ProfileContext } from "@/modules/UserManagement/ProfileManagement/ProfileContext";

interface BarSeriesType {
  name: string;
  data: number[];
}

interface PieSeriesType {
  name: string;
  data: number[];
}

class ApexChart extends Component {
  static contextType = ProfileContext;
  context!: React.ContextType<typeof ProfileContext>;

  state = {
    barSeries: [] as BarSeriesType[],
    barOptions: {
      chart: {
        type: "bar" as const,
        height: 350,
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [],
      },
      title: {
        text: "Bar Chart Placeholder",
        align: "left" as const,
      },
    },
    pieSeries: [] as PieSeriesType[],
    pieOptions: {
      chart: {
        width: 380,
        type: "pie" as const,
      },
      labels: [],
      title: {
        text: "Pie Chart Placeholder",
        align: "left" as const,
      },
    },
  };

  componentDidMount() {
    const brandName = this.context.brandName;
    console.log("brandName:", brandName);

    if (!brandName) {
      console.error("브랜드명을 찾을 수 없습니다.");
      return;
    }

    axios
      .get("http://192.168.100.152:5500/review-statistics/age", {
        params: {
          brandName: brandName,
        },
      })
      .then((response: AxiosResponse) => {
        const ageData: Record<string, number> = response.data;

        const sortedAgeKeys = Object.keys(ageData).sort(
          (a, b) => parseInt(a) - parseInt(b)
        );
        const sortedAgeValues = sortedAgeKeys.map((key) => ageData[key]);

        const ageSeries: BarSeriesType = {
          name: "Age Statistics",
          data: sortedAgeValues,
        };
        this.setState({
          barSeries: [ageSeries],
          barOptions: {
            ...this.state.barOptions,
            xaxis: {
              categories: sortedAgeKeys,
            },
          },
        });
      })
      .catch((error) => {
        console.error("age 통계 요청 에러:", error);
      });

    axios
      .get("http://192.168.100.152:5500/review-statistics/gender", {
        params: {
          brandName: brandName,
        },
      })
      .then((response: AxiosResponse) => {
        const genderData: Record<string, number> = response.data;
        const genderSeries: number[] = Object.values(genderData);

        this.setState({
          pieSeries: genderSeries,
          pieOptions: {
            ...this.state.pieOptions,
            labels: Object.keys(genderData),
          },
        });
      })
      .catch((error) => {
        console.error("gender 통계 요청 에러:", error);
      });
  }

  render() {
    return (
      <div>
        <div id="barChart">
          <ReactApexChart
            options={this.state.barOptions}
            series={this.state.barSeries}
            type="bar"
            height={350}
          />
        </div>
        <div id="pieChart">
          <ReactApexChart
            options={this.state.pieOptions}
            series={this.state.pieSeries}
            type="pie"
          />
        </div>
      </div>
    );
  }
}

export default ApexChart;
