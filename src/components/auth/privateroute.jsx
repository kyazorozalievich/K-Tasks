import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { RootContext } from "../../context/RootContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(RootContext);
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
