import React, { useState } from "react";
import useStyles from "./styles";
import Widget from "../../components/Widget/Widget";
import Table from "../../components/Basic-component/table";
import MenuDropDown from "../../components/Basic-component/menuDropDown";
import Button from "../../components/Basic-component/button";

export default function CustomerSupportPage() {
  var classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const actionClick = value => {
    if (value === "Suspend") {
      handleClose();
    } else {
      handleClose();
    }
  };
  const handleOpen = e => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const menuOptions = [
    { name: "Enable", dot: "green" },
    { name: "Suspend", dot: "red" },
  ];
  const tableOpts = {
    print: false,
    filter: false,
    selectableRows: false,
    responsive: "stacked",
    rowsPerPage: 10,
    download: false,
    viewColumns: false,
    searchOpen: true,
  };
  const staffColumns = [
    {
      name: "name",
      label: "Employee Name",
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => {
          return (
            <p className={classes.userImg}>
              <img src={value[1]} className={classes.imgIcon} alt={value[0]} />
              {value[0]}
            </p>
          );
        },
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "department",
      label: "Department",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "role",
      label: "Role",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "change",
      label: "Change",
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => {
          return (
            <Button>Suspend Account</Button>
          );
        },
      },
    },
    {
      name: "time",
      label: "Time",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "status",
      label: "Status",
      searchable: false,
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "action",
      label: "Action",
      type: "numeric",
      options: {
        filter: false,
        sort: false,
        customBodyRender: value => {
          return (
            <MenuDropDown
              options={menuOptions}
              onClick={actionClick}
              anchorEl={anchorEl}
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
              status={value}
            />
          );
        },
      },
    },
  ];
  const columns = [
    {
      name: "name",
      label: "Customer Name",
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => {
          return (
            <p className={classes.userImg}>
              <img src={value[1]} className={classes.imgIcon} alt={value[0]} />
              {value[0]}
            </p>
          );
        },
      },
    },
    {
      name: "contact",
      label: "Contact No.",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "business",
      label: "Business",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "change",
      label: "Change",
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => {
          return (
            <Button>Suspend Account</Button>
          );
        },
      },
    },
    {
      name: "time",
      label: "Time",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "status",
      label: "Status",
      searchable: false,
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: value => {
          return (
            <MenuDropDown
              options={menuOptions}
              onClick={actionClick}
              anchorEl={anchorEl}
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
              status={value}
            />
          );
        },
      },
    },
  ];
  const staffData = [
    {
      name: [
        "Joe James",
        "https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png",
      ],
      email: "user@user.com",
      department: "abc",
      role: "developer",
      change: "change",
      time: "time",
      status: "nothing",
      action: "Enable",
    },
  ];
  const data = [
    {
      name: [
        "Joe James",
        "https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png",
      ],
      contact: "+30-1234567",
      role: "developer",
      change: "",
      time: "2/3/2020",
      status: "nothing",
      action: "Enable",
    },
  ];
  var [activeTabId, setActiveTabId] = useState(0);
  return (
    <Widget disableWidgetMenu>
      <div className={classes.title}>Reports</div>
      <div className={classes.staffList}>
        <button
          data-testid="button-CustomerSupportPage"
          onClick={() => setActiveTabId(0)}
          className={classes.designationBox}
        >
          All
        </button>
        <button
          data-testid="button-CustomerSupportPage2"
          onClick={() => setActiveTabId(1)}
          className={classes.designationBox}
        >
          Customer
        </button>
        <button
          data-testid="button-CustomerSupportPage3"
          onClick={() => setActiveTabId(2)}
          className={classes.designationBox}
        >
          Business
        </button>
        <button
          data-testid="button-CustomerSupportPage4"
          onClick={() => setActiveTabId(3)}
          className={classes.designationBox}
        >
          User Apps
        </button>
      </div>
      {activeTabId === 0 && (
        <Table
          data={data}
          columns={staffColumns}
          message="No records to display"
          title="Staff Approval"
          options={tableOpts}
          noPadding
        />
      )}
      {activeTabId === 1 && (
        <Table
          data={staffData}
          columns={columns}
          message="No records to display"
          title="Customer Approval"
          options={tableOpts}
          noPadding
        />
      )}
      {activeTabId === 2 && (
        <Table
          data={data}
          columns={columns}
          message="No records to display"
          title="Charity Approval"
          options={tableOpts}
          noPadding
        />
      )}
      {activeTabId === 3 && (
        <Table
          data={data}
          columns={columns}
          message="No records to display"
          title="Fee Approval"
          options={tableOpts}
          noPadding
        />
      )}
    </Widget>
  );
}