"use client";

import scss from "./Tasks.module.scss";
import TaskCard from "../../../ui/TaskCard";
import { useContext, useState } from "react";
import { RootContext } from "../../../context/RootContext";
import data from "../../../data/data";
import { IoArrowDownSharp } from "react-icons/io5";
import { RiCloseFill } from "react-icons/ri";

const Tasks = () => {
  const { language, taskLevel, setTaskLevel, taskCompleted } =
    useContext(RootContext);
  const [pogination, setPogination] = useState(9);

  const filteredTasks = (() => {
    let filtered =
      taskLevel === "all"
        ? [...data].sort(() => Math.random() - 0.5)
        : data.filter((task) => task.difficulty === taskLevel);

    const completedIds = new Set(taskCompleted.map((item) => item.id));

    const notCompleted = filtered.filter((task) => !completedIds.has(task.id));
    const completed = filtered.filter((task) => completedIds.has(task.id));

    return [...notCompleted, ...completed];
  })();

  function taskLevelFun(str) {
    let dataL = JSON.parse(localStorage.getItem("level")) || "";
    dataL = str;
    localStorage.setItem("level", JSON.stringify(dataL));
    setTaskLevel(str);
  }

  return (
    <section className={scss.Tasks}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.nav}>
            <h1>{language === "ru" ? "Задачи" : "Тапшырмалар"}</h1>
          </div>
          <div className={scss.levels}>
            <button
              className={taskLevel === "all" ? scss.allx : scss.all}
              onClick={() => {
                taskLevelFun("all");
              }}
            >
              {language === "ru" ? "Все уровни" : "Бардык деңгээлдер"}
            </button>
            <button
              className={
                taskLevel === "beginner" ? scss.beginnerx : scss.beginner
              }
              onClick={() => {
                taskLevelFun("beginner");
              }}
            >
              {language === "ru" ? "Новичок" : "Yйрөнчүк"}
            </button>
            <button
              className={taskLevel === "easy" ? scss.easyx : scss.easy}
              onClick={() => {
                taskLevelFun("easy");
              }}
            >
              {language === "ru" ? "Легкий" : "Оңой"}
            </button>
            <button
              className={taskLevel === "medium" ? scss.mediumx : scss.medium}
              onClick={() => {
                taskLevelFun("medium");
              }}
            >
              {language === "ru" ? "Средний" : "Орточо"}
            </button>
            <button
              className={taskLevel === "hard" ? scss.hardx : scss.hard}
              onClick={() => {
                taskLevelFun("hard");
              }}
            >
              {language === "ru" ? "Сложный" : "Татаал"}
            </button>
            <button
              className={taskLevel === "expert" ? scss.expertx : scss.expert}
              onClick={() => {
                taskLevelFun("expert");
              }}
            >
              {language === "ru" ? "Эксперт" : "Эксперт"}
            </button>
          </div>
          <div className={scss.taskBlocks}>
            {filteredTasks.slice(0, pogination).map((el, idx) => (
              <TaskCard el={el} key={idx} />
            ))}
          </div>
          <div className={scss.animation}>
            <span class={scss.loader}></span>
          </div>
          {data.length > 9 && (
            <div className={scss.pogination}>
              {pogination >= data.length ? (
                <button onClick={() => setPogination(9)}>
                  Close <RiCloseFill />
                </button>
              ) : (
                <button onClick={() => setPogination(pogination + 3)}>
                  Next <IoArrowDownSharp />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Tasks;
