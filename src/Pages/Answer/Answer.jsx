import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../component/Dataprovider/DataProvider";
import axios from "../../axiosConfig";
import Layout from "../../component/Layout/Layout";
import classes from "./answer.module.css";

const Answer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData] = useContext(UserContext);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!userData.user) {
      navigate("/login");
      return;
    }
    fetchQuestionAndAnswers();
  }, [id, userData.user, navigate]);

  const fetchQuestionAndAnswers = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Fetch question details
      const questionResponse = await axios.get(`api/question/${id}`);
      console.log("Question response:", questionResponse.data);
      
      const questionData = questionResponse.data.question || questionResponse.data;
      setQuestion(questionData);
      
      // Fetch answers for this question
      await fetchAnswers();
    } catch (error) {
      console.error("Error fetching question:", error);
      setError("Failed to load question details");
    } finally {
      setLoading(false);
    }
  };

  const fetchAnswers = async () => {
    try {
      const answersResponse = await axios.get(`api/answer/${id}`);
      console.log("Answers response:", answersResponse.data);
      
      // Handle different response formats
      if (answersResponse.data.answers) {
        setAnswers(answersResponse.data.answers);
      } else if (Array.isArray(answersResponse.data)) {
        setAnswers(answersResponse.data);
      } else {
        setAnswers([]);
      }
    } catch (answerError) {
      console.log("Error fetching answers:", answerError);
      setAnswers([]);
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) {
      alert("Please enter your answer");
      return;
    }

    try {
      setSubmitting(true);

      // Use the exact field names your backend expects
      const response = await axios.post("api/answer", {
        question_id: id,
        answer: newAnswer
      });

      console.log("Answer post response:", response.data);
      
      setNewAnswer("");
      // Refresh answers to show the new one
      await fetchAnswers();
      alert("Answer posted successfully!");
    } catch (error) {
      console.error("Error posting answer:", error);
      alert(error.response?.data?.message || "Failed to post answer");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className={classes.loading}>
          <div className={classes.spinner}></div>
          Loading question details...
        </div>
      </Layout>
    );
  }

  if (error || !question) {
    return (
      <Layout>
        <div className={classes.error}>
          <p>Error loading question: {error}</p>
          <button onClick={() => navigate("/home")} className={classes.backButton}>
            Back to Home
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={classes.container}>
        {/* Header with back button */}
        <div className={classes.header}>
          <button onClick={() => navigate("/home")} className={classes.backButton}>
            ← Back to Questions
          </button>
          <h1>Question Details</h1>
        </div>

        {/* Question Section */}
        <div className={classes.questionSection}>
          <div className={classes.questionCard}>
            <div className={classes.questionHeader}>
              <h2 className={classes.questionTitle}>{question.title}</h2>
              <div className={classes.questionMeta}>
                <span className={classes.askedBy}>
                  Asked by: <strong><span className={classes.username}>
                                {userData.user?.username || userData.user?.display_name || "Guest"}
                              </span></strong>
                </span>
                <span className={classes.questionDate}>
                  {new Date(question.created_at || Date.now()).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className={classes.questionContent}>
              <p>{question.description || question.content}</p>
            </div>
          </div>
        </div>

        {/* Answers Count */}
        <div className={classes.answersHeader}>
          <h3>{answers.length} Answer{answers.length !== 1 ? 's' : ''}</h3>
        </div>

        {/* Existing Answers */}
        <div className={classes.answersSection}>
          {answers.length === 0 ? (
            <div className={classes.noAnswers}>
              <p>No answers yet. Be the first to answer this question!</p>
            </div>
          ) : (
            answers.map((answer, index) => (
              <div key={answer.answer_id || answer.id || index} className={classes.answerItem}>
                <div className={classes.answerHeader}>
                  <div className={classes.answerAuthor}>
                    <div className={classes.userAvatar}>
                      {answer.user_name?.charAt(0)?.toUpperCase() || userData.user?.username?.charAt(0)?.toUpperCase() || '👤'}
                    </div>
                    <span>{answer.user_name || userData.user?.username || 'You'}</span>
                  </div>
                  <span className={classes.answerDate}>
                    {new Date(answer.created_at || Date.now()).toLocaleDateString()}
                  </span>
                </div>
                <div className={classes.answerContent}>
                  <p>{answer.content || answer.answer}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Answer Form */}
        <div className={classes.answerFormSection}>
          <h3>Your Answer</h3>
          <form onSubmit={handleSubmitAnswer} className={classes.answerForm}>
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Write your answer here..."
              className={classes.answerTextarea}
              rows={6}
              disabled={submitting}
            />
            <button 
              type="submit" 
              className={classes.submitButton}
              disabled={submitting || !newAnswer.trim()}
            >
              {submitting ? "Posting Answer..." : "Post Your Answer"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Answer;