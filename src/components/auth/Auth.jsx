import scss from "./Auth.module.scss";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { CreateUserInFirestore } from "./CreateUserInFirestore";
import { useContext } from "react";
import { RootContext } from "../../context/RootContext";
import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  const navigate = useNavigate();
  const { setUser, user } = useContext(RootContext);

  if (user) {
    return navigate("/");
  }

  const handleLogin = async () => {
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
      <h2>Войти через Google</h2>
      <button onClick={handleLogin}>
        Войти в Google{" "}
        <span>
          <FcGoogle />
        </span>
      </button>
    </div>
  );
};

export default Auth;
