// import { useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AppState } from '../../App';
// import axios from '../../axiosConfig';
// import styles from './home.module.css';


// function Home() {
//     const { user } = useContext(AppState);
//     const navigate = useNavigate();
//     const [questions, setQuestions] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         fetchQuestions();
//     }, []);

//     const fetchQuestions = async () => {
//         try {
//             setLoading(true);
//             setError('');
//             const { data } = await axios.get('api/question');
//             setQuestions(data.questions || []);
//         } catch (error) {
//             console.error('Error fetching questions:', error);
//             setError('Failed to load questions. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleAskQuestion = () => {
//         navigate('/question');
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         navigate('/login');
//     };

//     const handleQuestionClick = (questionId) => {
//         navigate(`/question/${questionId}`);
//     };

//     const handleRefresh = () => {
//         fetchQuestions();
//     };

//     if (loading) {
//         return (
//             <div className={styles.loading}>
//                 <div className={styles.spinner}></div>
//                 Loading questions...
//             </div>
//         );
//     }

//     return (
//         <div className={styles.container}>
//             {/* Header - Full width */}
//             <header className={styles.header}>
//                 <div className={styles.headerContent}>
//                     <div className={styles.headerLeft}>
//                         <div className={styles.logoContainer}>
//                             <span className={styles.logoText}>EVANGADI</span>
//                         </div>
//                     </div>
                    
//                     <div className={styles.headerRight}>
//                         <span className={styles.navItem}>How it works</span>
//                         <button 
//                             onClick={handleLogout}
//                             className={styles.logoutButton}
//                         >
//                             LOG OUT
//                         </button>
//                     </div>
//                 </div>
//             </header>

//             {/* Main Content - Full width with proper padding */}
//             <main className={styles.main}>
//                 {/* Top Section */}
//                 <div className={styles.topSection}>
//                     <button 
//                         onClick={handleAskQuestion}
//                         className={styles.askButton}
//                     >
//                         Ask Question
//                     </button>
                    
//                     <span className={styles.welcomeText}>
//                         Welcome: <span className={styles.username}>{user?.username || 'Guest'}</span>
//                     </span>
//                 </div>

//                 {/* Error Message */}
//                 {error && (
//                     <div className={styles.errorContainer}>
//                         <span className={styles.errorText}>{error}</span>
//                         <button 
//                             onClick={handleRefresh}
//                             className={styles.retryButton}
//                         >
//                             Retry
//                         </button>
//                     </div>
//                 )}

//                 {/* Questions List */}
//                 <div className={styles.questionsContainer}>
//                     {questions.length === 0 ? (
//                         <div className={styles.noQuestions}>
//                             <p className={styles.noQuestionsText}>No questions yet. Be the first to ask!</p>
//                             <button 
//                                 onClick={handleAskQuestion}
//                                 className={styles.askButton}
//                             >
//                                 Ask First Question
//                             </button>
//                         </div>
//                     ) : (
//                         questions.map((question, index) => (
//                             <div key={question.id} className={styles.questionItem}>
//                                 <div 
//                                     onClick={() => handleQuestionClick(question.id)}
//                                     className={styles.questionContent}
//                                     onMouseEnter={(e) => {
//                                         e.currentTarget.style.backgroundColor = '#f8f9fa';
//                                     }}
//                                     onMouseLeave={(e) => {
//                                         e.currentTarget.style.backgroundColor = 'white';
//                                     }}
//                                 >
//                                     <div className={styles.questionLayout}>
//                                         {/* Profile Section */}
//                                         <div className={styles.profileSection}>
//                                             <div className={styles.profileCircle}>
//                                                 {question.user_name?.charAt(0)?.toUpperCase() || '👤'}
//                                             </div>
//                                             <div className={styles.userName}>
//                                                 {question.user_name}
//                                             </div>
//                                         </div>
                                        
