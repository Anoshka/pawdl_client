import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import BioPage from "./pages/BioPage/BioPage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Chat from "./components/Chat/Chat";
import DiscoverPage from "./pages/DiscoverPage/DiscoverPage";
import AddEditPage from "./pages/AddEditPage/AddEditPage";
import LogoutPage from "./pages/LogoutPage/LogoutPage";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("SavedToken");
    if (savedToken) {
      setToken(savedToken.split(" ")[1]);
    }
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <BioPage
              email={email}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />
          }
        />
        <Route path="/user/:id" element={<BioPage />} />
        <Route path="/post/:id" element={<AddEditPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/chat" element={<Chat token={token} />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route
          path="/login"
          element={<LoginPage setLoggedIn={setLoggedIn} setEmail={setEmail} />}
        />
        <Route
          path="/register"
          element={
            <RegisterPage setLoggedIn={setLoggedIn} setEmail={setEmail} />
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default App;
