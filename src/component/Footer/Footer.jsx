import React from "react";
import classes from "./footer.module.css";
import logo from "../images/logo.png";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className={classes.footer}>
        <div className={classes.footer_out_container}>
          <div className={classes.footer_inner_container}>
            <div className={classes.footer_data}>
              <div>
                <div className={classes.footer_icon}>
                  <img src={logo} />
                </div>
                <div className={classes.footer_icon2}>
                  <p>
                    <FacebookOutlinedIcon size={35} />
                  </p>
                  <p>
                    <InstagramIcon size={35} />
                  </p>

                  <YouTubeIcon size={35} />
                </div>
              </div>
              <div>
                <h3>Useful Link</h3>
                <ul>
                  <li>
                    <Link to="/how-it-works">How it works</Link>
                  </li>
                  <li>
                    <Link to="/terms-and-conditions">Terms of Service</Link>
                  </li>
                  <li>
                    <Link to="/PrivacyPolicy">Privacy policy</Link>
                  </li>
                  
                </ul>
              </div>
              <div>
                <h3>Contact Info</h3>
                <ul>
                  <li>Contact Info</li>
                  <li>support@evangadi.com</li>
                  <li>+1-202-386-2702</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.copy_write}></div>
      </div>
    </>
  );
}

export default Footer;
