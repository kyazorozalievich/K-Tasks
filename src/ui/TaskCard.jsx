"use client";
import scss from "./TaskCard.module.scss";
import { RiCodeLine } from "react-icons/ri";
import { MdChevronRight } from "react-icons/md";
import { useContext } from "react";
import { RootContext } from "../context/RootContext";
import { useNavigate } from "react-router-dom";
import { IoMdCheckmark } from "react-icons/io";

const TaskCard = ({ el }) => {
  const { language, taskCompleted } = useContext(RootContext);
  const navigate = useNavigate();

  return (
    <div className={scss.card} key={el.id}>
      <div className={scss.levelTask}>
        {taskCompleted.some((item) => item.id === el.id) ? (
          <span>
            <IoMdCheckmark />
          </span>
        ) : (
          <span>
            <RiCodeLine />
          </span>
        )}

        <h6
          className={
            el.level === 1
              ? scss.beginner
              : el.level === 2
              ? scss.easy
              : el.level === 3
              ? scss.medium
              : el.level === 4
              ? scss.hard
              : scss.expert
          }
        >
          {el.level === 1
            ? language === "ru"
              ? "Новичок"
              : "Yйрөнчүк"
            : el.level === 2
            ? language === "ru"
              ? "Легкий"
              : "Оңой"
            : el.level === 3
            ? language === "ru"
              ? "Средний"
              : "Орточо"
            : el.level === 4
            ? language === "ru"
              ? "Сложный"
              : "Татаал"
            : language === "ru"
            ? "Эксперт"
            : "Эксперт"}
        </h6>
        {taskCompleted.some((item) => item.id === el.id) && (
          <h5 className={scss.finishText}>
            {" "}
            <i>{language === "ru" ? "Завершен" : "Бүткөн"}</i>{" "}
          </h5>
        )}
      </div>
      <h3>{language === "ru" ? el.title.ru : el.title.kg}</h3>
      <p>
        {language === "ru"
          ? el.description.ru.length >= 80
            ? el.description.ru.slice(0, 80) + "..."
            : el.description.ru
          : el.description.kg.length >= 80
          ? el.description.kg.slice(0, 80) + "..."
          : el.description.kg}
      </p>
      <div className={scss.end}>
        <p>
          {language === "ru" ? "Примеры" : "Мисалдар"}: {el.examples.length}
        </p>
        <button onClick={() => navigate(`/TaskDetail/${el.id}`)}>
          {language === "ru" ? "Решить" : "Чыгаруу"}
          <span>
            <MdChevronRight />
          </span>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
