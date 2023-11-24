import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const addData = async (date: any, notes: any) => {
  let d = date?.get("D")?.toString();
  let m = date?.get("M")?.toString();
  let y = date?.get("year")?.toString();

  await setDoc(doc(db, "sd", d + "-" + m + "-" + y), {
    tasks: notes,
  });
};

export const isDocExist = async (date: any) => {
  let d = date?.get("D")?.toString();
  let m = date?.get("M")?.toString();
  let y = date?.get("year")?.toString();

  const docRef = doc(db, "sd", d + "-" + m + "-" + y);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return true;
  } else {
    // docSnap.data() will be undefined in this case
    return false;
  }
};

export const getData = async (date: any) => {
  let d = date?.get("D")?.toString();
  let m = date?.get("M")?.toString();
  let y = date?.get("year")?.toString();

  const docRef = doc(db, "sd", d + "-" + m + "-" + y);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    return { tasks: [] };
  }
};
