import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import Select from 'react-select';
import countryList from 'react-select-country-list';
import Widget from "../../components/Widget";
import Table from "../../components/Basic-component/table";
import Filters from "../../images/filters.svg";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Arrow from "../../images/import.svg";
import MySelect from '@material-ui/core/Select';
import { statuses } from "../../config";

export default function ReportsPage() {
  const [balance, setBalance] = React.useState('');
  const [deposit, setDeposit] = React.useState('');
  const [withdrawal, setWithdrawal] = React.useState('');
  const [value, setValue] = React.useState('');
  const [options, setOptions] = React.useState(countryList().getData());
  const handleChange1 = (event) => {
    setBalance(event.target.value);
  };
  useEffect(() => {
    setOptions(countryList().getData())
  }, [])
  const handleChange = (event) => {
    setDeposit(event.target.value);
  };
  const changeHandler = value => {
    setValue(value)
  }
  const handleChange2 = (event) => {
    setWithdrawal(event.target.value);
  };
  var classes = useStyles();
  const columns = [
    {
      title: "Full Name",
      customFilterAndSearch: (term, rowData) => (rowData.firstName + ' ' + rowData.lastName).toLowerCase().indexOf(term.toLowerCase()) !== -1,
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
          <Link
            to={{ pathname: `/app/individual-report/` }}
          >
            <p className={classes.fields}>
              {rowData.firstName}&nbsp;{rowData.lastName}
            </p>
          </Link>
        </div>
      ),
    },
    { title: "Contact No.", field: "phone" },
    {
      title: "User Type", field: "userType", render: rowData => <p className={classes.fields}>
        {rowData.userType}
      </p>
    },
    {
      title: "Country", field: "country", render: rowData => <p className={classes.fields}>
        {rowData.country}
      </p>
    },
    {
      title: "Deposits", field: "deposits", render: rowData => <p className={classes.fields}>
        {rowData.deposits}
      </p>
    },
    {
      title: "Withdrawals", field: "withdrawals", render: rowData => <p className={classes.fields}>
        {rowData.withdrawals}
      </p>
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
      phone: "+30-1234567",
      userType: "Personal",
      country: "United States",
      deposits: "$200",
      withdrawals: "$10",
      status: "Enabled",
    },
    {
      firstName: "Marco",
      profile: "https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png",
      lastName: "Bizzarri",
      email: "user@user.com",
      phone: "+30-1234567",
      userType: "Business",
      country: "Australia",
      deposits: "$50.123",
      withdrawals: "$20",
      status: "Suspended",
    },
  ];
  var [activeTabId, setActiveTabId] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const toggle = () => {
    if (filterOpen) {
      return setFilterOpen(false)
    }
    setFilterOpen(true)
  }
  return (
    <Widget disableWidgetMenu>
      <div className={classes.title}>Reports</div>
      <div className={classes.staffList}>
        <div className="w-100">
          <button
            data-testid="button-ReportsPage"
            onClick={() => setActiveTabId(0)}
            className={
              activeTabId === 0 ?
                classes.designationBoxSelected
                : classes.designationBox}
          >
            All
          </button>
          <button
            data-testid="button-ReportsPage2"
            onClick={() => setActiveTabId(1)}
            className={
              activeTabId === 1 ?
                classes.designationBoxSelected : classes.designationBox}
          >
            Customer
          </button>
          <button
            data-testid="button-ReportsPage3"
            onClick={() => setActiveTabId(2)}
            className={activeTabId === 2 ?
              classes.designationBoxSelected : classes.designationBox}
          >
            Business
          </button>
          <button
            data-testid="button-ReportsPage4"
            onClick={() => setActiveTabId(3)}
            className={activeTabId === 3 ?
              classes.designationBoxSelected : classes.designationBox}
          >
            User Apps
          </button>
        </div>
        <button data-testid="button-ReportsPage5" onClick={toggle} className="FilterBtn btn btn-default"><img src={Filters} alt="Filters" />Filters</button>
      </div>
      {filterOpen &&
        <div className="FiltersCont">
          <Select
            options={options}
            value={value}
            onChange={changeHandler}
            className="CountrySelect"
          />
          <FormControl className={classes.formControl}>
            <img alt="ArrowImg" className="ArrowImg" src={Arrow} />
            <MySelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={balance}
              placeholder="Balance"
              onChange={handleChange1}
            >
              <MenuItem value={"Twenty"}>Twenty</MenuItem>
              <MenuItem value={"Thirty"}>Thirty</MenuItem>
            </MySelect>
          </FormControl>
          <FormControl className={classes.formControl}>
            <img alt="ArrowImg" className="ArrowImg" src={Arrow} />
            <MySelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={deposit}
              placeholder="Deposit"
              onChange={handleChange}
            >
              <MenuItem value={"Sort Bottom to Top"}>Sort Bottom to Top</MenuItem>
              <MenuItem value={"Sort Top to Bottom"}>Sort Top to Bottom</MenuItem>
              <MenuItem value={"Custom Sort"}>Custom Sort</MenuItem>
            </MySelect>
          </FormControl>
          <FormControl className={classes.formControl}>
            <img alt="ArrowImg" className="ArrowImg" src={Arrow} />
            <MySelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={withdrawal}
              placeholder="Withdrawal"
              onChange={handleChange2}
            >
              <MenuItem value={"Ten"}>Ten</MenuItem>
              <MenuItem value={"Twenty"}>Twenty</MenuItem>
              <MenuItem value={"Thirty"}>Thirty</MenuItem>
            </MySelect>
          </FormControl>
          <button data-testid="button-ReportsPage6" className="btn btn-default ResetBtn">Reset</button>
        </div>
      }
      {activeTabId === 0 && (
        <Table
          data={data}
          message="No records to display"
          columns={columns}
          title="All Reports"
        />
      )}
      {activeTabId === 1 && (
        <Table
          data={data}
          columns={columns}
          message="No records to display"
          title="Customer Approval"
        />
      )}
      {activeTabId === 2 && (
        <Table
          data={data}
          columns={columns}
          message="No records to display"
          title="Charity Approval"
        />
      )}
      {activeTabId === 3 && (
        <Table
          data={data}
          columns={columns}
          message="No records to display"
          title="Fee Approval"
        />
      )}
    </Widget>
  );
}