//                                         {/* Question Content */}
//                                         <div className={styles.questionText}>
//                                             <h3 className={styles.questionTitle}>{question.title}</h3>
//                                             {question.content && (
//                                                 <p className={styles.questionDescription}>
//                                                     {question.content.length > 150 
//                                                         ? `${question.content.substring(0, 150)}...` 
//                                                         : question.content
//                                                     }
//                                                 </p>
//                                             )}
//                                             <div className={styles.questionMeta}>
//                                                 <span className={styles.answerCount}>
//                                                     0 answers
//                                                 </span>
//                                                 <span className={styles.questionDate}>
//                                                     {new Date().toLocaleDateString()}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
                                
//                                 {/* Separator line */}
//                                 {index < questions.length - 1 && (
//                                     <hr className={styles.separator} />
//                                 )}
//                             </div>
//                         ))
//                     )}
//                 </div>

//                 {/* Refresh Button */}
//                 {questions.length > 0 && (
//                     <div className={styles.refreshSection}>
//                         <button 
//                             onClick={handleRefresh}
//                             className={styles.refreshButton}
//                         >
//                             Refresh Questions
//                         </button>
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// }

// export default Home;


// import React, { useContext, useEffect, useState } from "react";
// import Layout from "../../component/Layout/Layout";
// import classes from "./Home.module.css";
// import { Link, useNavigate } from "react-router-dom";
// import QuestionList from "../Questionlist/QuestionList";
// import { UserContext } from "../../component/Dataprovider/DataProvider";

// function Home() {
//   const [userData] = useContext(UserContext);
//   const navigate = useNavigate();
//   const isLoggedIn = !!userData.user;
//   useEffect(() => {
//     if (!isLoggedIn) navigate("/login");
//   }, [isLoggedIn, navigate]);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);

//   const handleSearchInputChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleSearch = () => {
//     // Filter the questions based on the search query
//     const filtered = userData.questions.filter((question) =>
//       question.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredQuestions(filtered);
//   };

//   return (
//     <Layout>
//       <div className={classes.home_container}>
//         {userData.user ? (
//           <>
//             <div className={classes.ask_wrapper}>
//               <Link to={"/question"}>
//                 <button>Ask Question</button>{" "}
//               </Link>
//               <div className={classes.question_search}>
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={searchQuery}
//                   onChange={handleSearchInputChange}
//                 />
//                 <button onClick={handleSearch}>Search</button>
//               </div>
//               <h3 className={classes.welcome_username}>
//                 Welcome :- {userData.user?.display_name}
//               </h3>
//             </div>
//             <div className={classes.question_header}>
//               <h2> Questions </h2>
//             </div>
//             <QuestionList questions={filteredQuestions} />
//           </>
//         ) : null}
//       </div>
//     </Layout>
//   );
// }

// export default Home;



// import React, { useContext, useEffect, useState } from "react";
// import Layout from "../../component/Layout/Layout";
// import classes from "./Home.module.css";
// import { Link, useNavigate } from "react-router-dom";
// import QuestionList from "../Questionlist/QuestionList";
// import { UserContext } from "../../component/Dataprovider/DataProvider";

// function Home() {
//   const [userData] = useContext(UserContext);
//   const navigate = useNavigate();
//   const isLoggedIn = !!userData.user;

//   useEffect(() => {
//     if (!isLoggedIn) navigate("/login");
//   }, [isLoggedIn, navigate]);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);

//   const handleSearchInputChange = (e) => setSearchQuery(e.target.value);

//   const handleSearch = () => {
//     const filtered = userData.questions.filter((question) =>
//       question.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredQuestions(filtered);
//   };

//   const questionsToShow =
//     filteredQuestions.length > 0 ? filteredQuestions : userData.questions || [];

//   return (
//     <Layout>
//       <div className={classes.container}>
//         {/* Header Section */}
//         <div className={classes.topSection}>
//           <div className={classes.leftGroup}>
//             <h1 className={classes.title}>Evangadi Forum</h1>
//             <p className={classes.subtitle}>
//               Connect, ask questions, and share your knowledge.
//             </p>
//           </div>

//           <div className={classes.rightGroup}>
//             <Link to="/question">
//               <button className={classes.askButton}>Ask Question</button>
//             </Link>
//           </div>
//         </div>

//         {/* Welcome + Search Section */}
//         <div className={classes.userActions}>
//           <span className={classes.welcomeText}>
//             Welcome,{" "}
//             <span className={classes.username}>
//               {userData.user?.display_name || "Guest"}
//             </span>
//           </span>

