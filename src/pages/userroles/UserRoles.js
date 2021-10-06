import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import "./userRoles.scss";
import { firebase, statuses, types, table, timestamp } from "../../config";
import { CircularProgress } from "@material-ui/core";
import Widget from "../../components/Widget";
import CheckBox from "../../components/Basic-component/labelCheckbox";
import NativeDropDown from "../../components/Basic-component/nativeDropDown";
import TextField from "../../components/Basic-component/textFiled";
import Dailog from "../../components/Basic-component/Dailog";
import Button from "../../components/Basic-component/button";
import { Close as AddIcon } from "@material-ui/icons";
import UseEnterKeyListener from "../Verification/useEnterKeyListener";

export default function UserRolesPage() {

  UseEnterKeyListener({
    querySelectorToExecuteClick: "#submitButton"
  });
  var classes = useStyles();
  const [openAddRoleModal, setAddRoleModalOpen] = useState(false);
  const [openAddDepartmentModal, setAddDepartmentModalOpen] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [rolesArray, setRolesArray] = useState([]);
  const [error, setError] = useState("");
  const [userSuspension, setUserSuspension] = useState(false);
  const [giveAway, setGiveAway] = useState(false);
  const [preRegUsers, setPreRegUsers] = useState(false);
  const [viewStaff, setViewStaff] = useState(false);
  const [viewCustomer, setViewCustomer] = useState(false);
  const [viewFee, setViewFee] = useState(false);
  const [viewCharityApproval, setViewCharityApproval] = useState(false);
  const [viewCustomerApproval, setViewCustomerApproval] = useState(false);
  const [viewFeeApproval, setViewFeeApproval] = useState(false);
  const [viewStaffApproval, setViewStaffApproval] = useState(false);
  const [userEnable, setUserEnable] = useState(false);
  const [userPermissionsSet, setUserPermissionsSet] = useState(false);
  const [addUserRole, setAddUserRole] = useState(false);
  const [addDepartmentCheckbox, setAddDepartmentCheckbox] = useState(false);
  const [addUserCheckbox, setAddUserCheckbox] = useState(false);
  const [customerSuspension, setCustomerSuspension] = useState(false);
  const [customerEnable, setCustomerEnable] = useState(false);
  const [referralRewards, setReferralRewards] = useState(false);
  const [customerFees, setCustomerFees] = useState(false);
  const [interestRate, setInterestRate] = useState(false);
  const [staffApproval, setStaffApproval] = useState(false);
  const [customerApproval, setCustomerApproval] = useState(false);
  const [charityApproval, setCharityApproval] = useState(false);
  const [feeApproval, setFeeApproval] = useState(false);
  const [all, setAll] = useState(false);
  const [customer, setCustomer] = useState(false);
  const [business, setBusiness] = useState(false);
  const [userApps, setUserApps] = useState(false);
  const [customerChat, setCustomerChat] = useState(false);
  const [viewUserDetail, setViewUserDetail] = useState(false);
  const [allPermissions, setAllPermissions] = useState(false);
  const [staffManagement, setStaffManagement] = useState(false);
  const [customerManagement, setCustomerManagement] = useState(false);
  const [feeManagement, setFeeManagement] = useState(false);
  const [approvalManagement, setApprovalManagement] = useState(false);
  const [reports, setReports] = useState(false);
  const [customerSupport, setCustomerSupport] = useState(false);
  const [permissions, setPermissions] = useState({});
  const [selectedRole, setSelectedRole] = useState("");
  const [reason, setReason] = useState("");
  const addRole = () => {
    setLoading(true);
    setError("");
    firebase.firestore()
      .collection(table.StaffRoles)
      .doc(name.toLowerCase())
      .get()
      .then((doc) => {
        if (!doc.exists) {
          firebase.firestore()
            .collection(table.StaffRoles)
            .doc(name.toLowerCase())
            .set({
              giveAway: false,
              preRegUsers: false,
              staffManagement: {
                userSuspension: false,
                userEnable: false,
                userPermissionsSet: false,
                addUserRole: false,
                addDepartment: false,
                addUser: false,
                viewStaff: false,
              },
              customerManagement: {
                customerSuspension: false,
                customerEnable: false,
                viewCustomer: false,
              },
              feeManagement: {
                referralRewards: false,
                customerFees: false,
                interestRate: false,
                viewFee: false,
              },
              approvalManagement: {
                staffApproval: false,
                customerApproval: false,
                charityApproval: false,
                feeApproval: false,
                viewCharityApproval: false,
                viewCustomerApproval: false,
                viewFeeApproval: false,
                viewStaffApproval: false,
              },
              reports: {
                all: false,
                customer: false,
                business: false,
                userApps: false,
              },
              customerSupport: {
                customerChat: false,
                viewUserDetail: false,
              },
            }).then(() => {
              setRolesArray([])
              setError("Role Added Successfully.")
              firebase.firestore().collection(table.StaffRoles).onSnapshot(querySnapShot => {
                const arr = []
                querySnapShot.docs.forEach(doc => {
                  if (doc.id !== localStorage.getItem("role")) {
                    arr.push({
                      value: doc.id,
                      name: doc.id,
                    })
                  }
                })
                setRolesArray(arr)
              })
              setTimeout(() => {
                setLoading(false);
                setError("");
                setAddRoleModalOpen(false);
              }, 1500)
            })
        }
        else {
          setLoading(false);
          setError("Role name already exists.")
        }
      })
  }
  const addDepartment = () => {
    setLoading(true);
    setError("");
    firebase.firestore()
      .collection(table.Departments)
      .doc(departmentName.toLowerCase())
      .get()
      .then((doc) => {
        if (!doc.exists) {
          firebase.firestore()
            .collection(table.Departments)
            .doc(departmentName.toLowerCase())
            .set({
              name: departmentName.toLowerCase()
            }).then(() => {
              setError("Department Added Successfully.")
              setTimeout(() => {
                setLoading(false);
                setError("");
                setAddDepartmentModalOpen(false);
              }, 1500)
            })
        }
        else {
          setLoading(false);
          setError("Department name already exists.")
        }
      })
  }
  useEffect(() => {
    if (customerChat && viewUserDetail) {
      setCustomerSupport(true)
    }
    if (!customerChat || !viewUserDetail) {
      setCustomerSupport(false)
    }
  }, [customerChat, viewUserDetail])
  useEffect(() => {
    firebase.firestore().collection(table.StaffRoles).onSnapshot(querySnapShot => {
      const arr = []
      querySnapShot.docs.forEach(doc => {
        if (doc.id !== localStorage.getItem("role")) {
          arr.push({
            value: doc.id,
            name: doc.id,
          })
        }
      })
      setRolesArray(arr)
      setSelectedRole(arr && arr[0] ? arr[0].value : "1")
      firebase.firestore().collection(table.StaffRoles).doc(arr && arr[0] ? arr[0].value : "1").get()
        .then(role => {
          if (role.data()) {
            setUserSuspension(role.data().staffManagement.userSuspension)
            setUserEnable(role.data().staffManagement.userEnable)
            setGiveAway(role.data().giveAway)
            setPreRegUsers(role.data().preRegUsers)
            setViewStaff(role.data().staffManagement.viewStaff)
            setViewCustomer(role.data().customerManagement.viewCustomer)
            setViewFee(role.data().feeManagement.viewFee)
            setViewCharityApproval(role.data().approvalManagement.viewCharityApproval)
            setViewCustomerApproval(role.data().approvalManagement.viewCustomerApproval)
            setViewFeeApproval(role.data().approvalManagement.viewFeeApproval)
            setViewStaffApproval(role.data().approvalManagement.viewStaffApproval)
            setUserPermissionsSet(role.data().staffManagement.userPermissionsSet)
            setAddUserRole(role.data().staffManagement.addUserRole)
            setAddDepartmentCheckbox(role.data().staffManagement.addDepartment)
            setAddUserCheckbox(role.data().staffManagement.addUser)
            setCustomerSuspension(role.data().customerManagement.customerSuspension)
            setCustomerEnable(role.data().customerManagement.customerEnable)
            setReferralRewards(role.data().feeManagement.referralRewards)
            setCustomerFees(role.data().feeManagement.customerFees)
            setInterestRate(role.data().feeManagement.interestRate)
            setStaffApproval(role.data().approvalManagement.staffApproval)
            setCustomerApproval(role.data().approvalManagement.customerApproval)
            setCharityApproval(role.data().approvalManagement.charityApproval)
            setFeeApproval(role.data().approvalManagement.feeApproval)
            setAll(role.data().reports.all)
            setCustomer(role.data().reports.customer)
            setBusiness(role.data().reports.business)
            setUserApps(role.data().reports.userApps)
            setCustomerChat(role.data().customerSupport.customerChat)
            setViewUserDetail(role.data().customerSupport.viewUserDetail)
          }
        })
    })
    firebase.firestore().collection(table.StaffRoles).doc(localStorage.getItem("role"))
      .onSnapshot(res => {
        setPermissions(res.data())
      })
  }, [])
  useEffect(() => {
    if (selectedRole !== "") {
      firebase.firestore().collection(table.StaffRoles).doc(selectedRole).get()
        .then(role => {
          if (role.data()) {
            setUserSuspension(role.data().staffManagement.userSuspension)
            setGiveAway(role.data().giveAway)
            setPreRegUsers(role.data().preRegUsers)
            setViewStaff(role.data().staffManagement.viewStaff)
            setViewCustomer(role.data().customerManagement.viewCustomer)
            setViewFee(role.data().feeManagement.viewFee)
            setViewCharityApproval(role.data().approvalManagement.viewCharityApproval)
            setViewCustomerApproval(role.data().approvalManagement.viewCustomerApproval)
            setViewFeeApproval(role.data().approvalManagement.viewFeeApproval)
            setViewStaffApproval(role.data().approvalManagement.viewStaffApproval)
            setUserEnable(role.data().staffManagement.userEnable)
            setUserPermissionsSet(role.data().staffManagement.userPermissionsSet)
            setAddUserRole(role.data().staffManagement.addUserRole)
            setAddDepartmentCheckbox(role.data().staffManagement.addDepartment)
            setAddUserCheckbox(role.data().staffManagement.addUser)
            setCustomerSuspension(role.data().customerManagement.customerSuspension)
            setCustomerEnable(role.data().customerManagement.customerEnable)
            setReferralRewards(role.data().feeManagement.referralRewards)
            setCustomerFees(role.data().feeManagement.customerFees)
            setInterestRate(role.data().feeManagement.interestRate)
            setStaffApproval(role.data().approvalManagement.staffApproval)
            setCustomerApproval(role.data().approvalManagement.customerApproval)
            setCharityApproval(role.data().approvalManagement.charityApproval)
            setFeeApproval(role.data().approvalManagement.feeApproval)
            setAll(role.data().reports.all)
            setCustomer(role.data().reports.customer)
            setBusiness(role.data().reports.business)
            setUserApps(role.data().reports.userApps)
            setCustomerChat(role.data().customerSupport.customerChat)
            setViewUserDetail(role.data().customerSupport.viewUserDetail)
          }
        })
    }
  }, [selectedRole])
  useEffect(() => {
    if (userSuspension && viewStaff && userEnable && userPermissionsSet && addUserRole && addDepartmentCheckbox && addUserCheckbox) {
      setStaffManagement(true)
    }
    if (!userSuspension || !viewStaff || !userEnable || !userPermissionsSet || !addUserRole || !addDepartmentCheckbox || !addUserCheckbox) {
      setStaffManagement(false)
    }
  }, [userSuspension, viewStaff, userEnable, userPermissionsSet, addUserRole, addDepartmentCheckbox, addUserCheckbox])
  const onUserSuspensionChange = () => {
    if (userSuspension) {
      return setUserSuspension(false)
    }
    return setUserSuspension(true)
  }
  const onGiveawayChange = () => {
    if (giveAway) {
      return setGiveAway(false)
    }
    return setGiveAway(true)
  }
  const onPreRegUsersChange = () => {
    if (preRegUsers) {
      return setPreRegUsers(false)
    }
    return setPreRegUsers(true)
  }
  const onViewStaffChange = () => {
    if (viewStaff) {
      return setViewStaff(false)
    }
    return setViewStaff(true)
  }
  const onViewCustomerChange = () => {
    if (viewCustomer) {
      return setViewCustomer(false)
    }
    return setViewCustomer(true)
  }
  useEffect(() => {
    if (userSuspension && viewStaff && preRegUsers && giveAway && viewCustomer && viewCharityApproval && viewStaffApproval && viewFeeApproval && viewCustomerApproval && viewFee && userEnable && userPermissionsSet && addUserRole && addDepartmentCheckbox && addUserCheckbox && customerSuspension && customerEnable && referralRewards && customerFees && interestRate && staffApproval && customerApproval && charityApproval && feeApproval && all && customer && business && userApps && customerChat && viewUserDetail) {
      setAllPermissions(true)
    }
    if (!userSuspension || !viewStaff || !preRegUsers || !giveAway || !viewCustomer || !viewCharityApproval || !viewStaffApproval || !viewFeeApproval || !viewCustomerApproval || !viewFee || !userEnable || !userPermissionsSet || !addUserRole || !addDepartmentCheckbox || !addUserCheckbox || !customerSuspension || !customerEnable || !referralRewards || !customerFees || !interestRate || !staffApproval || !customerApproval || !charityApproval || !feeApproval || !all || !customer || !business || !userApps || !customerChat || !viewUserDetail) {
      setAllPermissions(false)
    }
  }, [userSuspension, viewStaff, viewFee, giveAway, preRegUsers, viewCustomer, viewCharityApproval, viewStaffApproval, viewFeeApproval, viewCustomerApproval, userEnable, userPermissionsSet, addUserRole, addDepartmentCheckbox, addUserCheckbox, customerSuspension, customerEnable, referralRewards, customerFees, interestRate, staffApproval, customerApproval, charityApproval, feeApproval, all, customer, business, userApps, customerChat, viewUserDetail])
  const onViewFeeChange = () => {
    if (viewFee) {
      return setViewFee(false)
    }
    return setViewFee(true)
  }
  const onViewCharityApprovalChange = () => {
    if (viewCharityApproval) {
      return setViewCharityApproval(false)
    }
    return setViewCharityApproval(true)
  }
  const onViewCustomerApprovalChange = () => {
    if (viewCustomerApproval) {
      return setViewCustomerApproval(false)
    }
    return setViewCustomerApproval(true)
  }
  const onViewFeeApprovalChange = () => {
    if (viewFeeApproval) {
      return setViewFeeApproval(false)
    }
    return setViewFeeApproval(true)
  }
  const onViewStaffApprovalChange = () => {
    if (viewStaffApproval) {
      return setViewStaffApproval(false)
    }
    return setViewStaffApproval(true)
  }
  const onUserEnableChange = () => {
    if (userEnable) {
      return setUserEnable(false)
    }
    return setUserEnable(true)
  }
  const onUserPermissionsSetChange = () => {
    if (userPermissionsSet) {
      return setUserPermissionsSet(false)
    }
    return setUserPermissionsSet(true)
  }
  const onAddUserRoleChange = () => {
    if (addUserRole) {
      return setAddUserRole(false)
    }
    return setAddUserRole(true)
  }
  const onAddDepartmentCheckboxChange = () => {
    if (addDepartmentCheckbox) {
      return setAddDepartmentCheckbox(false)
    }
    return setAddDepartmentCheckbox(true)
  }
  const onAddUserCheckboxChange = () => {
    if (addUserCheckbox) {
      return setAddUserCheckbox(false)
    }
    return setAddUserCheckbox(true)
  }
  const onCustomerSuspensionChange = () => {
    if (customerSuspension) {
      return setCustomerSuspension(false)
    }
    return setCustomerSuspension(true)
  }
  const onCustomerEnableChange = () => {
    if (customerEnable) {
      return setCustomerEnable(false)
    }
    return setCustomerEnable(true)
  }
  const onReferralRewardsChange = () => {
    if (referralRewards) {
      return setReferralRewards(false)
    }
    return setReferralRewards(true)
  }
  const onCustomerFeesChange = () => {
    if (customerFees) {
      return setCustomerFees(false)
    }
    return setCustomerFees(true)
  }
  const onInterestRateChange = () => {
    if (interestRate) {
      return setInterestRate(false)
    }
    return setInterestRate(true)
  }
  const onStaffApprovalChange = () => {
    if (staffApproval) {
      return setStaffApproval(false)
    }
    return setStaffApproval(true)
  }
  const onCustomerApprovalChange = () => {
    if (customerApproval) {
      return setCustomerApproval(false)
    }
    return setCustomerApproval(true)
  }
  const onCharityApprovalChange = () => {
    if (charityApproval) {
      return setCharityApproval(false)
    }
    return setCharityApproval(true)
  }
  const onFeeApprovalChange = () => {
    if (feeApproval) {
      return setFeeApproval(false)
    }
    return setFeeApproval(true)
  }
  const onAllChange = () => {
    if (all) {
      return setAll(false)
    }
    return setAll(true)
  }
  const onCustomerChange = () => {
    if (customer) {
      return setCustomer(false)
    }
    return setCustomer(true)
  }
  const onBusinessChange = () => {
    if (business) {
      return setBusiness(false)
    }
    return setBusiness(true)
  }
  const onUserAppsChange = () => {
    if (userApps) {
      return setUserApps(false)
    }
    return setUserApps(true)
  }
  const onCustomerChatChange = () => {
    if (customerChat) {
      return setCustomerChat(false)
    }
    return setCustomerChat(true)
  }
  const onViewUserDetailChange = () => {
    if (viewUserDetail) {
      return setViewUserDetail(false)
    }
    return setViewUserDetail(true)
  }
  useEffect(() => {
    if (customerSuspension && customerEnable && viewCustomer) {
      setCustomerManagement(true)
    }
    if (!customerSuspension || !customerEnable || !viewCustomer) {
      setCustomerManagement(false)
    }
  }, [customerSuspension, customerEnable, viewCustomer])
  const onAllPermissionsChange = () => {
    if (allPermissions) {
      setAllPermissions(false);
      setStaffManagement(false);
      setUserSuspension(false);
      setGiveAway(false)
      setPreRegUsers(false)
      setViewStaff(false)
      setViewCustomer(false)
      setViewFee(false)
      setViewCharityApproval(false)
      setViewCustomerApproval(false)
      setViewFeeApproval(false)
      setViewStaffApproval(false)
      setUserEnable(false);
      setUserPermissionsSet(false);
      setAddUserRole(false);
      setAddDepartmentCheckbox(false);
      setAddUserCheckbox(false);
      setCustomerManagement(false);
      setCustomerSuspension(false);
      setCustomerEnable(false);
      setFeeManagement(false);
      setReferralRewards(false);
      setCustomerFees(false);
      setInterestRate(false);
      setApprovalManagement(false);
      setStaffApproval(false);
      setCustomerApproval(false);
      setCharityApproval(false);
      setFeeApproval(false);
      setReports(false);
      setAll(false);
      setCustomer(false);
      setBusiness(false);
      setUserApps(false);
      setCustomerSupport(false);
      setCustomerChat(false);
      setViewUserDetail(false);
    }
    else {
      setAllPermissions(true);
      setStaffManagement(true);
      setUserSuspension(true);
      setGiveAway(true)
      setPreRegUsers(true)
      setViewStaff(true)
      setViewCustomer(true)
      setViewFee(true)
      setViewCharityApproval(true)
      setViewCustomerApproval(true)
      setViewFeeApproval(true)
      setViewStaffApproval(true)
      setUserEnable(true);
      setUserPermissionsSet(true);
      setAddUserRole(true);
      setAddDepartmentCheckbox(true);
      setAddUserCheckbox(true);
      setCustomerManagement(true);
      setCustomerSuspension(true);
      setCustomerEnable(true);
      setFeeManagement(true);
      setReferralRewards(true);
      setCustomerFees(true);
      setInterestRate(true);
      setApprovalManagement(true);
      setStaffApproval(true);
      setCustomerApproval(true);
      setCharityApproval(true);
      setFeeApproval(true);
      setReports(true);
      setAll(true);
      setCustomer(true);
      setBusiness(true);
      setUserApps(true);
      setCustomerSupport(true);
      setCustomerChat(true);
      setViewUserDetail(true);
    }
  }
  const onStaffManagementChange = () => {
    if (staffManagement) {
      setStaffManagement(false);
      setUserSuspension(false);
      setUserEnable(false);
      setUserPermissionsSet(false);
      setAddUserRole(false);
      setAddDepartmentCheckbox(false);
      setAddUserCheckbox(false);
      setViewStaff(false);
    }
    else {
      setStaffManagement(true);
      setUserSuspension(true);
      setUserEnable(true);
      setUserPermissionsSet(true);
      setAddUserRole(true);
      setAddDepartmentCheckbox(true);
      setAddUserCheckbox(true);
      setViewStaff(true);
    }
  }
  const onCustomerManagementChange = () => {
    if (customerManagement) {
      setCustomerManagement(false);
      setCustomerSuspension(false);
      setCustomerEnable(false);
      setViewCustomer(false);
    }
    else {
      setCustomerManagement(true);
      setCustomerSuspension(true);
      setCustomerEnable(true);
      setViewCustomer(true);
    }
  }
  const onFeeManagementChange = () => {
    if (feeManagement) {
      setFeeManagement(false);
      setReferralRewards(false);
      setCustomerFees(false);
      setInterestRate(false);
      setViewFee(false);
    }
    else {
      setFeeManagement(true);
      setReferralRewards(true);
      setCustomerFees(true);
      setInterestRate(true);
      setViewFee(true);
    }
  }
  const onApprovalManagementChange = () => {
    if (approvalManagement) {
      setApprovalManagement(false);
      setStaffApproval(false);
      setCustomerApproval(false);
      setCharityApproval(false);
      setFeeApproval(false);
      setViewCharityApproval(false);
      setViewCustomerApproval(false);
      setViewFeeApproval(false);
      setViewStaffApproval(false);
    }
    else {
      setApprovalManagement(true);
      setStaffApproval(true);
      setCustomerApproval(true);
      setCharityApproval(true);
      setFeeApproval(true);
      setViewCharityApproval(true);
      setViewCustomerApproval(true);
      setViewFeeApproval(true);
      setViewStaffApproval(true);
    }
  }
  const onReportsChange = () => {
    if (reports) {
      setReports(false);
      setAll(false);
      setCustomer(false);
      setBusiness(false);
      setUserApps(false);
    }
    else {
      setReports(true);
      setAll(true);
      setCustomer(true);
      setBusiness(true);
      setUserApps(true);
    }
  }
  useEffect(() => {
    if (referralRewards && customerFees && interestRate && viewFee) {
      setFeeManagement(true)
    }
    if (!referralRewards || !customerFees || !interestRate || !viewFee) {
      setFeeManagement(false)
    }
  }, [referralRewards, customerFees, interestRate, viewFee])
  const onCustomerSupportChange = () => {
    if (customerSupport) {
      setCustomerSupport(false);
      setCustomerChat(false);
      setViewUserDetail(false);
    }
    else {
      setCustomerSupport(true);
      setCustomerChat(true);
      setViewUserDetail(true);
    }
  }
  useEffect(() => {
    if (staffApproval && customerApproval && charityApproval && feeApproval && viewStaffApproval && viewFeeApproval && viewCharityApproval && viewCustomerApproval) {
      setApprovalManagement(true)
    }
    if (!staffApproval || !customerApproval || !charityApproval || !feeApproval || !viewStaffApproval || !viewFeeApproval || !viewCharityApproval || !viewCustomerApproval) {
      setApprovalManagement(false)
    }
  }, [staffApproval, customerApproval, charityApproval, feeApproval, viewStaffApproval, viewFeeApproval, viewCharityApproval, viewCustomerApproval])
  const onRequest = () => {
    setLoading(true);
    firebase.firestore()
      .collection(table.StaffApprovals)
      .doc()
      .set({
        submittedBy: firebase.firestore().doc("Staff/" + window.localStorage.getItem("userID")),
        employeeId: firebase.firestore().doc("Staff/" + window.localStorage.getItem("userID")),
        createdAt: timestamp(),
        updatedAt: timestamp(),
        approvalStatus: statuses.pending,
        type: types.setPermission,
        reason: reason,
        approvedBy: {
          employee1: "",
          employee2: "",
        },
        selectedRole: selectedRole,
        data: {
          giveAway: false,
          preRegUsers: false,
          staffManagement: {
            userSuspension: userSuspension,
            userEnable: userEnable,
            userPermissionsSet: userPermissionsSet,
            addUserRole: addUserRole,
            addDepartment: addDepartmentCheckbox,
            addUser: addUserCheckbox,
            viewUser: false,
          },
          customerManagement: {
            customerSuspension: customerSuspension,
            customerEnable: customerEnable,
            viewUser: false,
          },
          feeManagement: {
            referralRewards: referralRewards,
            customerFees: customerFees,
            interestRate: interestRate,
            viewFee: false,
          },
          approvalManagement: {
            staffApproval: staffApproval,
            customerApproval: customerApproval,
            charityApproval: charityApproval,
            feeApproval: feeApproval,
            viewCharityApproval: false,
            viewCustomerApproval: false,
            viewFeeApproval: false,
            viewStaffApproval: false,
          },
          reports: {
            all: all,
            customer: customer,
            business: business,
            userApps: userApps,
          },
          customerSupport: {
            customerChat: customerChat,
            viewUserDetail: viewUserDetail,
          }
        }
      }).then(() => {
        setError("Request submitted Successfully.")
        setTimeout(() => {
          setLoading(false);
          setError("");
          setConfirmationModal(false);
        }, 1500)
      })
      .catch(() => {
        setLoading(false);
        setError("Permission Denied.")
      })
  }
  useEffect(() => {
    if (all && customer && business && userApps) {
      setReports(true)
    }
    if (!all || !customer || !business || !userApps) {
      setReports(false)
    }
  }, [all, customer, business, userApps])
  return (
    <Widget disableWidgetMenu>
      <div className={classes.title}>User Attributes</div>
      <div className={classes.userList}>
        <div className={classes.userBox}>
          <div className={classes.userDesc}>
            <div className={classes.userDes}>User Role</div>
            <div className={classes.userInfo}>
              Only CEO and Director add multiple user role
            </div>
          </div>
          <div className={classes.userAdd}>
            <Button disabled={!(permissions && permissions.staffManagement && permissions.staffManagement.addUserRole)} onClick={() => setAddRoleModalOpen(true)} className={classes.addBtn}>Add</Button>
          </div>
        </div>
        <div className={classes.userBox}>
          <div className={classes.userDesc}>
            <div className={classes.userDes}>Departments</div>
            <div className={classes.userInfo}>Add multiple status fields</div>
          </div>
          <div className={classes.userAdd}>
            <Button disabled={!(permissions && permissions.staffManagement && permissions.staffManagement.addDepartment)} onClick={() => setAddDepartmentModalOpen(true)} className={classes.addBtn}>Add</Button>
          </div>
        </div>
      </div>
      <div className={classes.userPermisions}>
        <div className={classes.userDes}>User Permission</div>
        <div className={classes.userInfo}>You can set user permission.</div>
        <div className={classes.selectRole}>
          <NativeDropDown onChange={(e) => setSelectedRole(e.target.value)} label="User Role" data={rolesArray} />        </div>
        <div className={classes.permissions}>
          <div className={classes.allPermit}>
            <CheckBox checked={allPermissions} onChange={onAllPermissionsChange} name="All" label="All" />
          </div>
          <div className={classes.permissionsList}>
            <div className={classes.permitCol}>
              <div className={classes.heading}>
                <CheckBox checked={staffManagement} onChange={onStaffManagementChange} name="staffManagement" label="Staff Management" />
              </div>
              <ul>
                <li><CheckBox checked={userSuspension} onChange={onUserSuspensionChange} name="userSuspension" label="User Suspension" /></li>
                <li><CheckBox checked={userEnable} onChange={onUserEnableChange} name="userEnable" label="User Enable" /></li>
                <li><CheckBox checked={userPermissionsSet} onChange={onUserPermissionsSetChange} name="userPermissionsSet" label="User Permissions Set" /></li>
                <li><CheckBox checked={addUserRole} onChange={onAddUserRoleChange} name="addUserRole" label="Add User Role" /></li>
                <li><CheckBox checked={addDepartmentCheckbox} onChange={onAddDepartmentCheckboxChange} name="addDepartmentCheckbox" label="Add Department" /></li>
                <li><CheckBox checked={addUserCheckbox} onChange={onAddUserCheckboxChange} name="addUserCheckbox" label="Add User" /></li>
                <li><CheckBox checked={viewStaff} onChange={onViewStaffChange} name="viewStaff" label="View Staff" /></li>
              </ul>
            </div>
            <div className={classes.permitCol}>
              <div className={classes.heading}>
                <CheckBox checked={customerManagement} onChange={onCustomerManagementChange} name="customerManagement" label="Customer Management" />
              </div>
              <ul>
                <li><CheckBox checked={customerSuspension} onChange={onCustomerSuspensionChange} name="customerSuspension" label="Customer Suspension" /></li>
                <li><CheckBox checked={customerEnable} onChange={onCustomerEnableChange} name="customerEnable" label="Customer Enable" /></li>
                <li><CheckBox checked={viewCustomer} onChange={onViewCustomerChange} name="viewCustomer" label="View Customer" /></li>
              </ul>
              <div className={classes.giveawayHeading}>
                <CheckBox checked={giveAway} onChange={onGiveawayChange} name="giveAway" label="Giveaway" />
              </div>
              <div className={classes.heading}>
                <CheckBox checked={preRegUsers} onChange={onPreRegUsersChange} name="preRegUsers" label="Pre-Registered Users" />
              </div>
            </div>
            <div className={classes.permitCol}>
              <div className={classes.heading}>
                <CheckBox checked={feeManagement} onChange={onFeeManagementChange} name="feeManagement" label="Fee Management" />
              </div>
              <ul>
                <li><CheckBox checked={referralRewards} onChange={onReferralRewardsChange} name="referralRewards" label="Referral Rewards" /></li>
                <li><CheckBox checked={customerFees} onChange={onCustomerFeesChange} name="customerFees" label="Customer Fees" /></li>
                <li><CheckBox checked={interestRate} onChange={onInterestRateChange} name="interestRate" label="Interest Rate" /></li>
                <li><CheckBox checked={viewFee} onChange={onViewFeeChange} name="viewFee" label="View Fee" /></li>
              </ul>
            </div>
            <div className={classes.permitCol}>
              <div className={classes.heading}>
                <CheckBox checked={approvalManagement} onChange={onApprovalManagementChange} name="approvalManagement" label="Approval Management" />
              </div>
              <ul>
                <li><CheckBox checked={staffApproval} onChange={onStaffApprovalChange} name="staffApproval" label="Staff Approval" /></li>
                <li><CheckBox checked={customerApproval} onChange={onCustomerApprovalChange} name="customerApproval" label="Customer Approval" /></li>
                <li><CheckBox checked={charityApproval} onChange={onCharityApprovalChange} name="charityApproval" label="Charity Approval" /></li>
                <li><CheckBox checked={feeApproval} onChange={onFeeApprovalChange} name="feeApproval" label="Fee Approval" /></li>
                <li><CheckBox checked={viewCharityApproval} onChange={onViewCharityApprovalChange} name="viewCharityApproval" label="View Charity Approval" /></li>
                <li><CheckBox checked={viewCustomerApproval} onChange={onViewCustomerApprovalChange} name="viewCustomerApproval" label="View Customer Approval" /></li>
                <li><CheckBox checked={viewFeeApproval} onChange={onViewFeeApprovalChange} name="viewFeeApproval" label="View Fee Approval" /></li>
                <li><CheckBox checked={viewStaffApproval} onChange={onViewStaffApprovalChange} name="viewStaffApproval" label="View Staff Approval" /></li>
              </ul>
            </div>
            <div className={classes.permitCol}>
              <div className={classes.heading}>
                <CheckBox checked={reports} onChange={onReportsChange} name="reports" label="Reports" />
              </div>
              <ul>
                <li><CheckBox checked={all} onChange={onAllChange} name="all" label="All" /></li>
                <li><CheckBox checked={customer} onChange={onCustomerChange} name="customer" label="Customer" /></li>
                <li><CheckBox checked={business} onChange={onBusinessChange} name="business" label="Business" /></li>
                <li><CheckBox checked={userApps} onChange={onUserAppsChange} name="userApps" label="User Apps" /></li>
              </ul>
            </div>
            <div className={classes.permitCol}>
              <div className={classes.heading}>
                <CheckBox checked={customerSupport} onChange={onCustomerSupportChange} name="customerSupport" label="Customer Support" />
              </div>
              <ul>
                <li><CheckBox checked={customerChat} onChange={onCustomerChatChange} name="customerChat" label="Customer Chat" /></li>
                <li><CheckBox checked={viewUserDetail} onChange={onViewUserDetailChange} name="viewUserDetail" label="View User Detail" /></li>
              </ul>
            </div>
          </div>
          <div className={classes.changePermissionButton}>
            <Button disabled={!(permissions && permissions.staffManagement && permissions.staffManagement.userPermissionsSet)} onClick={() => setConfirmationModal(true)} className={classes.reqBtn}>Change Permission</Button>
          </div>
        </div>
      </div>
      <Dailog
        open={openAddRoleModal} handleClose={() => { setAddRoleModalOpen(false); setError("") }}
        maxWidth={'sm'}
        content={
          <div className={classes.addForm}>
            <div className={classes.charTitle}>User Role</div>
            <div className={classes.fieldContainer}>
              <div className={classes.field}>
                <TextField name="name" onChange={(e) => setName(e.target.value)} label="Add User Role" placeholder="Enter Role" autoFocus={true} />
              </div>
              {error && <>{error.includes("Success") ?
                <div style={{ width: "100%" }}><p style={{ color: "green", textAlign: "center" }}>{error}</p></div>
                :
                <div style={{ width: "100%" }}><p style={{ color: "red", textAlign: "center" }}>{error}</p></div>
              }</>}
              <div className={classes.btnCont}>
                {loading ? <CircularProgress size={26} className={classes.loginLoader} /> : <Button id="submitButton" disabled={!name} onClick={addRole} className={`${classes.inviteBtn} ${"submitButton"}`}>Add Role</Button>}
              </div>
            </div>
          </div>
        }>
        <AddIcon className={classes.closeIcon} onClick={() => { setAddRoleModalOpen(false); setError("") }} />
      </Dailog>
      <Dailog
        open={openAddDepartmentModal} handleClose={() => { setAddDepartmentModalOpen(false); setError("") }}
        maxWidth={'sm'}
        content={
          <div className={classes.addForm}>
            <div className={classes.charTitle}>User Department</div>
            <div className={classes.fieldContainer}>
              <div className={classes.field}>
                <TextField name="name" onChange={(e) => setDepartmentName(e.target.value)} label="Add User Department" placeholder="Enter Department Name" autoFocus="true" />
              </div>
              {error && <>{error.includes("Success") ?
                <div style={{ width: "100%" }}><p style={{ color: "green", textAlign: "center" }}>{error}</p></div>
                :
                <div style={{ width: "100%" }}><p style={{ color: "red", textAlign: "center" }}>{error}</p></div>
              }</>}
              <div className={classes.btnCont}>
                {loading ? <CircularProgress size={26} className={classes.loginLoader} /> : <Button id="submitButton" disabled={!departmentName} onClick={addDepartment} className={`${classes.inviteBtn} ${"submitButton"}`}>Add Department</Button>}
              </div>
            </div>
          </div>
        }>
        <AddIcon className={classes.closeIcon} onClick={() => { setAddDepartmentModalOpen(false); setError("") }} />
      </Dailog>
      <Dailog
        open={confirmationModal} handleClose={() => { setConfirmationModal(false); setError("") }}
        maxWidth={'sm'}
        content={
          <div className={classes.addForm}>
            <div className={classes.charTitle}>Reason</div>
            <div className={classes.fieldContainer}>
              <div className={classes.field}>
                <TextField type="textarea" multiline name="reason" onChange={(e) => setReason(e.target.value)} label="Mention Reason" placeholder="Add Text here" autoFocus="true" rows={4}
                  rowsMax={8} />
              </div>
              {error && <>{error.includes("Success") ?
                <div style={{ width: "100%" }}><p style={{ color: "green", textAlign: "center" }}>{error}</p></div>
                :
                <div style={{ width: "100%" }}><p style={{ color: "red", textAlign: "center" }}>{error}</p></div>
              }</>}
              <div className={classes.btnCont}>
                {loading ? <CircularProgress size={26} className={classes.loginLoader} /> : <Button id="submitButton" disabled={!reason} onClick={onRequest} className={`${classes.inviteBtn} ${"submitButton"}`}>Request</Button>}
              </div>
            </div>
          </div>
        }>
        <AddIcon className={classes.closeIcon} onClick={() => { setConfirmationModal(false); setError("") }} />
      </Dailog>
    </Widget>
  );
}