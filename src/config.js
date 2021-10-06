import firebase from "firebase";

export default {
  API_URI: process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : "https://development-spot.cashero.com",
  SOCKETS_URI:
    process.env.NODE_ENV === "production"
      ? "wss://dogecodes-chat-api.herokuapp.com/"
      : "ws://localhost:8000/",
};

export const table = {
  StaffApprovals: "StaffApprovals",
  CustomerApprovals: "CustomerApprovals",
  Staff: "Staff",
  UsersSummary: "UsersSummary",
  StaffSummary: "StaffSummary",
  StaffRoles: "StaffRoles",
  Departments: "Departments",
  Accounts: "Accounts",
  balances: "balances",
  Businesses: "Businesses",
  Users: "Users",
  Configs: "Configs",
  FeeApprovals: "FeeApprovals",
  CharityApprovals: "CharityApprovals",
  CollectiveTick: "CollectiveTick",
  PreLaunchRegistration: "PreLaunchRegistration",
  JackPot: "JackPot",
  GoldenTicketDetail: "GoldenTicketDetail",
  GoldenTicketHistory: "GoldenTicketHistory",
};

export const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export const statuses = {
  Enabled: "enabled",
  enabled: "Enabled",
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  accepted: "Accepted",
  suspended: "Suspended",
  new: "New",
};

export const roles = {
  CEO: "chief executive officer",
  Director: "director",
  Manager: "manager",
  Administration: "administration",
  Team: "team",
  StaffMember: "staff member",
};

export const departments = {
  customerExperience: "customer experience",
  finance: "finance",
  hr: "hr",
  marketing: "marketing",
  technology: "technology",
};

export const types = {
  setPermission: "Set Permission",
  suspendAccount: "Suspend Account",
  enableAccount: "Enable Account",
  feeUpdation: "Fee Updation",
  charityApproval: "Charity Approval"
};
// firebase configuration....

const config = {
  apiKey: process.env.REACT_APP_API_KEY ? process.env.REACT_APP_API_KEY : "AIzaSyAvwoRGRjwXacdI9Ge7m0Po-OLwc7GADtQ",
  authDomain: process.env.REACT_APP_AUTH_DOMAIN ? process.env.REACT_APP_AUTH_DOMAIN : "cashero-development-76cca.firebaseapp.com",
  databaseURL: process.env.REACT_APP_DATABASE_URL ? process.env.REACT_APP_DATABASE_URL : "https://cashero-development-76cca.firebaseio.com",
  projectId: process.env.REACT_APP_PROJECT_ID ? process.env.REACT_APP_PROJECT_ID : "cashero-development-76cca",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID ? process.env.REACT_APP_MESSAGING_SENDER_ID : "438013233007",
  appId: process.env.REACT_APP_APP_ID ? process.env.REACT_APP_APP_ID : "1:438013233007:web:5c58ccd143a0f4d8340a9a",
  measurementId: process.env.REACT_APP_MEASUREMENT_ID ? process.env.REACT_APP_MEASUREMENT_ID : "G-S63M2CQJ1F",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET ? process.env.REACT_APP_STORAGE_BUCKET : "cashero-development-76cca.appspot.com",
};

firebase.initializeApp(config);

if (process.env.REACT_APP_USE_EMULATOR) {
  const auth = firebase.auth();
  const storage = firebase.storage();
  var db = firebase.firestore();
  storage.useEmulator("http://localhost:9199");
  auth.useEmulator("http://localhost:9099")
  db.settings({ host: "localhost:8080", ssl: false });
}

export { firebase };
