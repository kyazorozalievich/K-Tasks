import { createContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export const RootContext = createContext();

const RootProvider = ({ children }) => {
  const [language, setLanguage] = useState("ru");
  const [taskLevel, setTaskLevel] = useState("all");
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [taskCompleted, setTaskCompleted] = useState([]);
  const [points, setPoints] = useState(0);

  function translateFun() {
    const data = JSON.parse(localStorage.getItem("language")) || "";
    setLanguage(data);
  }

  function taskLevelFun() {
    const data = JSON.parse(localStorage.getItem("level")) || "";
    setTaskLevel(data);
  }

  async function fetchCompletedTasks() {
    if (!user?.uid) return;

    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setTaskCompleted(userData.completedTasks || []);
      }
    } catch (error) {
      console.error("Ошибка загрузки очков", error);
    }
  }

  async function fetchPoints() {
    if (!user?.uid) return;

    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setPoints(userData.points || 0);
      }
    } catch (error) {
      console.error("Ошибка загрузки очков", error);
    }
  }

  useEffect(() => {
    fetchCompletedTasks();
    fetchPoints();
  }, [user?.uid]);

  useEffect(() => {
    translateFun();
    taskLevelFun();
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <RootContext.Provider
      value={{
        language,
        setLanguage,
        taskLevel,
        setTaskLevel,
        user,
        setUser,
        taskCompleted,
        points,
        fetchCompletedTasks,
        fetchPoints,
      }}
    >
      {children}
    </RootContext.Provider>
  );
};

export default RootProvider;
