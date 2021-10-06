import React from 'react';
import { ThemeProvider } from "@material-ui/styles";
import Themes from "../themes";
import ReactDOM from 'react-dom';
import { Route, HashRouter } from 'react-router-dom';
import { render, fireEvent, act } from '@testing-library/react';
import { UserProvider } from "../context/UserContext";
import { LayoutProvider } from "../context/LayoutContext";
import App from "../components/App";
import CustomerManagementPage from "../pages/customermanagement/CustomerManagement";
import ApprovalManagementPage from "../pages/approvalmanagement/ApprovalManagement";
import BusinessInformationPage from "../pages/businessinformation/BusinessInformation";
import CustomerInformationPage from "../pages/customerinformation/CustomerInformation";
import CustomerSupportPage from "../pages/customersupport/CustomerSupport";
import Dashboard from "../pages/dashboard/Dashboard";
import FeeManagementPage from "../pages/feemanagement/FeeManagement";
import ForgetPassword from "../pages/forgetPassword/ForgetPassword";
import Giveaway from "../pages/giveaway/Giveaway";
import GoogleAuth from "../pages/GoogleAuth/GoogleAuth";
import IndividualReportPage from "../pages/individualreportpage/IndividualReportPage";
import Login from "../pages/login/Login";
import MyProfilePage from "../pages/myProfile/MyProfile";
import PreRegisteredUsers from "../pages/preRegisteredUsers/PreRegisteredUsers";
import ReportCustomerInfoPage from "../pages/reportcustomerinfo/ReportCustomerInfo";
import ReportsPage from "../pages/reports/Reports";
import ResetPassword from "../pages/resetpassword/ResetPassword";
import SetPassword from "../pages/setpassword/SetPassword";
import StaffListPage from "../pages/stafflist/StaffList";
import Summary from "../pages/Summary/Summary";
import UserRolesPage from "../pages/userroles/UserRoles";
import Verification from "../pages/Verification/Verification";
import Header from "../components/Header/Header";
import Layout from "../components/Layout/Layout";
import Notification from "../components/Notification/Notification";
import Sidebar from "../components/Sidebar/Sidebar";
import Dot from "../components/Sidebar/components/Dot";
import SidebarLink from "../components/Sidebar/components/SidebarLink/SidebarLink";
import LongMenu from "../components/Basic-component/menuDropDown";
import ApexBarChart from "../components/charts/ApexBarChart";
import ApexLineChart from "../components/charts/ApexLineChart";
import ApexPieChart from "../components/charts/ApexPieChart";
import Widget from "../components/Widget/Widget";
import { register as Register } from "../serviceWorker";
import { unregister as UnRegister } from "../serviceWorker";
import UseEnterKeyListener from "../pages/Verification/useEnterKeyListener";

beforeAll(() => {
    localStorage.setItem("role", "chief executive officer");
    localStorage.setItem("userID", "8CUtpu9aE0YrnNW7gisHiqlEdbw1");
    localStorage.setItem("token", "AGEhc0D1vtXhKpIyLYXl5huZbjveAu8MqmqbYf9e6VTRzrnme_shmrPg_HOeJoz9vDi20FMoMftdML9fHNaEGRiKara5vsr5y9F7nrVA8vL-h7c0OJCY8Ke05e_401cnicrlrW3jbfQQXShKcA72bvjr5UgoOt9I2InKJAlg7ujapPADiMxcO5iPLDA1BjxHmo0i9BFdX8-UbsHfw_o8xsz5-_9ykHKfx-5SuwX2Pxo2vyehrbn5k9c")
    localStorage.setItem("email", "bilalasif95@gmail.com")
    localStorage.setItem("loggedIn", true)
    localStorage.setItem("loginTime", new Date())
});

test('renders without crashing', () => {
    const div = document.createElement('root');
    ReactDOM.render(<LayoutProvider><UserProvider><ThemeProvider theme={Themes.default}><App /></ThemeProvider></UserProvider></LayoutProvider>, div);
});

