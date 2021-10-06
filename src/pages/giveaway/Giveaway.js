import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import Widget from "../../components/Widget";
import Table from "../../components/Basic-component/table";
import { firebase, statuses, table } from "../../config";
import { CircularProgress } from "@material-ui/core";
import NumericLabel from 'react-pretty-numbers';
import moment from "moment";
import { sha256 } from 'js-sha256';

export default function Giveaway() {
  const classes = useStyles();
  const [activeTabId, setActiveTabId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [winData, setWinData] = useState([]);
  const [referrerData, setReferrerData] = useState([]);
  useEffect(() => {
    setTableLoading(true);
    if (activeTabId === 0) {
      setData([]);
      firebase
        .firestore()
        .collection(table.GoldenTicketDetail)
        .orderBy("createdAt", "desc")
        .onSnapshot(snapshot => {
          const postData = [];
          snapshot.forEach(doc => postData.push({
            ...doc.data(),
            profile: doc.data().phone ? `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_PROJECT_ID ? process.env.REACT_APP_PROJECT_ID : "cashero-development-76cca"}.appspot.com/o/artifacts%2F${sha256(doc.data().phone)}%2Fprofile%2F${sha256(doc.data().phone)}.jpg?alt=media` : null
          })
          );
          setData(postData);
          setTableLoading(false);
        }, () => {
          setTableLoading(false);
          setMessage("Permission Denied.")
        });
    }
    else if (activeTabId === 1) {
      setWinData([]);
      firebase
        .firestore()
        .collection(table.GoldenTicketDetail)
        .orderBy("createdAt", "desc")
        .where("status", "==", "win")
        .onSnapshot(snapshot => {
          const postData = [];
          snapshot.forEach(doc => postData.push({
            ...doc.data(),
            profile: doc.data().phone ? `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_PROJECT_ID ? process.env.REACT_APP_PROJECT_ID : "cashero-development-76cca"}.appspot.com/o/artifacts%2F${sha256(doc.data().phone)}%2Fprofile%2F${sha256(doc.data().phone)}.jpg?alt=media` : null
          })
          );
          setWinData(postData);
          setTableLoading(false);
        }, () => {
          setTableLoading(false);
          setMessage("Permission Denied.")
        });
    }
    else {
      setReferrerData([]);
      firebase
        .firestore()
        .collection(table.GoldenTicketDetail)
        .orderBy("createdAt", "desc")
        .where("type", "==", "referred")
        .onSnapshot(snapshot => {
          const postData = [];
          snapshot.forEach(doc => postData.push({
            ...doc.data(),
            profile: doc.data().phone ? `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_PROJECT_ID ? process.env.REACT_APP_PROJECT_ID : "cashero-development-76cca"}.appspot.com/o/artifacts%2F${sha256(doc.data().phone)}%2Fprofile%2F${sha256(doc.data().phone)}.jpg?alt=media` : null
          })
          );
          setReferrerData(postData);
          setTableLoading(false);
        }, () => {
          setTableLoading(false);
          setMessage("Permission Denied.")
        });
    }
  }, [activeTabId])
  useEffect(() => {
    firebase
      .firestore()
      .collection(table.JackPot)
      .where("status", "==", statuses.Enabled)
      .onSnapshot(snapshot => {
        const postData = [];
        snapshot.forEach(doc =>
          postData.push({
            ...doc.data(),
            id: doc.id,
          }),
        );
        setMainData(postData);
        setLoading(false);
      });
  }, [])
  const columns = [
    { title: "ICD Finlit User ID", field: "uid" },
    {
      title: "Full Name",
      field: "fullName",
      render: rowData => (
        <div className={classes.userName}>
          <div className={classes.userImg}>
            {rowData.profile ? (
              <img
                src={rowData.profile}
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
          <p className={classes.fields}>
            {rowData.fullName}
          </p>
        </div>
      ),
    },
    {
      title: "Country", field: "country"
    },
    {
      title: "Registered Time", defaultSort: 'desc', field: "createdAt", render: data => <div>{data && data.createdAt ? moment(data && data.createdAt && data.createdAt.toDate())
        .local()
        .format("DD/MM/YYYY HH:mm:ss") : ""}</div>
    },
    {
      title: "Golden Tickets", searchable: false, field: "count", render: rowData => <p className="d-flex">
        {rowData.count ? <NumericLabel params={{
          'shortFormat': true,
          'shortFormatMinValue': 100000,
        }} >{rowData.count}</NumericLabel> : 0}
      </p>
    },
    {
      title: "Win Count", searchable: false, field: "winCount", render: rowData => <p className="d-flex">
        {rowData.winCount ? <NumericLabel params={{
          'shortFormat': true,
          'shortFormatMinValue': 100000,
        }} >{rowData.winCount}</NumericLabel> : 0}
      </p>
    },
    {
      title: "Referees", searchable: false, field: "refereesCount", render: rowData => <p className="d-flex">
        {rowData.refereesCount ? <NumericLabel params={{
          'shortFormat': true,
          'shortFormatMinValue': 100000,
        }} >{rowData.refereesCount}</NumericLabel> : 0}
      </p>
    },
    {
      title: "",
      cellStyle: {
        textAlign: "center",
      },
      render: rowData => (
        <>
          <Link
            to={{
              pathname: `/app/summary/`,
              query: { ...rowData },
            }}
          >
            <p className={classes.fields}>
              Details
            </p>
          </Link>
        </>
      ),
    },
  ];
  return (
    <>
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress color="secondary" size={60} thickness={5} />
        </div>
      ) : (
        <div className="GiveawayCont">
          <Widget disableWidgetMenu>
            <div className={classes.title}>Giveaway</div>
            <div className={classes.GiveawayCont}>
              <div className={classes.WinnersBox}>
                <p>Total Amount</p>
                <h3 className="d-flex">${mainData.length ? <NumericLabel params={{
                  'shortFormat': true,
                  'shortFormatMinValue': 100000,
                  'shortFormatPrecision': 2,
                }} >{mainData[0].totalAmount}</NumericLabel> : 0}</h3>
              </div>
              <div className={classes.WinnersBox}>
                <p>Distributed Amount</p>
                <h3 className="d-flex">${mainData.length ? <NumericLabel params={{
                  'shortFormat': true,
                  'shortFormatMinValue': 100000,
                  'shortFormatPrecision': 2,
                }} >{mainData[0].distributedAmount}</NumericLabel> : 0}</h3>
              </div>
              <div className={classes.WinnersBox}>
                <p>Remaining Amount</p>
                <h3 className="d-flex">${mainData.length ? <NumericLabel params={{
                  'shortFormat': true,
                  'shortFormatMinValue': 100000,
                  'shortFormatPrecision': 2,
                }} >{mainData[0].amount}</NumericLabel> : 0}</h3>
              </div>
              <div className={classes.WinnersBox}>
                <p>Total Users</p>
                <h3 className="d-flex">{mainData.length ? <NumericLabel params={{
                  'shortFormat': true,
                  'shortFormatMinValue': 100000,
                }} >{mainData[0].totalUsers}</NumericLabel> : 0}</h3>
              </div>
              <div className={classes.WinnersBox}>
                <p>Total Users Won</p>
                <h3 className="d-flex">{mainData.length ? <NumericLabel params={{
                  'shortFormat': true,
                  'shortFormatMinValue': 100000,
                }} >{mainData[0].totalUsersWon}</NumericLabel> : 0}</h3>
              </div>
              <div className={classes.WinnersBox}>
                <p>Total Golden Tickets</p>
                <h3 className="d-flex">{mainData.length ? <NumericLabel params={{
                  'shortFormat': true,
                  'shortFormatMinValue': 100000,
                }} >{mainData[0].totalGoldenTickets}</NumericLabel> : 0}</h3>
              </div>
            </div>
            <div className={classes.staffList}>
              <div className="w-100">
                <button
                  onClick={() => setActiveTabId(0)}
                  className={
                    activeTabId === 0 ?
                      classes.designationBoxSelected
                      : classes.designationBox}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTabId(1)}
                  className={
                    activeTabId === 1 ?
                      classes.designationBoxSelected : classes.designationBox}
                >
                  Winners
                </button>
                <button
                  onClick={() => setActiveTabId(2)}
                  className={activeTabId === 2 ?
                    classes.designationBoxSelected : classes.designationBox}
                >
                  Referrers
                </button>
              </div>
            </div>
            {tableLoading ? (
              <div className={classes.loading}>
                <CircularProgress color="secondary" size={60} thickness={5} />
              </div>
            ) : (
              <>
                {activeTabId === 0 && (
                  <Table
                    data={data}
                    message={message}
                    columns={columns}
                    title="All Users"
                  />
                )}
                {activeTabId === 1 && (
                  <Table
                    data={winData}
                    message={message}
                    columns={columns}
                    title="Winners"
                  />
                )}
                {activeTabId === 2 && (
                  <Table
                    data={referrerData}
                    message={message}
                    columns={columns}
                    title="Referrers"
                  />
                )}
              </>
            )}
          </Widget>
        </div>
      )}
    </>
  );
}