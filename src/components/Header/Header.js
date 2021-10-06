import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from "@material-ui/core";
import {
  Menu as MenuIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
} from "@material-ui/icons";
import CloseIcon from '@material-ui/icons/Close';
import classNames from "classnames";
import useStyles from "./styles";
import arrow from "../../images/arrowdrop.svg";
import { firebase, table } from "../../config";
import { Badge, Typography } from "../Wrappers/Wrappers";
import Notification from "../Notification/Notification";
import { useLayoutState, useLayoutDispatch, toggleSidebar } from "../../context/LayoutContext";
import { useUserDispatch, signOut } from "../../context/UserContext";
import logo from "../../images/logosmall.png";

const notifications = [
  // { id: 0, color: "warning", message: <p className="width ellipse twolines"><span className="bold">Maria Pereira</span> requested $50 to <span className="bold">Olive Wood</span> <span className="br-block"></span> Here's what you owe me, thank you.</p> },
  // {
  //   id: 1,
  //   color: "success",
  //   type: "info",
  //   message: <p className="width ellipse two-lines"><span className="bold">Olive Wood </span> send $50 to <span className="bold">Maria Pereira</span> <span className="br-block"></span> Look how easy it is to make payments through <span className="br-block"></span> ICD Finlit!</p>,
  //   time: <p className="time">1 min ago</p>,
  // },
];

export default function Header(props) {
  const [picture, setPicture] = useState("");
  var userDispatch = useUserDispatch();
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(44);
  const { history } = props;
  const onLogoutButtonClick = useCallback(() => {
    signOut(userDispatch, history)
  }, [userDispatch, history]);
  useEffect(() => {
    let time = localStorage.getItem("loginTime")
    let temp = new Date();
    time = new Date(time);
    let delta = Math.abs(time - temp) / 1000;
    let days = Math.floor(delta / 86400);
    delta -= days * 86400;
    let hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    let mins = Math.floor(delta / 60) % 60;
    delta -= mins * 60;
    let secs = delta % 60;
    secs = Math.round(secs);
    setSeconds(() => {
      return 59 - secs
    });
    setMinutes(() => {
      return 44 - mins
    });
    setInterval(() => {
      setSeconds(seconds => {
        seconds = seconds === 0 ? 59 : seconds - 1;
        setMinutes(minutes => {
          if (hours >= 1 || minutes < 0 || mins >= 10) {
            onLogoutButtonClick()
          }
          return seconds === 0 ? minutes - 1 : minutes
        })
        return seconds;
      })
    }, 1000)
  }, [onLogoutButtonClick])
  console.log(minutes, ":", seconds)
  var classes = useStyles();
  React.useEffect(() => {
    firebase
      .firestore()
      .collection(table.Staff)
      .doc(window.localStorage.getItem("userID"))
      .get()
      .then(snapshot => {
        setPicture(snapshot.data().profile)
        // snapshot.docChanges().forEach(change => {
        //   window.localStorage.setItem("userID", change.doc.id);
        //   setPicture(change.doc.data().profile)
        // })
      })
  }, []);
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  var [notificationsMenu, setNotificationsMenu] = useState(null);
  var [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  var [profileMenu, setProfileMenu] = useState(null);
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.logotype}>
          <img src={logo} alt="Logo" className={classes.logoIcon} />
        </div>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButton,
            classes.headerMenuButtonCollapse,
          )}
          data-testid="button-toggle"
        >
          {layoutState.isSidebarOpened ? (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
            <CloseIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          )}
        </IconButton>
        <div className={classes.grow} />
        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={e => {
            setNotificationsMenu(e.currentTarget);
            setIsNotificationsUnread(false);
          }}
          className={classes.headerMenuButton}
          data-testid='button:notification'
        >
          <Badge
            badgeContent={isNotificationsUnread ? notifications.length : null}
            color="danger"
          >
            <NotificationsIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={e => setProfileMenu(e.currentTarget)}
          data-testid='button:setProfilemenu'
        >
          {picture ?
            <img className={classes.profile} src={picture} alt="Profile" />
            :
            <AccountIcon classes={{ root: classes.headerIcon }} />
          }
        </IconButton>
        <div className={classes.headerMenuFlagButton}>
          <div className={classes.headerFlagIcon}><span aria-label="english" role="img">🇺🇸</span></div>
          <Typography variant="h6" weight="normal">
            English
          </Typography>
        </div>
        <Menu
          id="notifications-menu"
          // open={Boolean(notificationsMenu)}
          anchorEl={notificationsMenu}
          onClose={() => setNotificationsMenu(null)}
          className={classes.headerMenu}
          disableAutoFocusItem
        >
          {notifications.map(notification => (
            <MenuItem
              key={notification.id}
              onClick={() => setNotificationsMenu(null)}
              className={classes.headerMenuItem}
            >
              <Notification {...notification} typographyVariant="inherit" />
            </MenuItem>
          ))}
        </Menu>
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <img src={arrow} alt="arrow" />
            <Link className={classes.AccountBtn} to="/app/myProfile">Account Settings</Link>
          </div>
          <div className={classes.hrBorder}></div>
          <div className={classes.Logout}>
            <Typography
              className={classes.profileMenuLink}
              onClick={() => signOut(userDispatch, history)}
              data-testid='button:logout'
            >
              Logout
            </Typography>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}