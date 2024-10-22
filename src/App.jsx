import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import BioPage from "./pages/BioPage/BioPage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/:id"
          element={
            <BioPage
              email={email}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />
          }
        />

        <Route path="/friends" element={<FriendsPage />} />
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
      <Footer />
    </BrowserRouter>
  );
};

export default App;
