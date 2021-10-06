import React, { useEffect } from "react";
import { firebase, table, statuses } from "../config";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  const [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("loggedIn"),
  });
  useEffect(() => {
    if (!!localStorage.getItem("userID")) {
      firebase.firestore().collection(table.Staff).doc(localStorage.getItem("userID")).onSnapshot(res => {
        if (res.data().status === statuses.suspended) {
          dispatch({ type: "SIGN_OUT_SUCCESS" });
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          localStorage.removeItem("userID");
          localStorage.removeItem("role");
          localStorage.removeItem("loggedIn");
          localStorage.removeItem("loginTime");
        }
      })
    }
  }, [])
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  if (!!login && !!password) {
    firebase.auth().signInWithEmailAndPassword(login, password)
      .then((user) => {
        firebase.firestore().collection(table.Staff).doc(user.user.uid).get()
          .then(res => {
            if (res.data().status === statuses.suspended) {
              setIsLoading(false)
              setError("Unauthorized User.")
            }
            else {
              localStorage.setItem('token', user.user.refreshToken)
              localStorage.setItem('userID', user.user.uid)
              localStorage.setItem('email', login.toLowerCase())
              localStorage.setItem('role', res.data().role)
              setError(null)
              setIsLoading(false)
              history.push('/verification')
            }
          })
      })
      .catch(() => {
        setIsLoading(false)
        setError("Invalid email or password.")
      });
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("userID");
  localStorage.removeItem("role");
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("loginTime");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history && history.push("/login");
}