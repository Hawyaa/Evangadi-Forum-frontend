import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./questionlist.module.css";

const QuestionList = ({ questions }) => {
  const navigate = useNavigate();

  const handleQuestionClick = (questionId) => {
    navigate(`/question/${questionId}`);
  };

  if (!questions || questions.length === 0) {
    return (
      <div className={classes.emptyState}>
        <p>No questions available at the moment.</p>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      {questions.map((question) => (
        <div
          key={question.question_id || question.id}
          className={classes.questionCard}
          onClick={() => handleQuestionClick(question.question_id || question.id)}
        >
          <div className={classes.profileGroup}>
            <div className={classes.profileIcon}>
              {question.user_name?.charAt(0)?.toUpperCase() || '👤'}
            </div>
            <p className={classes.usernameDisplay}>
              {question.user_name || "Anonymous"}
            </p>
          </div>

          <div className={classes.questionContent}>
            <h3 className={classes.questionTitle}>{question.title}</h3>
            {question.content && (
              <p className={classes.questionDescription}>
                {question.content.length > 150 
                  ? `${question.content.substring(0, 150)}...` 
                  : question.content
                }
              </p>
            )}
            <div className={classes.questionMeta}>
              <span className={classes.answerCount}>
                {question.answer_count || 0} answers
              </span>
              <span className={classes.questionDate}>
                {new Date(question.created_at || Date.now()).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className={classes.arrowIcon}>&gt;</div>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;