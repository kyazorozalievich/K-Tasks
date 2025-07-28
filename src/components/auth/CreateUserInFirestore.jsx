import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const CreateUserInFirestore = async (user) => {
  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      displayName: user.displayName || "Без имени",
      email: user.email || "",
      completedTasks: [],
      points: 0,
    });
  }
};
