import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import Widget from "../../components/Widget";
import Table from "../../components/Basic-component/table";
import { Redirect } from "react-router-dom";
import { firebase, table } from "../../config";
import moment from "moment";
import NumericLabel from 'react-pretty-numbers';
import { CircularProgress } from "@material-ui/core";

export default function Summary({ location }) {
  var classes = useStyles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { query } = location || '';
  useEffect(() => {
    if (!!query) {
      getBusinessBalance(query.uid);
    }
  }, []);
  const getBusinessBalance = id => {
    firebase
      .firestore()
      .collection(table.GoldenTicketHistory)
      .orderBy("createdAt", "desc")
      .where("uid", "==", id)
      .onSnapshot(snapshot => {
        const postData = [];
        snapshot.forEach(doc =>
          postData.push({
            ...doc.data(),
          }),
        );
        setData(postData);
        setLoading(false);
      }, () => {
        setLoading(false);
        setMessage("Permission Denied.")
      });
  };
  const columns = [
    {
      title: "Win Amount", field: "amount", render: data =>
        <p className="d-flex">${data.amount ? <NumericLabel params={{
          'shortFormat': true,
          'shortFormatMinValue': 100000,
        }} >{data.amount}</NumericLabel> : 0}
        </p>
    },
    {
      title: "Referrer ICD Finlit User ID", field: "refferal", render: rowData => <p className={classes.fields}>
        {rowData.refferal}
      </p>
    },
    // {
    //   title: "Referee ICD Finlit User ID", field: "ticketId", render: rowData => <p className={classes.fields}>
    //     {rowData.refferal === "" ? "" : rowData.ticketId}
    //   </p>
    // },
    {
      title: "Date", field: "createdAt", defaultSort: 'desc', render: data => <p>
        {moment(data && data.createdAt && data.createdAt.toDate())
          .local()
          .format("DD/MM/YYYY HH:mm:ss")}
      </p>
    },
  ];
  if (!!query) {
    let queryData = { ...query };
    return (
      <>
        {loading ? (
          <div className={classes.loading}>
            <CircularProgress color="secondary" size={60} thickness={5} />
          </div>
        ) : (
          <div className="summaryCont">
            <Widget disableWidgetMenu>
              <div className={classes.title}>Summary</div>
              <div className="userProfile">
                <div className={classes.userImg}>
                  {queryData.profile ? (
                    <img
                      src={queryData.profile}
                      alt="Profile"
                      className={classes.imgIcon}
                    />
                  ) : (
                    <img
                      src="https://i.imgur.com/Vne9QFK.png"
                      alt="Profile"
                      className={classes.imgIcon}
                    />
                  )}
                </div>
                <div className="userName">
                  <p>{queryData.fullName}</p>
                  <p>ICD Finlit User ID: <span>{queryData.uid}</span></p>
                </div>
              </div>
              <div className={classes.GiveawayCont}>
                <div className={classes.WinnersBox}>
                  <p>Winning Amount</p>
                  <h3 className="d-flex">${queryData.winAmount ? <NumericLabel params={{
                    'shortFormat': true,
                    'shortFormatMinValue': 100000,
                  }} >{queryData.winAmount}</NumericLabel> : 0}
                  </h3>
                </div>
                {/* <div className={classes.WinnersBox}>
                  <p>Total Invited Users</p>
                  <h3 className="d-flex">{queryData.refereesCount ? <NumericLabel params={{
                    'shortFormat': true,
                    'shortFormatMinValue': 100000,
                  }} >{queryData.refereesCount}</NumericLabel> : 0}
                  </h3>
                </div> */}
                <div className={classes.WinnersBox}>
                  <p>Total Golden Tickets</p>
                  <h3 className="d-flex">{queryData.count ? <NumericLabel params={{
                    'shortFormat': true,
                    'shortFormatMinValue': 100000,
                  }} >{queryData.count}</NumericLabel> : 0}
                  </h3>
                </div>
                <div className={classes.WinnersBox}>
                  <p>Active Golden Tickets</p>
                  <h3 className="d-flex">{queryData.activeCount ? <NumericLabel params={{
                    'shortFormat': true,
                    'shortFormatMinValue': 100000,
                  }} >{queryData.activeCount}</NumericLabel> : 0}
                  </h3>
                </div>
                <div className={classes.WinnersBox}>
                  <p>Win Count</p>
                  <h3 className="d-flex">{queryData.winCount ? <NumericLabel params={{
                    'shortFormat': true,
                    'shortFormatMinValue': 100000,
                  }} >{queryData.winCount}</NumericLabel> : 0}
                  </h3>
                </div>
              </div>
              <Table
                data={data}
                columns={columns}
                message={message}
                title="Details"
              />
            </Widget>
          </div>
        )}
      </>
    );
  } else {
    return <Redirect to="/app/giveaway" />;
  }
}