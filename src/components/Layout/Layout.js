import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Dashboard from "../../pages/dashboard";
import StaffList from "../../pages/stafflist/StaffList";
import PreRegisteredUsers from "../../pages/preRegisteredUsers/PreRegisteredUsers";
import Giveaway from "../../pages/giveaway/Giveaway";
import Summary from "../../pages/Summary/Summary";
import MyProfile from "../../pages/myProfile/MyProfile";
import UserRoles from "../../pages/userroles";
import CustomerManagement from "../../pages/customermanagement";
import FeeManagement from "../../pages/feemanagement";
import ApprovalManagement from "../../pages/approvalmanagement";
import Reports from "../../pages/reports";
import CustomerSupport from "../../pages/customersupport";
import { useLayoutState } from "../../context/LayoutContext";
import CustomerInformationPage from "../../pages/customerinformation/CustomerInformation";
import BusinessInformationPage from "../../pages/businessinformation/BusinessInformation";
import ReportCustomerInfoPage from "../../pages/reportcustomerinfo/ReportCustomerInfo";
import IndividualReportPage from "../../pages/individualreportpage/IndividualReportPage";

function Layout(props) {
  var classes = useStyles();
  var layoutState = useLayoutState();
  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route
              path="/app/pre-registered-users"
              component={PreRegisteredUsers}
            />
            <Route
              path="/app/giveaway"
              component={Giveaway}
            />
            <Route
              path="/app/summary"
              component={Summary}
            />
            <Route
              path="/app/staff-management/staff-list"
              component={StaffList}
            />
            <Route
              path="/app/myProfile"
              component={MyProfile}
            />
            <Route
              path="/app/staff-management/user-roles"
              component={UserRoles}
            />
            <Route
              path="/app/customer-management"
              component={CustomerManagement}
            />
            <Route
              path="/app/customer-information"
              component={CustomerInformationPage}
            />
            <Route
              path="/app/business-information"
              component={BusinessInformationPage}
            />
            <Route
              path="/app/individual-report"
              component={IndividualReportPage}
            />
            <Route
              path="/app/approval-management"
              component={ApprovalManagement}
            />
            <Route path="/app/reports" component={Reports} />
            <Route
              path="/app/report-customer-info"
              component={ReportCustomerInfoPage}
            />
            <Route path="/app/fee-management" component={FeeManagement} />
            <Route path="/app/customer-support" component={CustomerSupport} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);