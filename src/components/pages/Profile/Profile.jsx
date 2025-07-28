import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import data from "../../../data/data";
import scss from "./Profile.module.scss";
import { RootContext } from "../../../context/RootContext";
import { PiMedalLight } from "react-icons/pi";
import { CgMediaLive } from "react-icons/cg";
import { IoIosTrendingUp, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const { setUser, taskCompleted, points, user, language } =
    useContext(RootContext);
  const [date, setDate] = useState("");
  const [daysSinceReg, setDaysSinceReg] = useState(0);
  const [click, setClick] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const creationTime = user.metadata.creationTime;
        const regDate = new Date(creationTime);

        const day = String(regDate.getDate()).padStart(2, "0");
        const month = String(regDate.getMonth() + 1).padStart(2, "0");
        const year = regDate.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        setDate(formattedDate);

        const now = new Date();
        const diffTime = now - regDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        setDaysSinceReg(diffDays);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return <p>Вы не вошли в аккаунт</p>;
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Ошибка при выходе:", error);
      });
  };

  //Last//////
  const compTaskId = taskCompleted.slice(-1)[0];
  const lastTask = data.find((el) => el.id === compTaskId?.id);

  //Tasks/////
  const completedIds = new Set(taskCompleted.map((item) => item.id));
  const completedTasks = data.filter((el) => completedIds.has(el.id));

  console.log(taskCompleted);

  return (
    <section className={scss.Profile}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.main}>
            <div className={scss.about}>
              <div className={scss.account}>
                <img src={user.photoURL} alt="" />
                <div className={scss.accName}>
                  <h3>{user.displayName}</h3>
                  <h6>{user.email}</h6>
                </div>
              </div>
              <div className={scss.rank}>
                <h6>{language === "ru" ? "Ранг" : "Даража"}</h6>
                <span
                  style={{
                    background:
                      points < 100
                        ? "green"
                        : points >= 100 && points < 200
                        ? "blue"
                        : points >= 200 && points < 300
                        ? "yellow"
                        : points >= 300 && points < 400
                        ? "orange"
                        : "red",
                    color: points >= 200 && points < 300 ? "black" : "white",
                  }}
                >
                  {points < 100
                    ? "1"
                    : points >= 100 && points < 200
                    ? "2"
                    : points >= 200 && points < 300
                    ? "3"
                    : points >= 300 && points < 400
                    ? "4"
                    : "5"}{" "}
                  {language === "ru" ? "Уровень" : "Деңгээл"}
                </span>
              </div>
              <div className={scss.progress}>
                <div className={scss.proText}>
                  {points < 500 ? (
                    <h4>
                      {language === "ru" && "Прогресс до "}
                      {points < 100
                        ? "2 "
                        : points >= 100 && points < 200
                        ? "3 "
                        : points >= 200 && points < 300
                        ? "4 "
                        : "5 "}
                      {language === "ru" && "уровня"}
                      {language === "kg" && "Деңгээлге чейин прогресс"}
                    </h4>
                  ) : (
                    <h4>
                      {language === "ru"
                        ? "Весь прогресс пройден"
                        : "Бардык прогресске жетишилди"}
                    </h4>
                  )}
                  {points < 500 ? (
                    <h4>
                      {String(points).length <= 2
                        ? points
                        : Number(String(points).slice(1)) < 10
                        ? String(points).slice(2)
                        : String(points).slice(1)}
                      %
                    </h4>
                  ) : (
                    <h4>100%</h4>
                  )}
                </div>
                <div className={scss.proLine}>
                  <div
                    className={scss.after}
                    style={{
                      width:
                        String(points).length <= 2
                          ? `${points}%`
                          : Number(String(points).slice(1)) < 10
                          ? `${String(points).slice(2)}%`
                          : `${String(points).slice(1)}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className={scss.userDate}>
                <h6>
                  {language === "ru" && "Участник с"} {date}{" "}
                  {language === "kg" && "бери катышуучу"}
                </h6>
                <button onClick={handleLogout}>
                  Logout <IoLogOutOutline />
                </button>
              </div>
            </div>
            <div className={scss.div}>
              <div className={scss.title}>
                <h4>{language === "ru" ? "Очки" : "Упайлар"}</h4>
                <span>
                  <PiMedalLight />
                </span>
              </div>
              <h1>
                {points} {language === "ru" ? "Очко" : "Упай"}
              </h1>
              <h6>
                +{lastTask?.level || 0}{" "}
                {language === "ru"
                  ? "с последней задачи"
                  : "акыркы тапшырмадан"}
              </h6>
            </div>
            <div className={scss.div}>
              <div className={scss.title}>
                <h4>
                  {language === "ru"
                    ? "Завершенные задачи"
                    : "Аткарылган тапшырмалар"}
                </h4>
                <span>
                  <CgMediaLive />
                </span>
              </div>
              <h1>
                {taskCompleted.length}{" "}
                {language === "ru" ? "задачи" : "тапшырмалар"}
              </h1>
              <h6>
                {language === "ru"
                  ? "На языке Javascript"
                  : "Javascript тилинде"}
              </h6>
            </div>
            <div className={scss.div}>
              <div className={scss.title}>
                <h4>
                  {language === "ru" ? "Текущая серия" : "Учурдагы катар"}
                </h4>
                <span>
                  <IoIosTrendingUp />
                </span>
              </div>
              <h1>
                {daysSinceReg} {language === "ru" ? "дней" : "күн "}
              </h1>
              <h6>{language === "ru" ? "Так держать!" : "Уланта бер!"}</h6>
            </div>
          </div>

          <div className={scss.buttons}>
            <button
              className={!click ? scss.btn1 : scss.btn2}
              onClick={() => setClick(false)}
            >
              {language === "ru"
                ? "Завершенные задачи"
                : "Аткарылган тапшырмалар"}
            </button>
            <button
              className={!click ? scss.btn2 : scss.btn1}
              onClick={() => setClick(true)}
            >
              {language === "ru" ? "Таблица лидеров" : "Лидер тактасы"}
            </button>
          </div>

          {!click ? (
            <div className={scss.complTasks}>
              <div className={scss.mainText}>
                <h3>
                  {language === "ru"
                    ? "Завершенные задачи"
                    : "Аткарылган тапшырмалар"}
                </h3>
                <h6>
                  {language === "ru"
                    ? "Все ваши успешно завершенные задачи"
                    : "Бардык ийгиликтүү аяктаган тапшырмаларыныз"}
                </h6>
              </div>
              <div className={scss.complBlocks}>
                {completedTasks.map((el) => (
                  <div className={scss.complBlock} key={el?.id}>
                    <div className={scss.left}>
                      <span>
                        <IoMdCheckmarkCircleOutline />
                      </span>
                      <div className={scss.blockText}>
                        <h5 onClick={() => navigate(`/TaskDetail/${el.id}`)}>
                          {language === "ru" ? el?.title.ru : el.title.kg}
                        </h5>
                        <div className={scss.pointDate}>
                          <span
                            className={
                              el?.level === 1
                                ? scss.beginner
                                : el?.level === 2
                                ? scss.easy
                                : el?.level === 3
                                ? scss.medium
                                : el?.level === 4
                                ? scss.hard
                                : scss.expert
                            }
                          >
                            {el?.level === 1
                              ? language === "ru"
                                ? "Новичок"
                                : "Yйрөнчүк"
                              : el?.level === 2
                              ? language === "ru"
                                ? "Легкий"
                                : "Оңой"
                              : el?.level === 3
                              ? language === "ru"
                                ? "Средний"
                                : "Орточо"
                              : el?.level === 4
                              ? language === "ru"
                                ? "Сложный"
                                : "Татаал"
                              : language === "ru"
                              ? "Эксперт"
                              : "Эксперт"}
                          </span>
                          <h6>/ Javascript</h6>
                        </div>
                      </div>
                    </div>
                    <div className={scss.right}>
                      <h5>+ {el.level}</h5>
                      <h6>{language === "ru" ? "Очко" : "Упай"}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={scss.tableLeaders}>
              <h1>
                404{" "}
                {language === "ru" ? "Неизвестная ошибка!" : "Белгисиз ката!"}
              </h1>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
