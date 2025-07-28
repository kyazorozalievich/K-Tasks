import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header/Header";
import Details from "./components/pages/Details/Details";
import Footer from "./components/layout/Footer/Footer";
import MainPage from "./components/pages/Main/MainPage";
import Auth from "./components/auth/Auth";
import PrivateRoute from "./components/auth/privateroute";
import Profile from "./components/pages/Profile/Profile";

function App() {
  const data = [
    { id: 1, path: "/", page: <MainPage /> },
    { id: 2, path: "/TaskDetail/:id", page: <Details /> },
    { id: 3, path: "/profile", page: <Profile /> },
  ];

  return (
    <div className="app">
      <Header />

      <div className="mainContent">
        <Routes>
          <Route path="/login" element={<Auth />} />
          {data.map((el) => (
            <Route
              key={el.id}
              path={el.path}
              element={<PrivateRoute>{el.page}</PrivateRoute>}
            />
          ))}
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;



