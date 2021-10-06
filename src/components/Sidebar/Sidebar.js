import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import useStyles from "./styles";
import SidebarLink from "./components/SidebarLink/SidebarLink";
import { useLayoutState, useLayoutDispatch, toggleSidebar } from "../../context/LayoutContext";
import Dashboard from "../../images/dashboard.png";
import Preregistered from "../../images/preregistered.png";
import Giveaway from "../../images/giveaway.png";
import StaffManagement from "../../images/staffmanagement.png";
import CustomerManagement from "../../images/customermanagement.png";
import FeeManagement from "../../images/feemanagement.png";
import ApprovalManagement from "../../images/approvalmanagement.png";
// import Reports from "../../images/reports.png";
// import CustomerSupport from "../../images/customersupport.png";

const structure = [
  { id: 0, type: "title", label: "MAIN" },
  { id: 1, label: "Dashboard", link: "/app/dashboard", icon: Dashboard },
  { id: 2, label: "Pre-Registered Users", link: "/app/pre-registered-users", icon: Preregistered },
  { id: 3, label: "Giveaway", link: "/app/giveaway", icon: Giveaway },
  { id: 4, type: "title", label: "SETTINGS" },
  {
    id: 5,
    label: "Staff Management",
    link: "/app/staff-management/staff-list",
    icon: StaffManagement,
    children: [
      { label: "Staff List", link: "/app/staff-management/staff-list", icon: "" },
      { label: "User Roles", link: "/app/staff-management/user-roles", icon: "" },
    ],
  },
  {
    id: 6,
    label: "Customer Management",
    link: "/app/customer-management",
    icon: CustomerManagement,
  },
  {
    id: 7,
    label: "Fee Management",
    link: "/app/fee-management",
    icon: FeeManagement,
  },
  {
    id: 8,
    label: "Approval Management",
    link: "/app/approval-management",
    icon: ApprovalManagement,
  },
  // {
  //   id: 9,
  //   label: "Reports",
  //   link: "/app/reports",
  //   icon: Reports,
  // },
  // {
  //   id: 10,
  //   label: "Customer Support",
  //   link: "/app/customer-support",
  //   icon: CustomerSupport,
  // },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  var [isPermanent, setPermanent] = useState(true);
  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });
  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton data-testid="button-sidebar" onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List>
        {structure.map((link, index) => (
          <SidebarLink
            key={index + 1}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;
    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);