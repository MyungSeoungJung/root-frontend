import React, { Component, useContext } from "react";
import ReactApexChart from "react-apexcharts";
import axios, { AxiosResponse } from "axios";
import { ProfileContext } from "@/modules/UserManagement/ProfileManagement/ProfileContext";
import styled from "styled-components";
import * as S from "./styles";

interface BarSeriesType {
  name: string;
  data: number[];
}

interface PieSeriesType {
  name: string;
  data: number[];
}

interface LineSeriesType {
  name: string;
  data: number[];
}

interface State {
  barSeries: BarSeriesType[];
  barOptions: any;
  pieSeries: PieSeriesType[];
  pieOptions: any;
  lineSeries: LineSeriesType[];
  lineOptions: any;
  activeChart: "bar" | "pie" | "line";
}

const ChartControls = styled.div`
  ${S.chartControls}
`;

const ChartButton = styled.button`
  ${S.buttonStyle}
`;

class ApexChart extends Component {
  static contextType = ProfileContext;
  context!: React.ContextType<typeof ProfileContext>;

  state: State = {
    barSeries: [] as BarSeriesType[],
    barOptions: {
      chart: {
        type: "bar" as const,
        width: "100%",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [],
      },
      title: {
        text: "연령대별 구매 통계",
        width: "100%",
        height: 350,
        align: "left" as const,
      },
    },
    pieSeries: [] as PieSeriesType[],
    pieOptions: {
      chart: {
        width: "30%",
        type: "pie",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 500,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
      },
      states: {
        hover: {
          filter: {
            type: "darken",
            value: 0.75,
          },
        },
      },
      labels: [],
      title: {
        text: "성별 구매 통계",
        align: "left" as const,
      },
    },
    lineSeries: [],
    lineOptions: {
      chart: {
        height: 350,
        type: "line",
      },
      xaxis: {
        categories: [],
      },
      title: {
        text: "제품별 별점 통계",
        align: "left",
      },
      stroke: {
        curve: "smooth",
      },
    },
    activeChart: "bar",
  };

  componentDidMount() {
    this.setActiveChart(this.state.activeChart);
  }

  setActiveChart = (chart: "bar" | "pie" | "line") => {
    const resetState = {
      barSeries: [],
      pieSeries: [],
      lineSeries: [],
      activeChart: chart,
    };

    this.setState(resetState, () => {
      switch (chart) {
        case "bar":
          this.loadBarData();
          break;
        case "pie":
          this.loadPieData();
          break;
        case "line":
          this.loadLineData();
          break;
        default:
          break;
      }
    });
  };

  loadBarData = () => {
    const brandName = this.context.brandName;

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
  };

  loadPieData = () => {
    const brandName = this.context.brandName;

    if (!brandName) {
      console.error("브랜드명을 찾을 수 없습니다.");
      return;
    }

    axios
      .get("http://192.168.100.152:5500/review-statistics/gender", {
        params: {
          brandName: brandName,
        },
      })
      .then((response: AxiosResponse) => {
        const genderData: Record<string, number> = response.data;
        const total = Object.values(genderData).reduce((a, b) => a + b, 0);
        const genderSeries = Object.values(genderData).map(
          (value) => (value / total) * 100
        );

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
  };

  loadLineData = () => {
    const brandName = this.context.brandName;

    if (!brandName) {
      console.error("브랜드명을 찾을 수 없습니다.");
      return;
    }

    axios
      .get("http://192.168.100.152:5500/review-statistics/product-scores", {
        params: { brandName: brandName },
      })
      .then((response: AxiosResponse) => {
        console.log(response.data);
        const productScores: Record<string, number> = response.data;
        const productIds = Object.keys(productScores);
        const scores = productIds.map((id) => productScores[id]);

        this.setState({
          lineSeries: [{ name: "Product Scores", data: scores }],
          lineOptions: {
            ...this.state.lineOptions,
            xaxis: { categories: productIds },
            stroke: {
              curve: "smooth",
            },
            markers: {
              size: 5,
            },
          },
        });
      })
      .catch((error) => {
        console.error("product scores 통계 요청 에러:", error);
      });
  };

  renderChart = () => {
    const {
      activeChart,
      barOptions,
      barSeries,
      pieOptions,
      pieSeries,
      lineOptions,
      lineSeries,
    } = this.state;

    const globalTitleStyle = {
      fontFamily: "CuteFont-Regular",
      fontSize: "20px",
      fontWeight: "bold",
    };
    barOptions.title.style = globalTitleStyle;
    pieOptions.title.style = globalTitleStyle;
    lineOptions.title.style = globalTitleStyle;

    switch (activeChart) {
      case "bar":
        return (
          <ReactApexChart
            key="bar"
            options={barOptions}
            series={barSeries}
            type="bar"
            height={350}
          />
        );
      case "pie":
        return (
          <ReactApexChart
            key="pie"
            options={pieOptions}
            series={pieSeries}
            type="pie"
            height={350}
          />
        );
      case "line":
        return (
          <ReactApexChart
            key="line"
            options={lineOptions}
            series={lineSeries}
            type="line"
            height={350}
          />
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <div>
        {this.renderChart()}
        <ChartControls>
          <ChartButton onClick={() => this.setActiveChart("bar")}>
            연령대별 구매 통계
          </ChartButton>
          <ChartButton onClick={() => this.setActiveChart("pie")}>
            성별 구매 통계
          </ChartButton>
          <ChartButton onClick={() => this.setActiveChart("line")}>
            제품별 별점 통계
          </ChartButton>
        </ChartControls>
      </div>
    );
  }
}

export default ApexChart;