test('Should Test CustomerManagementPage Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <CustomerManagementPage props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test ApprovalManagementPage Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <ApprovalManagementPage props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test BusinessInformationPage Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <BusinessInformationPage props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test CustomerInformationPage Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <CustomerInformationPage props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test CustomerSupportPage Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <CustomerSupportPage props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test Dashboard Component', () => {
    const wrapper = render(<LayoutProvider><UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <Dashboard props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider></LayoutProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test FeeManagementPage Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <FeeManagementPage props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test ForgetPassword Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <ForgetPassword props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test Giveaway Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <Giveaway props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test GoogleAuth Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <GoogleAuth props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test IndividualReportPage Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <IndividualReportPage props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test Login Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <Login props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test MyProfilePage Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <MyProfilePage props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test PreRegisteredUsers Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <PreRegisteredUsers props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test ReportCustomerInfoPage Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <ReportCustomerInfoPage props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test ReportsPage Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <ReportsPage props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test ResetPassword Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <ResetPassword props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test SetPassword Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <SetPassword props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test StaffListPage Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <StaffListPage props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test Summary Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <Summary props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test UserRolesPage Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <UserRolesPage props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test Verification Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <Verification props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test Header Component', () => {
    const wrapper = render(<LayoutProvider><UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <Header props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider></LayoutProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test Layout Component', () => {
    const wrapper = render(<LayoutProvider><UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <Layout props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider></LayoutProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test Notification Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <Notification props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test Sidebar Component', () => {
    const wrapper = render(<LayoutProvider><UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <Sidebar props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider></LayoutProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test Dot Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <Dot color="#fff" props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test SidebarLink Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <SidebarLink props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test LongMenu Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <LongMenu data={{ approvedBy: { employee1: "", employee2: "", employee3: "" } }} options={[]} props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test ApexBarChart Component', () => {
    const wrapper = render(<LayoutProvider><UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <ApexBarChart props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider></LayoutProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test ApexLineChart Component', () => {
    const wrapper = render(<LayoutProvider><UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <ApexLineChart props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider></LayoutProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test ApexPieChart Component', () => {
    const wrapper = render(<LayoutProvider><UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <ApexPieChart props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider></LayoutProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test Widget Component', () => {
    const wrapper = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <Widget disableWidgetMenu={false} props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test RegisterServiceWorker Component', () => {
    const wrapper = render(<Register />);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test UnRegisterServiceWorker Component', () => {
    const wrapper = render(<UnRegister />);
    expect(wrapper).toMatchSnapshot();
});

test('Should Test UseEnterKeyListener Component', () => {
    const wrapper = render(<UseEnterKeyListener />);
    expect(wrapper).toMatchSnapshot();
});

it('Should Test Header Component Buttons', () => {
    const { getByTestId } = render(<LayoutProvider><UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <Header props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider></LayoutProvider>);

    const button = getByTestId('button-toggle')
    act(() => { fireEvent.click(button) })

    const buttonnotification = getByTestId('button:notification')
    act(() => { fireEvent.click(buttonnotification) })

    const buttonsetProfilemenu = getByTestId('button:setProfilemenu')
    act(() => { fireEvent.click(buttonsetProfilemenu) })

    const buttonlogout = getByTestId('button:logout')
    act(() => fireEvent.click(buttonlogout))
})

it('Should Test Sidebar Component Buttons ', () => {
    const { getByTestId } = render(<LayoutProvider><UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <Sidebar props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider></LayoutProvider>);

    const button = getByTestId('button-sidebar')
    act(() => { fireEvent.click(button) })
})

it('Should Test CustomerSupportPage Component Buttons ', () => {
    const { getByTestId } = render(<LayoutProvider><UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <CustomerSupportPage props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider></LayoutProvider>);

    const button = getByTestId('button-CustomerSupportPage')
    act(() => { fireEvent.click(button) })

    const button2 = getByTestId('button-CustomerSupportPage2')
    act(() => { fireEvent.click(button2) })

    const button3 = getByTestId('button-CustomerSupportPage3')
    act(() => { fireEvent.click(button3) })

    const button4 = getByTestId('button-CustomerSupportPage4')
    act(() => { fireEvent.click(button4) })
})

it('Should Test Dashboard Component Buttons ', () => {
    const { getByTestId } = render(<LayoutProvider><UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <Dashboard props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider></LayoutProvider>);

    const button = getByTestId('button-Dashboard')
    act(() => { fireEvent.click(button) })
    const button2 = getByTestId('button-Dashboard2')
    act(() => { fireEvent.click(button2) })
    const button3 = getByTestId('button-Dashboard3')
    act(() => { fireEvent.click(button3) })
    const button4 = getByTestId('button-Dashboard4')
    act(() => { fireEvent.click(button4) })
    const button5 = getByTestId('button-Dashboard5')
    act(() => { fireEvent.click(button5) })
    const button6 = getByTestId('button-Dashboard6')
    act(() => { fireEvent.click(button6) })
    const button7 = getByTestId('button-Dashboard7')
    act(() => { fireEvent.click(button7) })
    const button8 = getByTestId('button-Dashboard8')
    act(() => { fireEvent.click(button8) })
    const button9 = getByTestId('button-Dashboard9')
    act(() => { fireEvent.click(button9) })
    const button10 = getByTestId('button-Dashboard10')
    act(() => { fireEvent.click(button10) })
    const button11 = getByTestId('button-Dashboard11')
    act(() => { fireEvent.click(button11) })
    const button12 = getByTestId('button-Dashboard12')
    act(() => { fireEvent.click(button12) })
    const button13 = getByTestId('button-Dashboard13')
    act(() => { fireEvent.click(button13) })
    const button14 = getByTestId('button-Dashboard14')
    act(() => { fireEvent.click(button14) })
    const button15 = getByTestId('button-Dashboard15')
    act(() => { fireEvent.click(button15) })
    const button16 = getByTestId('button-Dashboard16')
    act(() => { fireEvent.click(button16) })
})

it('Should Test Login Component Buttons ', () => {
    const { getByTestId } = render(<LayoutProvider><UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <Login props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider></LayoutProvider>);

    const button = getByTestId('button-Login')
    act(() => { fireEvent.click(button) })
})

it('Should Test MyProfilePage Component Buttons ', () => {
    const { getByTestId } = render(<LayoutProvider><UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <MyProfilePage props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider></LayoutProvider>);

    const button = getByTestId('button-MyProfilePage')
    act(() => { fireEvent.click(button) })
    const button2 = getByTestId('button-MyProfilePage2')
    act(() => { fireEvent.click(button2) })
    const button3 = getByTestId('button-MyProfilePage3')
    act(() => { fireEvent.click(button3) })
})

it('Should Test ReportsPage Component Buttons ', () => {
    const { getByTestId } = render(<LayoutProvider><UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <ReportsPage props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider></LayoutProvider>);

    const button = getByTestId('button-ReportsPage')
    act(() => { fireEvent.click(button) })
    const button2 = getByTestId('button-ReportsPage2')
    act(() => { fireEvent.click(button2) })
    const button3 = getByTestId('button-ReportsPage3')
    act(() => { fireEvent.click(button3) })
    const button4 = getByTestId('button-ReportsPage4')
    act(() => { fireEvent.click(button4) })
    const button5 = getByTestId('button-ReportsPage5')
    act(() => { fireEvent.click(button5) })
    const button6 = getByTestId('button-ReportsPage6')
    act(() => { fireEvent.click(button6) })
})

//   it('works 2', () => {
    // const { getByTestId } = render(<UserProvider><ThemeProvider theme={Themes.default}><HashRouter><Route component={(props) => <ApprovalManagementPage props={{ ...props }} />} /></HashRouter></ThemeProvider></UserProvider>);

    // const button = getByTestId('buttonapprovalmanagement:opendialog')
    //     act(() => { fireEvent.click(button) })

    // const buttonopendialog2 = getByTestId('buttonapprovalmanagement:opendialog2')
    //     act(() => { fireEvent.click(buttonopendialog2) })

    // const buttonopendialog3 = getByTestId('buttonapprovalmanagement:opendialog3')
    //     act(() => { fireEvent.click(buttonopendialog3) })

    // const buttonopendialog4 = getByTestId('buttonapprovalmanagement:opendialog4')
    //     act(() => { fireEvent.click(buttonopendialog4) })

    // const buttonsettypes = getByTestId('buttonapprovalmanagement:settypes')
    //     act(() => { fireEvent.click(buttonsettypes) })

    // const buttonsettypes2 = getByTestId('buttonapprovalmanagement:settypes2')
    //     act(() => { fireEvent.click(buttonsettypes2) })
//   })
