import React from "react";
import useStyles from "./styles";
import Widget from "../../components/Widget/Widget";
import Switch from "@material-ui/core/Switch";
import Table from "../../components/Basic-component/table";

export default function ReportCustomerInfoPage() {
  var classes = useStyles();
  const columns = [
    {
      name: "date",
      label: "Date",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "recipient",
      label: "Recipient",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "amount",
      label: "Amount",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "fee",
      label: "Fee",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "note",
      label: "Note",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "status",
      label: "Status",
      searchable: false,
      options: {
        filter: true,
        sort: false,
        // customBodyRender: value => {
        //   return (
        //     <p className={classes.status}>
        //       <span className={classes.pending}>{value}</span>
        //     </p>
        //   );
        // },
      },
    },
  ];
  const data = [
    {
      date: '13/10/2020',
      action: "Deposit",
      recipient: "Malcoim Reyn",
      amount: "$500",
      fee: '$0.5',
      note: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
      status: "Pending",
    },
    {
      date: '13/10/2020',
      action: "Deposit",
      recipient: "Malcoim Reyn",
      amount: "$500",
      fee: '$0.5',
      note: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
      status: "Pending",
    },
    {
      date: '13/10/2020',
      action: "Deposit",
      recipient: "Malcoim Reyn",
      amount: "$500",
      fee: '$0.5',
      note: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
      status: "Pending",
    },
    {
      date: '13/10/2020',
      action: "Deposit",
      recipient: "Malcoim Reyn",
      amount: "$500",
      fee: '$0.5',
      note: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
      status: "Pending",
    },
    {
      date: '13/10/2020',
      action: "Deposit",
      recipient: "Malcoim Reyn",
      amount: "$500",
      fee: '$0.5',
      note: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
      status: "Pending",
    },
    {
      date: '13/10/2020',
      action: "Deposit",
      recipient: "Malcoim Reyn",
      amount: "$500",
      fee: '$0.5',
      note: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
      status: "Pending",
    },
  ];
  const tableOpts = {
    print: false,
    filter: false,
    selectableRows: false,
    responsive: "stacked",
    rowsPerPage: 10,
    download: false,
    viewColumns: false,
    searchOpen: false,
  };
  return (
    <Widget disableWidgetMenu>
      <div className={classes.title}>Customer Information</div>
      <div className={classes.custInfo}>
        <div className={classes.inForm}>
          <div className={classes.form}>
            <div className={classes.fieldContainer}>
              <div className={classes.fieldCont}>
                <div className={classes.label}>First Name</div>
                <div className={classes.showRes}>Cris Trung</div>
              </div>
              <div className={classes.fieldCont}>
                <div className={classes.label}>Last Name</div>
                <div className={classes.showRes}>Cris</div>
              </div>
            </div>
            <div className={classes.fieldContainer}>
              <div className={classes.fieldCont}>
                <div className={classes.label}>Contact No. </div>
                <div className={classes.showRes}>+30-1234567890</div>
              </div>
              <div className={classes.fieldCont}>
                <div className={classes.label}>Email</div>
                <div className={classes.showRes}>cris.trung@cashero.com</div>
              </div>
            </div>
            <div className={classes.fieldContainer}>
              <div className={classes.fieldCont}>
                <div className={classes.label}>Postcode/Zipcode</div>
                <div className={classes.showRes}>46000</div>
              </div>
              <div className={classes.fieldCont}>
                <div className={classes.label}>KYC Status</div>
                <Switch checked={true} />
              </div>
            </div>
          </div>
        </div>
        <div className={classes.balanceSummary}>
          <div className={classes.boxItem}>
            <div className={classes.head}>Total Balance</div>
            <div className={classes.balItem}>
              <p className={classes.left}>USD Balance</p>
              <p className={classes.right}>$10,000K</p>
            </div>
            <div className={classes.balItem}>
              <p className={classes.left}>GBP Balance</p>
              <p className={classes.right}>$10,000K</p>
            </div>
            <div className={classes.balItem}>
              <p className={classes.left}>EUR Balance</p>
              <p className={classes.right}>$10,000K</p>
            </div>
          </div>
          <div className={classes.boxItem}>
            <div className={classes.head}>Summary</div>
            <div className={classes.balItem}>
              <p className={classes.left}>Total Referrals</p>
              <p className={classes.right}>2</p>
            </div>
            <div className={classes.balItem}>
              <p className={classes.left}>Total Interest</p>
              <p className={classes.right}>$8.12345678</p>
            </div>
            <div className={classes.balItem}>
              <p className={classes.left}>Total Deposit</p>
              <p className={classes.right}>$42394732894623</p>
            </div>
            <div className={classes.balItem}>
              <p className={classes.left}>Total Withdraw</p>
              <p className={classes.right}>$343947832434</p>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.transactionHistory}>
        <div className={classes.head}>Transaction History</div>
        <Table
          data={data}
          message="No records to display"
          columns={columns}
          options={tableOpts}
          noPadding
        />
      </div>
    </Widget>
  );
}