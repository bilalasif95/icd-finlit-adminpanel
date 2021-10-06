import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import useStyles from "./styles";
import Widget from "../../components/Widget";
import ApexPieChart from "../../components/charts/ApexPieChart";
import ApexLineChart from "../../components/charts/ApexLineChart";
import ApexBarChart from "../../components/charts/ApexBarChart";
import Can from "../../RoleBasedAccess/can";
import { firebase, table } from "../../config";

const Dashboard = () => {
  var classes = useStyles();
  const [mainData, setMainData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [depositLoading, setDepositLoading] = useState(true);
  const [depositChartLoading, setDepositChartLoading] = useState(true);
  const [depositActiveTab, setDepositActiveTab] = useState("D");
  const [withdrawalActiveTab, setWithdrawalActiveTab] = useState("D");
  const [profitLossActiveTab, setProfitLossActiveTab] = useState("D");
  const [chartActiveTab, setChartActiveTab] = useState("D");
  const [depositGranularity, setDepositGranularity] = useState(1440);
  const [depositChartGranularity, setDepositChartGranularity] = useState(1440);
  const [data, setData] = useState([]);
  const [depositTicks, setDepositTicks] = useState([]);
  useEffect(() => {
    setLoading(true);
    firebase
      .firestore()
      .collection(table.UsersSummary)
      .onSnapshot((snapshot) => {
        if (snapshot.empty) {
          setLoading(false);
        } else {
          const postData = [];
          snapshot.forEach(doc => {
            postData.push({
              ...doc.data(),
              id: doc.id,
            })
          })
          setMainData(postData);
          setLoading(false)
        }
      })
  }, [])
  useEffect(() => {
    setDepositLoading(true);
    setData([]);
    firebase.firestore().collection(table.CollectiveTick)
      .where('granularity', "==", depositGranularity)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        if (snapshot.empty) {
          setDepositLoading(false);
        } else {
          const postData = [];
          snapshot.forEach(doc =>
            postData.push({
              ...doc.data(),
              id: doc.id,
            })
          )
          setData(postData);
          setDepositLoading(false);
        }
      })
  }, [depositGranularity])
  useEffect(() => {
    setDepositChartLoading(true);
    setDepositTicks([]);
    firebase.firestore().collection(table.CollectiveTick)
      .where('granularity', "==", depositChartGranularity)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        if (snapshot.empty) {
          setDepositChartLoading(false);
        } else {
          const depositTicks = [];
          snapshot.forEach(doc => depositTicks.push([doc.data().time * 1000, doc.data().volume]))
          setDepositTicks(depositTicks);
          setDepositChartLoading(false);
        }
      })
  }, [depositChartGranularity])
  const role = "admin";
  const activeUsers = mainData.filter(res => res.id === "active");
  const referredUsers = mainData.filter(res => res.id === "referred");
  const businessUsers = mainData.filter(res => res.id === "business");
  const personalUsers = mainData.filter(res => res.id === "personal");
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={3} md={4} sm={6} className={classes.dflex}>
        <Can
          role={role}
          perform="showAllusers:showAllusers"
          yes={() => (
            <Widget title="Total Users" disableWidgetMenu>
              <div className={classes.dashBox}>
                <div className={classes.content}>
                  <h2 className={classes.mainVal}>{loading ? <>Loading...</> : <>{(businessUsers && businessUsers[0] && businessUsers[0].count) + (personalUsers && personalUsers[0] && personalUsers[0].count)}</>}</h2>
                </div>
                <div className={classes.footer}>
                  <div className={classes.leftSide}>
                    <span className={classes.property}>Active Users</span>
                    <span className={classes.value}>{loading ? <>Loading...</> : <>{activeUsers && activeUsers[0] && activeUsers[0].count}</>}</span>
                  </div>
                  <div className={classes.vl}></div>
                  <div className={classes.rightSide}>
                    <span className={classes.property}>Referred Users</span>
                    <span className={classes.value}>{loading ? <>Loading...</> : <>{referredUsers && referredUsers[0] && referredUsers[0].count}</>}</span>
                  </div>
                </div>
              </div>
            </Widget>
          )}
          no={() => <h2>User can't see</h2>}
        />
      </Grid>
      <Grid item xs={12} lg={3} md={4} sm={6} className={classes.dflex}>
        <Widget title="Deposit Amount" disableWidgetMenu>
          <div className={classes.dashBox}>
            <div className={classes.header}>
              <span className={classes.title}></span>
              <div className={classes.dateTime}>
                <button data-testid="button-Dashboard" onClick={() => { setDepositActiveTab("D"); setDepositGranularity(1440) }} className={depositActiveTab === "D" ? classes.activeDtItem : classes.dtItem}>D</button>
                <button data-testid="button-Dashboard2" onClick={() => { setDepositActiveTab("W"); setDepositGranularity(10080) }} className={depositActiveTab === "W" ? classes.activeDtItem : classes.dtItem}>W</button>
                <button data-testid="button-Dashboard3" onClick={() => { setDepositActiveTab("M"); setDepositGranularity(43200) }} className={depositActiveTab === "M" ? classes.activeDtItem : classes.dtItem}>M</button>
                <button data-testid="button-Dashboard4" onClick={() => { setDepositActiveTab("A"); setDepositGranularity(518400) }} className={depositActiveTab === "A" ? classes.activeDtItem : classes.dtItem}>A</button>
              </div>
            </div>
            <div className={classes.content}>
              <h2 className={classes.mainVal}>${depositLoading ? <>Loading...</> : <>{data && data[0] ? data[0].volume : 0}</>}</h2>
            </div>
            <div className={classes.footer}>
              <div className={classes.leftSide}>
                <span className={classes.property}>Deposit Count</span>
                <span className={classes.value}>{depositLoading ? <>Loading...</> : <>{data && data[0] ? data[0].count : 0}</>}</span>
              </div>
              <div className={classes.vl}></div>
              <div className={classes.rightSide}>
                <span className={classes.property}>Average Amount</span>
                <span className={classes.value}>{depositLoading ? <>Loading...</> : <>{data && data[0] ? data[0].averageVolume : 0}</>}</span>
              </div>
            </div>
          </div>
        </Widget>
      </Grid>
      <Grid item xs={12} lg={3} md={4} sm={6} className={classes.dflex}>
        <Widget title="Total Withdrawal" disableWidgetMenu>
          <div className={classes.dashBox}>
            <div className={classes.header}>
              <span className={classes.title}></span>
              <div className={classes.dateTime}>
                <button data-testid="button-Dashboard5" onClick={() => setWithdrawalActiveTab("D")} className={withdrawalActiveTab === "D" ? classes.activeDtItem : classes.dtItem}>D</button>
                <button data-testid="button-Dashboard6" onClick={() => setWithdrawalActiveTab("W")} className={withdrawalActiveTab === "W" ? classes.activeDtItem : classes.dtItem}>W</button>
                <button data-testid="button-Dashboard7" onClick={() => setWithdrawalActiveTab("M")} className={withdrawalActiveTab === "M" ? classes.activeDtItem : classes.dtItem}>M</button>
                <button data-testid="button-Dashboard8" onClick={() => setWithdrawalActiveTab("A")} className={withdrawalActiveTab === "A" ? classes.activeDtItem : classes.dtItem}>A</button>
              </div>
            </div>
            <div className={classes.content}>
              <h2 className={classes.mainVal}>$99.01234 M</h2>
            </div>
            <div className={classes.footer}>
              <div className={classes.leftSide}>
                <span className={classes.property}>Withdrawal Count</span>
                <span className={classes.value}>15</span>
              </div>
              <div className={classes.vl}></div>
              <div className={classes.rightSide}>
                <span className={classes.property}>Average Amount</span>
                <span className={classes.value}>$99.01234567 M</span>
              </div>
            </div>
          </div>
        </Widget>
      </Grid>
      <Grid item xs={12} lg={3} md={4} sm={6} className={classes.dflex}>
        <Widget title="Float Amount" disableWidgetMenu>
          <div className={classes.dashBox}>
            <div className={classes.content}>
              <h2 className={classes.mainVal}>$99.01234 M</h2>
            </div>
          </div>
        </Widget>
      </Grid>
      <Grid item xs={12} lg={3} md={4} sm={6} className={classes.dflex}>
        <Widget title="Total Investment" disableWidgetMenu>
          <div className={classes.dashBox}>
            <div className={classes.content}>
              <h2 className={classes.mainVal}>$3 M</h2>
            </div>
            <div className={classes.footer}>
              <div className={classes.leftSide}>
                <span className={classes.property}>CeFi</span>
                <span className={classes.value}>$99.01234 M</span>
              </div>
              <div className={classes.vl}></div>
              <div className={classes.rightSide}>
                <span className={classes.property}>DeFi</span>
                <span className={classes.value}>$99.01234 M</span>
              </div>
            </div>
          </div>
        </Widget>
      </Grid>
      <Grid item xs={12} lg={3} md={4} sm={6} className={classes.dflex}>
        <Widget title="Total YIELDS" disableWidgetMenu>
          <div className={classes.dashBox}>
            <div className={classes.header}>
              <span className={classes.title}></span>
              <div className={classes.apy}>APY: 10%</div>
            </div>
            <div className={classes.content}>
              <h2 className={classes.mainVal}>$3 M</h2>
            </div>
            <div className={classes.footer}>
              <div className={classes.leftSide}>
                <span className={classes.property}>CeFi YIELD</span>
                <span className={classes.value}>$99.01234 M</span>
                <span className={classes.percentVal}>+0.7%</span>
              </div>
              <div className={classes.vl}></div>
              <div className={classes.rightSide}>
                <span className={classes.property}>DeFi YIELD</span>
                <span className={classes.value}>$99.01234 M</span>
                <span className={classes.percentVal}>+2.0%</span>
              </div>
            </div>
          </div>
        </Widget>
      </Grid>
      <Grid item xs={12} lg={3} md={4} sm={6} className={classes.dflex}>
        <Widget title="Total Earning" disableWidgetMenu>
          <div className={classes.dashBox}>
            <div className={classes.header}>
              <span className={classes.title}></span>
            </div>
            <div className={classes.content}>
              <h2 className={classes.mainVal}>$5 M</h2>
            </div>
            <div className={classes.footer}>
              <div className={classes.leftSide}>
                <span className={classes.property}>Customer</span>
                <span className={classes.value}>$3 M</span>
              </div>
              <div className={classes.vl}></div>
              <div className={classes.rightSide}>
                <span className={classes.property}>Company</span>
                <span className={classes.value}>$2 M</span>
              </div>
            </div>
          </div>
        </Widget>
      </Grid>
      <Grid item xs={12} lg={3} md={4} sm={6} className={classes.dflex}>
        <Widget title="Rewards" disableWidgetMenu>
          <div className={classes.dashBox}>
            <div className={classes.header}>
              <span className={classes.title}></span>
              <div className={classes.apy}>APY: 10%</div>
            </div>
            <div className={classes.content}>
              <h2 className={classes.mainVal}>$100</h2>
            </div>
            <div className={classes.footer}>
              <div className={classes.leftSide}>
                <span className={classes.property}>Company</span>
                <span className={classes.value}>$2 M</span>
              </div>
            </div>
          </div>
        </Widget>
      </Grid>
      <Grid item xs={12} lg={3} md={4} sm={6} className={classes.dflex}>
        <Widget title="Expenses" disableWidgetMenu>
          <div className={classes.dashBox}>
            <div className={classes.title}>Transaction Fee</div>
            <div className={classes.content}>
              <div className={classes.proList}>
                <span className={classes.pro}>Circle</span>
                <span className={classes.val}>$2.50%</span>
              </div>
              <div className={classes.proList}>
                <span className={classes.pro}>Revolut</span>
                <span className={classes.val}>$3.50%</span>
              </div>
              <div className={classes.proList}>
                <span className={classes.pro}>CeFi</span>
                <span className={classes.val}>$1.00%</span>
              </div>
              <div className={classes.proList}>
                <span className={classes.pro}>DeFi</span>
                <span className={classes.val}>$0.2%</span>
              </div>
              <div className={classes.proList}>
                <span className={classes.pro}>We Cashup</span>
                <span className={classes.val}>$2.50%</span>
              </div>
              <div className={classes.proList}>
                <span className={classes.pro}>Circle</span>
                <span className={classes.val}>$2.50%</span>
              </div>
            </div>
            <br />
            <div className={classes.title}>Marketing Fees</div>
            <div className={classes.content}>
              <div className={classes.proList}>
                <span className={classes.pro}>Rewards</span>
                <span className={classes.val}>$3%</span>
              </div>
            </div>
          </div>
        </Widget>
      </Grid>
      <Grid item xs={12} lg={3} md={4} sm={6} className={classes.dflex}>
        <Widget title="Users Overview" disableWidgetMenu>
          <ApexPieChart loading={loading} data={[activeUsers && activeUsers[0] && activeUsers[0].count, referredUsers && referredUsers[0] && referredUsers[0].count]} />
        </Widget>
      </Grid>
      <Grid item lg={6} md={12} className={classes.dflex}>
        <Widget title="Overview Chart" disableWidgetMenu>
          <div className={classes.header}>
            <span className={classes.title}></span>
            <div className={classes.dateTime}>
              <button data-testid="button-Dashboard9" onClick={() => { setChartActiveTab("D"); setDepositChartGranularity(1440) }} className={chartActiveTab === "D" ? classes.activeDtItem : classes.dtItem}>D</button>
              <button data-testid="button-Dashboard10" onClick={() => { setChartActiveTab("W"); setDepositChartGranularity(10080) }} className={chartActiveTab === "W" ? classes.activeDtItem : classes.dtItem}>W</button>
              <button data-testid="button-Dashboard11" onClick={() => { setChartActiveTab("M"); setDepositChartGranularity(43200) }} className={chartActiveTab === "M" ? classes.activeDtItem : classes.dtItem}>M</button>
              <button data-testid="button-Dashboard12" onClick={() => { setChartActiveTab("A"); setDepositChartGranularity(518400) }} className={chartActiveTab === "A" ? classes.activeDtItem : classes.dtItem}>A</button>
            </div>
          </div>
          {depositChartLoading ? <div className={classes.chartLoaderDiv}><CircularProgress size={26} className={classes.chartLoader} /></div> : <ApexLineChart data={[
            {
              name: "Deposit",
              data: depositTicks,
            },
            {
              name: "Withdrawal",
              data: [11, 32, 45, 32, 34, 52, 41],
            },
            {
              name: "Investment",
              data: [40, 29, 36, 60, 25, 73, 85],
            },
          ]} />}
        </Widget>
      </Grid>
      <Grid item xs={12} lg={6} md={6} sm={12} className={classes.dflex}>
        <Widget title="Income" disableWidgetMenu>
          <div className={classes.dashBox}>
            <div className={classes.content}>
              <div className={classes.proList}>
                <span className={classes.pro}>Company</span>
                <span className={classes.val}>$55%</span>
              </div>
              <div className={classes.proList}>
                <span className={classes.pro}>Revolut</span>
                <span className={classes.val}>$3.50%</span>
              </div>
              <div className={classes.proList}>
                <span className={classes.pro}>Exchange</span>
                <span className={classes.val}>$3%</span>
              </div>
              <div className={classes.proList}>
                <span className={classes.pro}>Personal Transaction</span>
                <span className={classes.val}>$0%</span>
              </div>
              <div className={classes.proList}>
                <span className={classes.pro}>Business Transaction</span>
                <span className={classes.val}>$2.50%</span>
              </div>
              <div className={classes.proList}>
                <span className={classes.pro}>Charity Transaction</span>
                <span className={classes.val}>$0%</span>
              </div>
            </div>
          </div>
        </Widget>
      </Grid>
      <Grid item xs={12} lg={6} md={6} sm={12}>
        <Widget title="Profit and Loss" disableWidgetMenu>
          <div className={classes.profitLossHeader}>
            <div className={`${classes.dateTime} ${"Days"}`}>
              <button data-testid="button-Dashboard13" onClick={() => setProfitLossActiveTab("D")} className={profitLossActiveTab === "D" ? classes.activeDtItem : classes.dtItem}>D</button>
              <button data-testid="button-Dashboard14" onClick={() => setProfitLossActiveTab("W")} className={profitLossActiveTab === "W" ? classes.activeDtItem : classes.dtItem}>W</button>
              <button data-testid="button-Dashboard15" onClick={() => setProfitLossActiveTab("M")} className={profitLossActiveTab === "M" ? classes.activeDtItem : classes.dtItem}>M</button>
              <button data-testid="button-Dashboard16" onClick={() => setProfitLossActiveTab("A")} className={profitLossActiveTab === "A" ? classes.activeDtItem : classes.dtItem}>A</button>
            </div>
          </div>
          <ApexBarChart loading={loading} data={[
            {
              name: "Net Profit",
              data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
            },
            {
              name: "Revenue",
              data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
            },
          ]} />
        </Widget>
      </Grid>
    </Grid>
  );
};
export default Dashboard;