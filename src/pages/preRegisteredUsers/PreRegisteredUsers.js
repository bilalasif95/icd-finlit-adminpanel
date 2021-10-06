import React, { useEffect, useState } from "react";
import Widget from "../../components/Widget";
import useStyles from "./styles";
import Table from "../../components/Basic-component/table";
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import { firebase, table } from "../../config";
import { CircularProgress } from "@material-ui/core";
import moment from "moment";
import NativeDropdown from "../../components/Basic-component/nativeDropDown";

export default function PreRegisteredUsers() {
    var classes = useStyles();
    const [data, setData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("Pre-Registered");
    const [dataLoading, setDataLoading] = useState(true);
    const [date, SetDate] = useState({ From: "", To: "" });
    const SetDateRange = (e) => {
        let Fromdate = e.length === 0 ? "" : new Date(e[0])
        let Todate = e.length === 0 ? "" : new Date(e[1])
        SetDate({ ...date, From: Fromdate, To: Todate })
    }
    useEffect(() => {
        setData([]);
        setDataLoading(true);
        firebase
            .firestore()
            .collection(table.PreLaunchRegistration)
            .orderBy("createdAt", "desc")
            .onSnapshot(snapshot => {
                const postData = [];
                snapshot.forEach(doc =>
                    postData.push({
                        ...doc.data(),
                        id: doc.id,
                    }),
                );
                setData(postData);
                setDataLoading(false);
            }, () => {
                setDataLoading(false);
                setMessage("Permission Denied.")
            });
    }, []);
    useEffect(() => {
        setSortedData([]);
        setData([]);
        setDataLoading(true);
        if (selectedStatus === "Pre-Registered") {
            if ((date.From || date.To) !== "") {
                firebase
                    .firestore()
                    .collection(table.PreLaunchRegistration)
                    .orderBy("createdAt", "desc")
                    .where("createdAt", ">=", date.From)
                    .where("createdAt", "<=", date.To)
                    .onSnapshot(snapshot => {
                        const postData = [];
                        snapshot.forEach(doc =>
                            postData.push({
                                ...doc.data(),
                                id: doc.id,
                            }),
                        );
                        setSortedData(postData);
                        setDataLoading(false);
                    }, () => {
                        setDataLoading(false);
                        setMessage("Permission Denied.")
                    });
            }
            else {
                firebase
                    .firestore()
                    .collection(table.PreLaunchRegistration)
                    .orderBy("createdAt", "desc")
                    .onSnapshot(snapshot => {
                        const postData = [];
                        snapshot.forEach(doc =>
                            postData.push({
                                ...doc.data(),
                                id: doc.id,
                            }),
                        );
                        setData(postData);
                        setDataLoading(false);
                    }, () => {
                        setDataLoading(false);
                        setMessage("Permission Denied.")
                    });
            }
        }
        else {
            if ((date.From || date.To) !== "") {
                firebase
                    .firestore()
                    .collection(table.PreLaunchRegistration)
                    .where("registeredAt", "!=", null)
                    .where("registeredAt", ">=", date.From)
                    .where("registeredAt", "<=", date.To)
                    .onSnapshot(snapshot => {
                        const postData = [];
                        snapshot.forEach(doc =>
                            postData.push({
                                ...doc.data(),
                                id: doc.id,
                            }),
                        );
                        setSortedData(postData);
                        setDataLoading(false);
                    }, () => {
                        setDataLoading(false);
                        setMessage("Permission Denied.")
                    });
            }
            else {
                firebase
                    .firestore()
                    .collection(table.PreLaunchRegistration)
                    .where("registeredAt", "!=", null)
                    .onSnapshot(snapshot => {
                        const postData = [];
                        snapshot.forEach(doc =>
                            postData.push({
                                ...doc.data(),
                                id: doc.id,
                            }),
                        );
                        setData(postData);
                        setDataLoading(false);
                    }, () => {
                        setDataLoading(false);
                        setMessage("Permission Denied.")
                    });
            }
        }
    }, [selectedStatus, date]);
    const columns = [
        { title: "ICD Finlit User ID", field: "userId" },
        {
            title: "Country",
            field: "country",
            render: rowData => (
                <div className={classes.userName}>
                    <div className={classes.userImg}>
                        <div className={classes.imgIcon}><span aria-label="english" role="img">{rowData.flag}</span></div>
                    </div>
                    <p className={classes.fields}>
                        {rowData.country}
                    </p>
                </div>
            ),
        },
        { title: "Contact No.", field: "phone" },
        {
            title: "Pre-Registered ", searchable: false, defaultSort: 'desc', field: "createdAt", render: rowData => <p className={classes.fields}>
                {rowData.createdAt ? moment(rowData && rowData.createdAt && rowData.createdAt.toDate())
                    .local()
                    .format("DD/MM/YYYY HH:mm:ss") : ""}
            </p>
        },
        {
            title: "Registered Time", searchable: false, field: "registeredAt", render: rowData => <p className={classes.fields}>
                {rowData.registeredAt ? moment(rowData && rowData.registeredAt && rowData.registeredAt.toDate())
                    .local()
                    .format("DD/MM/YYYY HH:mm:ss") : ""}
            </p>
        },
    ];
    return (
        <div className="preRegisterCont">
            <Widget disableWidgetMenu >
                <div className={classes.title}>Pre Registered Users</div>
                <div className={classes.headerCon}>
                    <div className="searchBox">
                        <div className="dropdown">
                            <div className="statusDropdown">
                                <NativeDropdown
                                    onChange={e => setSelectedStatus(e.target.value)}
                                    label="Select Status"
                                    data={[{ name: "Pre-Registered", value: "Pre-Registered" }, { name: "Registered", value: "Registered" }]}
                                />
                            </div>
                            <form className="DatePick" noValidate>
                                <DateRangePicker
                                    appearance="default"
                                    placeholder="From &nbsp; &nbsp; - &nbsp; &nbsp;  To"
                                    style={{ width: 200, height: 10 }}
                                    ranges={[]}
                                    renderValue={value => { return `To: ${moment(value[0]).format("ddd D MMM")} __ From: ${moment(value[1]).format("ddd D MMM")}` }}
                                    onChange={(e) => SetDateRange(e)}
                                />
                            </form>
                        </div>
                        <div className="userNums">
                            <p>Total Users: {((date.From || date.To) === "") ? data.length : sortedData.length}</p>
                        </div>
                    </div>
                </div>
                {dataLoading ? (
                    <div className={classes.loading}>
                        <CircularProgress color="secondary" size={60} thickness={5} />
                    </div>
                ) : (
                    ((date.From || date.To) === "") ?
                        <Table
                            data={data}
                            columns={columns}
                            filtering={false}
                            message={message}
                            title="All Users"
                        />
                        : <Table
                            data={sortedData}
                            columns={columns}
                            filtering={false}
                            message={message}
                            title="All Users"
                        />
                )}
            </Widget>
        </div>
    )
}