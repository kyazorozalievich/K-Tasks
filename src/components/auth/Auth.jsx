import scss from "./Auth.module.scss";
import { auth, googleProvider, githubProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { CreateUserInFirestore } from "./CreateUserInFirestore";
import { useContext } from "react";
import { RootContext } from "../../context/RootContext";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const navigate = useNavigate();
  const { setUser, user } = useContext(RootContext);

  if (user) {
    return navigate("/");
  }

  const handleLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setUser(user);
      await CreateUserInFirestore(user);

      window.location.href = "/";
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={scss.auth}>
      <h2>Войти через</h2>

      <button onClick={() => handleLogin(googleProvider)}>
        Войти в Google{" "}
        <span>
          <FcGoogle />
        </span>
      </button>

      <button onClick={() => handleLogin(githubProvider)}>
        Войти через GitHub{" "}
        <span>
          <FaGithub />
        </span>
      </button>
    </div>
  );
};

export default Auth;
