import * as admin from "firebase-admin";
import * as serviceAccount from "../../serviceAccountKey.json";

const serviceKey:any = serviceAccount;
admin.initializeApp({
  credential: admin.credential.cert(serviceKey),
  databaseURL: "https://crud-testing-2b311-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = admin.firestore();
export default {admin, db};
