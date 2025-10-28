import { useRef } from "react";
import classes from "./register.module.css";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../component/Layout/Layout";

function Register() {
  const navigate = useNavigate();
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = usernameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !passValue
    ) {
      alert("Please provide all required information");
      return;
    }

    try {
      await axios.post("api/user/register", {
        username: usernameValue,
        first_name: firstValue,
        last_name: lastValue,
        email: emailValue,
        password: passValue,
      });
      alert("register successfull. please login");
      navigate("/login");
    } catch (error) {
      alert("something went wrong!");
      // console.log(error.response);
    }
  }

  return (
    <Layout>
      <section className={classes.login_conteiner}>
        <div className={classes.login_wrapper}>
          <div className={classes.login_form}>
            <form onSubmit={handleSubmit} className={classes.login_form_input}>
              <h1 className={classes.login_title}>Join the network</h1>
              <small>
                Already have an account?<Link to="/login"> Sign in</Link>
              </small>
              <div className={classes.inputs}>
                <div>
                  <input
                    className={classes.user}
                    ref={usernameDom}
                    type="text"
                    placeholder="userName"
                  />
                </div>
                <br />
                <div className={classes.first_last}>
                  <div>
                    <input
                      className={classes.first}
                      ref={firstnameDom}
                      type="text"
                      placeholder="firs tName"
                    />
                  </div>

                  <div>
                    <input
                      className={classes.last}
                      ref={lastnameDom}
                      type="text"
                      placeholder="last Name"
                    />
                  </div>
                </div>
                <br />
                <div>
                  <input
                    className={classes.email}
                    ref={emailDom}
                    type="email"
                    placeholder="email"
                  />
                </div>
                <br />
                <div>
                  <input
                    className={classes.password}
                    ref={passwordDom}
                    type="password"
                    placeholder="passWord"
                  />
                  
                </div>
                <br />
                <div className={classes.agree2}>
                  <small>
                    I agree to the <Link> privacy policy</Link>
                    <span>and</span> <Link>terms of service.</Link>
                  </small>
                </div>
               

                <button type="submit">Agree and Join</button>
                <p className={classes.agree}>
                  <Link to="/login">Already have an account?</Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className={classes.Evangadi_description}>
          <small className={classes.title_link}>
            <Link>About</Link>
          </small>
          <h2 className={classes.title}>Evangadi Networks</h2>
          <p className={classes}>
            No matter what stage of life you are in, whether you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
          </p>
          <p className="font-p mg-bt-30">
            Wheather you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here
          </p>
          <Link to="/how-it-works">
            <button className={classes.aboutButton}>HOW IT WORKS</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export default Register;
