import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const addData = async (date: any, notes: any) => {
  try {
    
    await setDoc(doc(db, "sd", date), {
      tasks: notes,
    });
    return { message: "success" };
  } catch (error) {
    return { message: "fail" };
  }

};

export const isDocExist = async (date: any) => {
  // let d = date?.get("D")?.toString();
  // let m = date?.get("M");
  // let y = date?.get("year")?.toString();

  // console.log("month", m);

  const docRef = doc(db, "sd", date);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return true;
  } else {
    // docSnap.data() will be undefined in this case
    return false;
  }
};

export const getData = async (date: any) => {

  console.log("cur",date)
  const docRef = doc(db, "sd", date);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    return { tasks: [] };
  }
};
