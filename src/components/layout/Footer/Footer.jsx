"use client";
import { RiCodeLine } from "react-icons/ri";
import scss from "./Footer.module.scss";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useContext, useState } from "react";
import { RootContext } from "../../../context/RootContext";
import { GoPaperAirplane } from "react-icons/go";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { AiOutlineIdcard } from "react-icons/ai";

const Footer = () => {
  const { language, user } = useContext(RootContext);
  const [value, setValue] = useState("");

  const onSubmit = async () => {
    if (value === "") {
      toast.error(
        language === "ru" ? "Заполните поле!" : "Маалыматты киргизиңиз!",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    } else {
      const my_id = `-1002155692436`;
      const token = `7379926721:AAGdHk5RpkeAFr5TOZApxisySaGqta-Lws4`;
      const api_key = `https://api.telegram.org/bot${token}/sendMessage`;

      const newProduct = {
        chat_id: my_id,
        parse_model: "html",
        text: `
        K-Tasks
        User email: ${user.email}
        User message: ${value}
        `,
      };

      axios.post(api_key, newProduct);
      setValue("");
      toast.success(
        language === "ru" ? "Успешно отправлено" : "Ийгиликтүү жөнөтүлдү",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    }
  };

  return (
    <footer className={scss.Footer}>
      <div className="container">
        <ToastContainer />
        <div className={scss.content}>
          <div className={scss.nav}>
            <div className={scss.logo}>
              <span>
                <RiCodeLine />
              </span>
              <h1>K-Tasks</h1>
            </div>
            <div className={scss.message}>
              <h6>
                {language === "ru"
                  ? "Если на сайте возникли проблемы, сообщите нам"
                  : "Эгер сайтта көйгөйлөр пайда болсо, бизге кабарлаңыз"}
              </h6>
              <div className={scss.input}>
                <input
                  type="text"
                  placeholder={
                    language === "ru"
                      ? "Введите сообщение..."
                      : "Билдирүү жазыңыз..."
                  }
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                />
                <button onClick={onSubmit}>
                  <GoPaperAirplane />
                </button>
              </div>
            </div>
          </div>
          <span class={scss.loader}></span>
          <div className={scss.autors}>
            <h3>
              Autors: <br />
              <span>
                Kyaz Orozalievich, <br />
                Nasipov Bekmyrza <br />
                Kubanych
              </span>
            </h3>
            <div className={scss.icons}>
              <span
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/k_orozalievich/profilecard/?igsh=MWo4bDRjZ2t6M213bg==",
                    "_blank"
                  )
                }
              >
                <FaInstagram />
              </span>

              <span
                onClick={() =>
                  window.open("https://wa.me/996995255592", "_blank")
                }
              >
                <FaWhatsapp />
              </span>

              <span
                onClick={() =>
                  window.open("https://kyaz-dev.vercel.app/", "_blank")
                }
              >
                <AiOutlineIdcard />
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
