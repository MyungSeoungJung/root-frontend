import React from "react";
import http from "../../utils/http";

interface State {
  thisMonth: number;
  lastMonth: number;
}

class SettlementMoney extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      thisMonth: null,
      lastMonth: 1450008859,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const settlementMoneyResponse = await http.get(`/chart/settlementMoney`);
      this.setState({
        thisMonth: settlementMoneyResponse.data.thisMonth,
        // lastMonth: settlementMoneyResponse.data.lastMonth,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  calculateChangePercentage(thisMonth: number, lastMonth: number) {
    if (lastMonth === 0) {
      return "저번 달의 정산 금액이 없습니다.";
    }
    const change = ((thisMonth - lastMonth) / lastMonth) * 100;
    return change.toFixed(2) + "%";
  }
  render() {
    const { thisMonth, lastMonth } = this.state;
    const formattedThisMonth =
      new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
      })
        .format(thisMonth)
        .replace("₩", "") + " 원";

    // const formattedLastMonth =
    //   new Intl.NumberFormat("ko-KR", {
    //     style: "currency",
    //     currency: "KRW",
    //   })
    //     .format(lastMonth)
    //     .replace("₩", "") + " 원";

    const changePercentage = this.calculateChangePercentage(
      thisMonth,
      lastMonth
    );

    return (
      <div
        style={{
          height: "50px",
          backgroundColor: "white",
          width: "81%",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
          marginBottom: "20px",
          fontSize: "1.4rem",
          paddingBottom: "35px",
          paddingTop: "30px",
        }}
      >
        <p>
          이번 달 정산 금액은
          <strong
            style={{
              color: "red",
              fontWeight: "700",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            {formattedThisMonth}
          </strong>
          입니다.
        </p>
        <p
          style={{ fontSize: "0.85rem", marginTop: "20px", marginLeft: "3px" }}
        >
          저번 달과 비교하여{" "}
          <strong
            style={{
              fontWeight: "600",
              color: "black",
            }}
          >
            {changePercentage}{" "}
          </strong>{" "}
          입니다.
        </p>
      </div>
    );
  }
}

export default SettlementMoney;