//           <div className={classes.searchBox}>
//             <input
//               type="text"
//               placeholder="Search for questions..."
//               value={searchQuery}
//               onChange={handleSearchInputChange}
//             />
//             <button onClick={handleSearch}>Search</button>
//           </div>
//         </div>

//         {/* Question List */}
//         <div className={classes.questionsSection}>
//           <h2 className={classes.sectionHeader}>Recent Questions</h2>
//           <QuestionList questions={questionsToShow} />
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default Home;


import React, { useContext, useEffect, useState, useCallback } from "react";
import Layout from "../../component/Layout/Layout";
import classes from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import QuestionList from "../Questionlist/QuestionList";
import { UserContext } from "../../component/Dataprovider/DataProvider";
import axios from "../../axiosConfig"; // Import axios

function Home() {
  const [userData, setUserData] = useContext(UserContext); // Get setUserData if available for context update
  const navigate = useNavigate();
  const isLoggedIn = !!userData.user;

  // State to hold fetched data and manage request status
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  // 1. Authentication Check and Redirect
  useEffect(() => {
    // If not logged in (no user object), redirect immediately
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // 2. Fetch Questions with Token Handling
  const fetchQuestions = useCallback(async () => {
    const token = localStorage.getItem("auth-token");

    // Safety check: ensure token exists before attempting API call
    if (!token) {
      setLoading(false);
      // Since isLoggedIn check handles redirect, just return here.
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await axios.get("api/question", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Assuming res.data contains { questions: [...] }
      if (res.data.questions && Array.isArray(res.data.questions)) {
        setAllQuestions(res.data.questions);
      } else {
        setAllQuestions([]);
        setError("Invalid response format from server.");
      }
    } catch (err) {
      console.error("Question Fetch Error:", err);

      // *** THE CRITICAL 401 ERROR HANDLING ***
      if (err.response && err.response.status === 401) {
        // Token expired or invalid. Clear user data and token, then redirect.
        console.log("Token expired or invalid. Logging out.");
        localStorage.removeItem("auth-token");
        // Update context to force a full logout state change (if setUserData exists)
        if (setUserData) {
          setUserData({ user: null });
        }
        navigate("/login");
        return; // Prevent further execution in this catch block
      }

      // Handle other errors (e.g., 500 server error, network failure)
      setError("Failed to load questions. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [navigate, setUserData]); // Added setUserData to dependency array

  useEffect(() => {
    // Only attempt to fetch questions if the user is logged in
    if (isLoggedIn) {
      fetchQuestions();
    }
  }, [isLoggedIn, fetchQuestions]);

  // 3. Search and Filtering Logic
  const handleSearchInputChange = (e) => setSearchQuery(e.target.value);

  // The list shown is either the filtered list or the full list
  const questionsToShow = allQuestions.filter((question) =>
    question.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading)
    return (
      <Layout>
        <div className={classes.container}>Loading questions...</div>
      </Layout>
    );
  // if an error occurred after loading
  if (error)
    return (
      <Layout>
        <div
          className={classes.container}
          style={{ color: "red", textAlign: "center" }}
        >
          {error}
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className={classes.container}>
        {/* Welcome + Ask Button + Search Section */}
        <div className={classes.userActions}>
          {/* ... (Welcome text, Ask Button container, and Search Box remain the same) */}
          <span className={classes.welcomeText}>
            Welcome:{" "}
            <span className={classes.username}>
              {userData.user?.username || userData.user?.display_name || "Guest"}
            </span>
          </span>

          <div className={classes.askButtonContainer}>
            <Link to="/question">
              <button className={classes.askButton}>Ask Question</button>
            </Link>
          </div>

          <div className={classes.searchBox}>
            <input
              type="text"
              placeholder="search question"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            {/* Keeping the handleSearch function out as per previous steps */}
          </div>
        </div>

        {/* Question List */}
        <div className={classes.questionsSection}>
          {questionsToShow.length === 0 && searchQuery ? (
            <p className={classes.emptyMessage}>
              No results found for "{searchQuery}".
            </p>
          ) : (
            <QuestionList questions={questionsToShow} />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Home;