import React, { useContext, useEffect, useState, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "./component/Dataprovider/DataProvider.jsx";
import Home from "./Pages/Home/Home.jsx";
import Login from "./Pages/Login/Login.jsx";
import axios from "./axiosConfig";
import Question from "./Pages/Question/Question.jsx";
import Register from "./Pages/Register/Register.jsx";
import Answer from "./Pages/Answer/Answer.jsx";
import NotFound from "./Pages/Login/Notfound";
import QuestionList from "./Pages/Questionlist/QuestionList";
import { getToken } from "./utils/tokenHelper"; // Import the helper

export const AppState = createContext();

function App() {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const checkUser2 = async () => {
    try {
      const token = getToken(); // Use the helper
      if (!token) {
        navigate("/login");
        return;
      }

      const { data } = await axios.get("api/user/checkUser");
      // No need for headers - axiosConfig handles it automatically
      
      setUserData({ user: data, token: token });
      setUser(data);
      console.log("User data:", data);
    } catch (error) {
      console.log("Auth check error:", error);
      if (error.response?.status === 401) {
        // Token is invalid, redirect to login
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    const token = getToken(); // Use the helper
    if (token) {
      checkUser2();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <AppState.Provider value={{ user, setUser }}>
<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/" element={<Home />} />
  <Route path="/home" element={<Home />} />
  <Route path="/question" element={<Question />} />
  <Route path="/question/:id" element={<Answer />} /> {/* This should be your answer page */}
  <Route path="/allquestion" element={<QuestionList />} />
  <Route path="*" element={<NotFound />} />
</Routes>
    </AppState.Provider>
  );
}

export default App;