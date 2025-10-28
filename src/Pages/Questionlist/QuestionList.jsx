import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import classes from "./questionlist.module.css";

const ITEMS_PER_PAGE = 5;

const QuestionList = ({ token, questions: questionsProp }) => {
  const [questions, setQuestions] = useState(
    Array.isArray(questionsProp) ? questionsProp : []
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(questionsProp) && questionsProp.length >= 0) {
      setQuestions(questionsProp);
      // // setLoading(false);
      return;
    }

    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/question", {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        if (res.data.questions && Array.isArray(res.data.questions)) {
          setQuestions(res.data.questions);
        } else {
          setError("No questions found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load questions.");
      }
      
      // finally {
      // //   setLoading(false);
      // // }

      // finally {
      // //   setLoading(false);
      // // }
    };
    fetchQuestions();
  }, [token, questionsProp]);

  const handleQuestionClick = (id) => {
    navigate(`/question/${id}`);
  };

  const totalPages = Math.ceil(questions.length / ITEMS_PER_PAGE);
  const paginatedQuestions = questions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

 

  return (
    <div className={classes.container}>
      <h1 className={classes.questionListTitle}>All Questions</h1>

      <table className={classes.questionTable}>
        <thead>
          <tr>
            <th>Profile</th>
            <th>Username</th>
            <th>Question Title</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {paginatedQuestions.map((q) => (
            <tr
              key={q.question_id}
              className={classes.questionRow}
              onClick={() => handleQuestionClick(q.question_id)}
            >
              <td className={classes.profileIcon}>
                {q.user_name?.charAt(0)?.toUpperCase()}
              </td>
              <td>{q.user_name}</td>
              <td>{q.title}</td>
              {/* <td className={classes.arrowIcon}>&gt;</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={classes.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionList;
