import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import NumericLabel from 'react-pretty-numbers';
import Widget from "../../components/Widget/Widget";
import Switch from "@material-ui/core/Switch";
import { Redirect } from "react-router-dom";
import { firebase, table } from "../../config";

export default function CustomerInformationPage({ location }) {
  var classes = useStyles();
  const [balance, setBalance] = useState({
    usd: "0",
    gbp: "0",
    eur: "0",
  });
  const { query } = location || '';
  useEffect(() => {
    if (!!query) {
      getAllBalance(query.uid);
    }
  }, []);
  const getAllBalance = id => {
    firebase
      .firestore()
      .collection(table.Accounts)
      .doc(id)
      .collection(table.balances)
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(doc => {
          setBalance(prevBalance => ({
            ...prevBalance,
            [doc.doc.data().currency]: doc.doc.data().available,
          }));
        });
      });
  };
  if (!!query) {
    let data = { ...query };
    return (
      <Widget disableWidgetMenu>
        <div className={classes.title}>Customer Information</div>
        <div className={classes.custInfo}>
          <div className={classes.balanceList}>
            <div className={classes.balItem}>
              <p className={classes.baLabel}>USD Balance</p>
              <h4 className={classes.bal}>$<NumericLabel params={{
                'shortFormat': true,
                'shortFormatMinValue': 10000,
                'shortFormatPrecision': 2,
              }} >{balance.usd}</NumericLabel></h4>
            </div>
            <div className={classes.balItem}>
              <p className={classes.baLabel}>GBP Balance</p>
              <h4 className={classes.bal}>£<NumericLabel params={{
                'shortFormat': true,
                'shortFormatMinValue': 10000,
                'shortFormatPrecision': 2,
              }} >{balance.gbp}</NumericLabel></h4>
            </div>
            <div className={classes.balItem}>
              <p className={classes.baLabel}>EUR Balance</p>
              <h4 className={classes.bal}>€<NumericLabel params={{
                'shortFormat': true,
                'shortFormatMinValue': 10000,
                'shortFormatPrecision': 2,
              }} >{balance.eur}</NumericLabel></h4>
            </div>
          </div>
          <div className={classes.inForm}>
            <div className={classes.form}>
              <div className={classes.fieldContainer}>
                <div className={classes.fieldCont}>
                  <div className={classes.label}>First Name</div>
                  <div className={classes.showRes}>{data.firstName}</div>
                </div>
                <div className={classes.fieldCont}>
                  <div className={classes.label}>Last Name</div>
                  <div className={classes.showRes}>{data.lastName}</div>
                </div>
              </div>
              <div className={classes.fieldContainer}>
                <div className={classes.fieldCont}>
                  <div className={classes.label}>Contact No. </div>
                  <div className={classes.showRes}>{data.phone}</div>
                </div>
                <div className={classes.fieldCont}>
                  <div className={classes.label}>Email</div>
                  <div className={classes.showRes}>{data.email}</div>
                </div>
              </div>
              <div className={classes.fieldContainer}>
                <div className={classes.fieldCont}>
                  <div className={classes.label}>Status</div>
                  <div className={classes.showRes}>{data.status}</div>
                </div>
                <div className={classes.fieldCont}>
                  <div className={classes.label}>KYC Status</div>
                  <Switch checked={data.kycVerified} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Widget>
    );
  } else {
    return <Redirect to="/app/customer-management" />;
  }
}