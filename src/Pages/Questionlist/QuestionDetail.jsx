import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import classes from "../../Pages/Answer/answer.module.css";

const QuestionDetail = () => {
  const { id } = useParams(); // Extract the question ID from the URL
  const [question, setQuestion] = useState(null); // Question details
  const [answers, setAnswers] = useState([]); // list of answers
  const [newAnswer, setNewAnswer] = useState(""); // new answer input
  const [error, setError] = useState(null); // error message
  const [loading, setLoading] = useState(true); // loading state

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  // fetch question details
  const fetchQuestion = async () => {
    try {
      const token = localStorage.getItem("auth-token"); // Access token from storage
      const res = await axios.get(`api/question/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      setQuestion(res.data.question);
      setEditedTitle(res.data.question.title);
      setEditedDescription(res.data.question.content);
    } catch (err) {
      console.error("Error fetching question:", err);
      setError("Failed to load question"); // Display an error message on failure
    }
  };

  // Fetch answer data for the given question
  const fetchAnswers = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const res = await axios.get(`api/answer/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      setAnswers(res.data.answers || []);
    } catch (err) {
      console.error("Error fetching answers:", err);
      setAnswers([]); // clear answers on error
    } finally {
      setLoading(false); // stop loading
    }
  };

  // Perform data fetching when component loads or ID changes
  useEffect(() => {
    fetchQuestion();
    fetchAnswers();
  }, [id]);

  // Provide a new response
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return; // Block empty input on submit

    try {
      const token = localStorage.getItem("auth-token");
      await axios.post(
        "api/answer",
        { questionid: id, answer: newAnswer }, // Send the question ID along with the answer in the request
        { headers: { Authorization: "Bearer " + token } }
      );
      setNewAnswer(""); // clear input
      fetchAnswers(); // refresh answers
    } catch (err) {
      console.error("Error submitting answer:", err);
      setError("Failed to submit answer"); // show error
    }
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("auth-token");
      await axios.put(
        `api/question/${id}`,
        {
          title: editedTitle,
          description: editedDescription,
        },
        { headers: { Authorization: "Bearer " + token } }
      );
      setIsEditing(false);
      fetchQuestion(); // Refresh question details
    } catch (err) {
      console.error("Error updating question:", err);
      setError("Failed to update question");
    }
  };

  if (loading) return <div>Loading...</div>; // show loading spinner/text
  if (error) return <div className="alert alert-danger">{error}</div>; // show error

  return (
    <div className="container py-4">
      {question && (
        <>
          {/* Display question */}
          {!isEditing ? (
            <>
              <h2 className="mb-3">{question.title}</h2>
              <p>{question.content}</p>
              <p className="text-muted">Asked by : {question.user_id}</p>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => setIsEditing(true)}
              >
                Edit Question
              </button>
              <hr />
            </>
          ) : (
            <form onSubmit={handleEditSubmit}>
              <h4>Edit Question</h4>
              <input
                type="text"
                className="form-control mb-2"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                placeholder="Title"
              />
              <textarea
                className="form-control mb-2"
                rows="4"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                placeholder="Description"
              ></textarea>
              <button className="btn btn-success me-2" type="submit">
                Save Changes
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <hr />
            </form>
          )}
        </>
      )}

      {/* Answers Section */}
      <div className="mt-4">
        <h4>Answers</h4>
        {answers.length === 0 ? (
          <p className={classes.noAnswers}>
            No answers yet. Be the first to answer!
          </p>
        ) : (
          answers.map((answer, index) => (
            <div key={index} className={classes.answerItem}>
              <div className={classes.answerHeader}>
                <span className={classes.answerAuthor}>
                  {answer.user_name || "Anonymous"}
                </span>
                <span className={classes.answerDate}>
                  {new Date().toLocaleDateString()}
                </span>
              </div>
              <p className={classes.answerText}>{answer.content}</p>
            </div>
          ))
        )}
      </div>

      {/* Add New Answer Form */}
      <div className="mt-4">
        <h5>Your Answer</h5>
        <form onSubmit={handleSubmit}>
          <textarea
            className="form-control mb-3"
            rows="4"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)} // track input
            placeholder="Write your answer..."
          ></textarea>
          <button className="btn btn-warning" type="submit">
            Post Answer
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuestionDetail;
