const firebaseConfig = {
  apiKey: "YOUR_KEY",
  databaseURL: "YOUR_DB_URL",
  projectId: "YOUR_PROJECT_ID"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const auth = firebase.auth();
const messaging = firebase.messaging();