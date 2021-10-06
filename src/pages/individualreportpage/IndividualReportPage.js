import React from "react";
import useStyles from "./styles";
import NumericLabel from 'react-pretty-numbers';
import Widget from "../../components/Widget/Widget";
import CustomWidget from "../../components/CustomWidget/CustomWidget";
import Switch from "@material-ui/core/Switch";
import Table from "../../components/Basic-component/table";
import { statuses } from "../../config";

export default function IndividualReportPage() {
  var classes = useStyles();
  const columns = [
    {
      title: "Date",
      render: () => (
        <div>
          <p className="mb-0">06:41</p>
          <p className="greyText mt-0">04/05/2020</p>
        </div>
      ),
    },
    { title: "Action", field: "Action" },
    {
      title: "Recipient", field: "Recep"
    },
    {
      title: "Amount", field: "Amount",
      render: () => (
        <div>
          <p className="mb-0">$50</p>
          <p className="greyText mt-0">MasterCard</p>
        </div>
      ),
    },
    {
      title: "Fee", field: "Fee"
    },
    {
      title: "Note", field: "Note",
    },
    {
      title: "Status",
      field: "status",
      searchable: false,
      cellStyle: {
        textAlign: "center",
      },
      render: rowData => (
        <>
          {rowData.status === statuses.enabled ? (
            <div className={classes.userEnabledStatus}>
              <p className={classes.enabled}>{rowData.status}</p>
            </div>
          ) : (
            <div className={classes.userSuspendStatus}>
              <p className={classes.suspended}>{rowData.status}</p>
            </div>
          )}
        </>
      ),
    },
  ];

  const data = [
    {
      firstName: "Cris",
      profile: "https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png",
      lastName: "Trung",
      email: "user@user.com",
      Action: "Deposit",
      Note: "---",
      Recep: "---",
      Amount: "$50",
      Fee: "$0.00",
      status: "Enabled",
    },
    {
      firstName: "Marco",
      profile: "https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png",
      lastName: "Bizzarri",
      email: "user@user.com",
      Action: "Withdraw",
      Note: "---",
      Recep: "---",
      Amount: "$50",
      Fee: "$0.00",
      status: "Suspended",
    },
  ];
  return (
    <>
      <Widget disableWidgetMenu>
        <div className={classes.title}>Customer Information</div>
        <div className={classes.custInfo}>
          <div className={classes.inForm}>
            <div className={classes.form}>
              <div className={classes.fieldContainer}>
                <div className={classes.fieldCont}>
                  <div className={classes.label}>First Name</div>
                  <div className={classes.showRes}>Cris</div>
                </div>
                <div className={classes.fieldCont}>
                  <div className={classes.label}>Last Name</div>
                  <div className={classes.showRes}>Trung</div>
                </div>
              </div>
              <div className={classes.fieldContainer}>
                <div className={classes.fieldCont}>
                  <div className={classes.label}>Contact No. </div>
                  <div className={classes.showRes}>+30-5324154</div>
                </div>
                <div className={classes.fieldCont}>
                  <div className={classes.label}>Email</div>
                  <div className={classes.showRes}>cris.trung@cashero.com</div>
                </div>
              </div>
              <div className={classes.fieldContainer}>
                <div className={classes.fieldCont}>
                  <div className={classes.label}>Status</div>
                  <div className={classes.showRes}>
                    Enable
                  </div>
                </div>
                <div className={classes.fieldCont}>
                  <div className={classes.label}>KYC Status</div>
                  <Switch checked={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Widget>
      <CustomWidget>
        <div className="TotalBalance">
          <div className="BalanceBox">
            <div className="BalanceText">Total Balance</div>
            <div className={classes.balanceList}>
              <div className={classes.balItem}>
                <p className={classes.baLabel}>USD Balance</p>
                <h4 className={classes.bal}>$<NumericLabel params={{
                  'shortFormat': true,
                  'shortFormatMinValue': 10000,
                  'shortFormatPrecision': 2,
                }} >10000</NumericLabel></h4>
              </div>
              <div className={classes.balItem}>
                <p className={classes.baLabel}>GBP Balance</p>
                <h4 className={classes.bal}>€<NumericLabel params={{
                  'shortFormat': true,
                  'shortFormatMinValue': 10000,
                  'shortFormatPrecision': 2,
                }} >10000</NumericLabel></h4>
              </div>
              <div className={classes.balItem}>
                <p className={classes.baLabel}>EUR Balance</p>
                <h4 className={classes.bal}>£<NumericLabel params={{
                  'shortFormat': true,
                  'shortFormatMinValue': 10000,
                  'shortFormatPrecision': 2,
                }} >10000</NumericLabel></h4>
              </div>
            </div>
          </div>
          <div className="BalanceBox">
            <div className="BalanceText">Summary</div>
            <div className={classes.balanceList}>
              <div className={classes.balItem}>
                <p className={classes.baLabel}>Total Referrals</p>
                <h4 className={classes.bal}>$<NumericLabel params={{
                  'shortFormat': true,
                  'shortFormatMinValue': 10000,
                  'shortFormatPrecision': 2,
                }} >2</NumericLabel></h4>
              </div>
              <div className={classes.balItem}>
                <p className={classes.baLabel}>Total Interest</p>
                <h4 className={classes.bal}>$<NumericLabel params={{
                  'shortFormat': true,
                  'shortFormatMinValue': 10000,
                  'shortFormatPrecision': 2,
                }} >8.12345678</NumericLabel></h4>
              </div>
              <div className={classes.balItem}>
                <p className={classes.baLabel}>Total Deposits</p>
                <h4 className={classes.bal}>$<NumericLabel params={{
                  'shortFormat': true,
                  'shortFormatMinValue': 10000,
                  'shortFormatPrecision': 2,
                }} >98765432</NumericLabel></h4>
              </div>
              <div className={classes.balItem}>
                <p className={classes.baLabel}>Total Withdrawals</p>
                <h4 className={classes.bal}>$<NumericLabel params={{
                  'shortFormat': true,
                  'shortFormatMinValue': 10000,
                  'shortFormatPrecision': 2,
                }} >12345678</NumericLabel></h4>
              </div>
            </div>
          </div>
        </div>
      </CustomWidget>
      <CustomWidget>
        <div className="BalanceText">Transaction History</div>
        <div className="Tabletoolbar">
          <Table
            data={data}
            columns={columns}
            message={"No records to display"}
            title=""
            search={false}
          />
        </div>
      </CustomWidget>
    </>
  );
}
