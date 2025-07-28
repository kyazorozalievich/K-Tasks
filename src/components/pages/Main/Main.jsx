"use client";
import scss from "./Main.module.scss";
import { LuBrain, LuCirclePower, LuUsers } from "react-icons/lu";
import { FaCode } from "react-icons/fa";
import { IoTrendingUpSharp } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { RootContext } from "../../../context/RootContext";
import data from "../../../data/data";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Main = () => {
  const { language } = useContext(RootContext);
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
 
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const querySnapshot = await getDocs(collection(db, "users"));
          setCount(querySnapshot.size);
        } catch (error) {
          console.error(
            "Ошибка при получении количества пользователей:",
            error
          );
        }
      } else {
        setUser(null);
        setCount(0);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (!user) return <div>Пожалуйста, войдите в систему</div>;


  return (
    <section className={scss.Main}>
      <div className="container">
        <div className={scss.content}>
          <span className={scss.brain}>
            <LuBrain />
          </span>
          <h1>
            {language === "ru"
              ? "Изучай JavaScript логику"
              : "JavaScript логикасын үйрөнүңүз"}
          </h1>
          <h6>
            {language === "ru"
              ? "Решай задачи и развивай навыки программирования"
              : "Проблемаларды чечүү жана программалоо көндүмдөрүн өнүктүрүү"}
          </h6>
          <button
            onClick={() => window.scrollBy({ top: 700, behavior: "smooth" })}
          >
            <LuCirclePower />
            {language === "ru" ? " Начать решать" : "Чечим кабыл алуу"}
          </button>
          <div className={scss.analytic}>
            <div className={scss.tasks}>
              <span>
                <FaCode />
              </span>
              <h3>{data.length}</h3>
              <h6>{language === "ru" ? "Всего задач" : "Жалпы тапшырмалар"}</h6>
            </div>
            <div className={scss.people}>
              <span>
                <LuUsers />
              </span>
              <h3>{count}</h3>
              <h6>{language === "ru" ? "Участников" : "Катышуучулар"}</h6>
            </div>
            <div className={scss.target}>
              <span>
                <IoTrendingUpSharp />
              </span>
              <h3>97%</h3>
              <h6>{language === "ru" ? "Успеваемость" : "Kөрсөткүч"}</h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
