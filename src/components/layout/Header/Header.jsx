"use client";
import scss from "./Header.module.scss";
import { TfiWorld } from "react-icons/tfi";
import { RiCodeLine } from "react-icons/ri";
import { useContext, useState } from "react";
import { RootContext } from "../../../context/RootContext";
import { useNavigate } from "react-router-dom";
import { IoChevronUpOutline } from "react-icons/io5";
import { FiChevronsUp } from "react-icons/fi";

const Header = () => {
  const { language, setLanguage, points, user } = useContext(RootContext);
  const [openLang, setOpenLang] = useState(false);
  const navigate = useNavigate();

  function translateFun(str) {
    let lang = JSON.parse(localStorage.getItem("language")) || "";
    lang = str;
    localStorage.setItem("language", JSON.stringify(lang));
    setLanguage(str);
    setOpenLang(false);
  }

  return (
    <header className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <div
            className={scss.logo}
            onClick={() => (user ? navigate("/") : navigate("/login"))}
          >
            <span>
              <RiCodeLine />
            </span>
            <h1>K-Tasks</h1>
          </div>
          <div className={scss.headerNav}>
            <div className={scss.translate}>
              <div
                className={scss.button}
                onClick={() => {
                  setOpenLang(!openLang);
                }}
              >
                <TfiWorld />
                <h5>
                  <small>{language === "ru" ? "RU" : "KG"}</small>
                  <span>{language === "ru" ? "RU" : "KG"}</span>
                </h5>
              </div>
              {openLang && (
                <div className={scss.choice}>
                  <h5 className={scss.ru} onClick={() => translateFun("ru")}>
                    <small>RU</small> <span>RU</span>
                  </h5>
                  <h5 className={scss.kg} onClick={() => translateFun("kg")}>
                    <small>KG</small> <span>KG</span>
                  </h5>
                </div>
              )}
            </div>
            {user && (
              <div className={scss.points}>
                <h5>{points}</h5>
                {points < 100 ? (
                  <div className={scss.one}>
                    <span>
                      <IoChevronUpOutline />
                    </span>
                  </div>
                ) : points >= 100 && points < 200 ? (
                  <div className={scss.two}>
                    <span>
                      <FiChevronsUp />
                    </span>
                  </div>
                ) : points >= 200 && points < 300 ? (
                  <div className={scss.three}>
                    <span>
                      <FiChevronsUp />
                    </span>
                    <span className={scss.t3}>
                      <IoChevronUpOutline />
                    </span>
                  </div>
                ) : points >= 300 && points < 400 ? (
                  <div className={scss.four}>
                    <span>
                      <FiChevronsUp />
                    </span>
                    <span className={scss.t4}>
                      <FiChevronsUp />
                    </span>
                  </div>
                ) : (
                  <div className={scss.five}>
                    <span>
                      <FiChevronsUp />
                    </span>
                    <span className={scss.t4}>
                      <FiChevronsUp />
                    </span>
                    <span className={scss.t3}>
                      <IoChevronUpOutline />
                    </span>
                  </div>
                )}
              </div>
            )}
            <div className={scss.profile} onClick={() => navigate("/profile")}>
              <img
                src={
                  user
                    ? user.photoURL
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU"
                }
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
