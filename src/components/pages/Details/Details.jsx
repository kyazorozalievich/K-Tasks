"use client";
import scss from "./Details.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { RootContext } from "../../../context/RootContext";
import data from "../../../data/data";
import { IoCodeSlash } from "react-icons/io5";
import { FiArrowLeft, FiBookOpen } from "react-icons/fi";
import { VscDebugRestart } from "react-icons/vsc";
import { BiRightArrow } from "react-icons/bi";
import { GoArrowRight } from "react-icons/go";
import { Editor } from "@monaco-editor/react";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../firebase";
import { auth } from "../../../firebase";
import { Timestamp } from "firebase/firestore";

const Details = () => {
  const { id } = useParams();
  const { language, taskCompleted, fetchCompletedTasks, fetchPoints } =
    useContext(RootContext);
  const navigate = useNavigate();
  const dtl = data.find((el) => el.id === +id);
  const [results, setResults] = useState([]);
  const [codes, setCode] = useState(null);

  // Для кастомного уведомления
  const [notif, setNotif] = useState({
    visible: false,
    message: "",
    type: "info", // "success" | "error" | "info"
  });

  // Функция показа уведомления
  const showNotification = (message, type = "info") => {
    setNotif({ visible: true, message, type });
    setTimeout(
      () => setNotif({ visible: false, message: "", type: "info" }),
      3000
    );
  };

  useEffect(() => {
    if (!dtl) return;

    const found = taskCompleted.find((el) => el.id === dtl.id);
    if (found) {
      setCode(found.code);
    } else {
      setCode(dtl.initialCode);
    }
  }, [dtl, taskCompleted]);

  const handleRun = () => {
    try {
      const func = new Function(
        `${codes}; return typeof javascript === "function" ? javascript : null;`
      )();

      if (!func) {
        showNotification(
          language === "ru"
            ? "Ошибка: не найдена функция 'javascript'"
            : "Ката: 'javascript' функциясы табылган жок",
          "error"
        );
        return;
      }

      const newResults = dtl.testCases.map((test) => {
        let args;
        try {
          args = eval(`[${test.input}]`);
        } catch {
          return {
            input: test.input,
            output: language === "ru" ? "Ошибка парсинга" : "Парсинг катасы",
            expected: test.expectedOutput,
            correct: false,
          };
        }

        let result;
        try {
          result = func(...args);
        } catch {
          return {
            input: test.input,
            output: language === "ru" ? "Ошибка выполнения" : "Аткарууда ката",
            expected: test.expectedOutput,
            correct: false,
          };
        }

        let expectedParsed;
        try {
          expectedParsed = eval(`(${test.expectedOutput})`);
        } catch {
          expectedParsed = test.expectedOutput;
        }

        const isCorrect =
          JSON.stringify(result) === JSON.stringify(expectedParsed);

        return {
          input: test.input,
          output: JSON.stringify(result), 
          expected: JSON.stringify(expectedParsed),
          correct: isCorrect,
        };
      });

      setResults(newResults);

      const allPassed = newResults.every((r) => r.correct);

      if (allPassed) {
        showNotification(
          language === "ru"
            ? "Задача успешно выполнена!"
            : "Тапшырма ийгиликтүү бүткөрүлдү!",
          "success"
        );
        saveCompletedTask();
      } else {
        showNotification(
          language === "ru"
            ? "Проверьте правильность решения"
            : "Чечимди текшериңиз",
          "info"
        );
      }
    } catch (err) {
      console.error("Ошибка:", err);
      showNotification(
        language === "ru"
          ? "Ошибка выполнения кода"
          : "Кодду аткарууда ката болду",
        "error"
      );
      setResults([
        {
          input: "",
          output: language === "ru" ? "Ошибка выполнения" : "Аткарууда ката",
          expected: "",
          correct: false,
        },
      ]);
    }
  };

  const saveCompletedTask = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    try {
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        console.error("Пользователь не найден в базе");
        return;
      }

      const userData = userSnap.data();

      const alreadyCompleted = (userData.completedTasks || []).some(
        (task) => task.id === dtl.id
      );
      if (alreadyCompleted) {
        console.log("Задача уже была добавлена ранее");
        return;
      }

      const taskToSave = {
        id: dtl.id,
        code: codes,
        date: Timestamp.now(),
      };

      await updateDoc(userRef, {
        completedTasks: arrayUnion(taskToSave),
        points: (userData.points || 0) + dtl.level,
      });

      fetchCompletedTasks();
      fetchPoints();

      console.log("✅ Задача и код пользователя сохранены");
    } catch (error) {
      console.error("Ошибка при сохранении решённой задачи:", error);
      showNotification(
        language === "ru"
          ? "Ошибка при сохранении задачи"
          : "Тапшырманы сактоодо ката",
        "error"
      );
    }
  };

  const resetCurrentTask = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    try {
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        console.error("Пользователь не найден в базе");
        return;
      }

      const userData = userSnap.data();
      const currentTasks = userData.completedTasks || [];

      const updatedTasks = currentTasks.filter((task) => task.id !== dtl.id);

      if (updatedTasks.length === currentTasks.length) {
        showNotification(
          language === "ru"
            ? "Задача еще не решена"
            : "Бул тапшырма али бүткөн эмес",
          "info"
        );
        return;
      }

      const newPoints = Math.max((userData.points || 0) - dtl.level, 0);

      await updateDoc(userRef, {
        completedTasks: updatedTasks,
        points: newPoints,
      });

      fetchCompletedTasks();
      fetchPoints();
      setResults([]);

      showNotification(
        language === "ru"
          ? "Прогресс по задаче сброшен"
          : "Тапшырма баштапкы абалга келтирилди",
        "success"
      );
    } catch (error) {
      console.error("Ошибка при сбросе задачи:", error);
      showNotification(
        language === "ru" ? "Ошибка при сбросе" : "Сбростоодо ката",
        "error"
      );
    }
  };

  return (
    <section className={scss.Details}>
      <div className="container">
        {notif.visible && (
          <div
            className={`${scss.notification} ${
              notif.type === "success"
                ? scss.success
                : notif.type === "error"
                ? scss.error
                : scss.info
            }`}
          >
            {notif.message}
          </div>
        )}

        <div className={scss.content}>
          <div className={scss.task}>
            <div className={scss.main}>
              <button onClick={() => navigate("/")}>
                <span>
                  <FiArrowLeft />
                </span>
                {language === "ru" ? "Назад к задачам" : "Тапшырмаларга кайтуу"}
              </button>
              {taskCompleted.some((el) => el.id === dtl.id) && (
                <span className={scss.completed}>
                  ✅<i> {language === "ru" ? "Решено" : "Бүткөн"}</i>
                </span>
              )}
            </div>
            <div className={scss.title}>
              <span>
                <IoCodeSlash />
              </span>
              <h1>{language === "ru" ? dtl.title.ru : dtl.title.kg}</h1>
              <h6
                className={
                  dtl.level === 1
                    ? scss.beginner
                    : dtl.level === 2
                    ? scss.easy
                    : dtl.level === 3
                    ? scss.medium
                    : dtl.level === 4
                    ? scss.hard
                    : scss.expert
                }
              >
                {dtl.level === 1
                  ? language === "ru"
                    ? "Новичок"
                    : "Yйрөнчүк"
                  : dtl.level === 2
                  ? language === "ru"
                    ? "Легкий"
                    : "Оңой"
                  : dtl.level === 3
                  ? language === "ru"
                    ? "Средний"
                    : "Орточо"
                  : dtl.level === 4
                  ? language === "ru"
                    ? "Сложный"
                    : "Татаал"
                  : language === "ru"
                  ? "Эксперт"
                  : "Эксперт"}
              </h6>
            </div>
            <div className={scss.description}>
              <h2>
                <FiBookOpen />
                {language === "ru" ? "Описание" : "Тушундурмо"}
              </h2>
              <p>
                {language === "ru" ? dtl.description.ru : dtl.description.kg}
              </p>
            </div>
            <div className={scss.example}>
              <h2>{language === "ru" ? "Примеры" : "Мисалдар"}</h2>
              {dtl.examples.map((el, idx) => (
                <div key={idx}>
                  <h5>
                    {language === "ru" ? "Вход" : "Кирүү"}:
                    <span>{el.input}</span>
                  </h5>
                  <h5>
                    {language === "ru" ? "Выход" : "Чыгуу"}:
                    <span>{el.output}</span>
                  </h5>
                </div>
              ))}
            </div>
          </div>
          <div className={scss.taskSolution}>
            <div className={scss.solution}>
              <div className={scss.head}>
                <h3>{language === "ru" ? "Редактор кода" : "Код редактору"}</h3>
                <div className={scss.buttons}>
                  <button className={scss.white} onClick={resetCurrentTask}>
                    <span>
                      <VscDebugRestart />
                    </span>
                    {language === "ru" ? "Сбросить" : "Сброс кылуу"}
                  </button>
                  <button className={scss.dark} onClick={handleRun}>
                    <span>
                      <BiRightArrow />
                    </span>
                    {language === "ru" ? "Отправить" : "Жөнөтүү"}
                  </button>
                </div>
              </div>
              <div className={scss.inputs}>
                <div className={scss.editorWrapper}>
                  <Editor
                    defaultLanguage="javascript"
                    value={codes}
                    theme="vs-dark"
                    height="100%"
                    width="100%"
                    options={{}}
                    onChange={(value) => {
                      setCode(value);
                    }}
                  />
                </div>

                <div className={scss.result}>
                  <h3>{language === "ru" ? "Результат" : "Натыйжа"}:</h3>
                  <div className={scss.consoleBlock}>
                    {results.map((r, idx) => (
                      <pre key={idx}>
                        {`> Ввод: ${r.input}
> Ожидаемый: ${r.expected}
> Результат: ${r.output}
> ${r.correct ? "✅ Верно" : "❌ Неверно"}`}
                      </pre>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={scss.example}>
              <div className={scss.ex}>
                {dtl.testCases.map((el) => (
                  <div key={el.input}>
                    <h3>
                      <span className={scss.sky}>console</span>
                      <span className={scss.red}>.log</span>
                      <span className={scss.red}>(</span>
                      <span className={scss.green}>javascript</span>
                      <span className={scss.green}>(</span>
                      <span className={scss.purple}>{el.input}</span>
                      <span className={scss.green}>)</span>
                      <span className={scss.red}>)</span>
                    </h3>
                    <span>
                      <GoArrowRight />
                    </span>
                    <h3 className={scss.purple}>{el.expectedOutput}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
