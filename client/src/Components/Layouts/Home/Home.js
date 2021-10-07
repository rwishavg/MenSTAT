import React, { Fragment, useEffect } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import classes from "./home.module.css";
import mid from "../../../assets/mid.svg";
import Logo from "../Logo/Logo";
import { useSpring, animated } from "react-spring";

const Home = () => {
  const props = useSpring({
    config: { mass: 1, tension: 120, friction: 14 },
    delay: 200,
    from: { marginLeft: -100, opacity: 0 },
    to: { marginLeft: 0, opacity: 1 },
  });
  return (
    <Fragment>
      <div className={classes["main-land-1"]}>
        <div className={classes["head"]}>
          <div className={classes["childhead"]}>
            <div className={classes["logo"]}>
              <animated.div style={props}>
                <h2>
                  MenSTAT <Logo />
                </h2>
              </animated.div>
            </div>
            <div className={classes["text"]}>
              <h3>The wellness app</h3>
              <h4>Join the amazing community</h4>
              <div className={classes["join"]}>
                <Link className={classes["btn-1"]} to="/login">
                  Login
                </Link>
                <Link className={classes["btn-2"]} to="/signup">
                  SignUp
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={classes["image-1"]}>
          <div className={classes["cube"]}>
            <div className={classes["front"]}>1</div>
            <div className={classes["back"]}>2</div>
            <div className={classes["right"]}>3</div>
            <div className={classes["left"]}>4</div>
            <div className={classes["top"]}>5</div>
            <div className={classes["bottom"]}>6</div>
          </div>
        </div>
      </div>

      
      <div className={classes["main-land-3"]}>
        <div
          className={classes["mid-img"]}
          style={{ backgroundImage: `url(${mid})` }}
        ></div>
      </div>
      <div className={classes["row"]}>
      <div className={classes["card1"]}>
          <div className={classes["c-head"]}>
            <h2>Best Community</h2>
          </div>
          <div className={classes["c-body"]}>
            <p>
              You will enter a world where there is community for each and every
              tech stack.Get help from the best of the best coders all around
              the country.Have enough knowledge to share it back to the
              community? Feel free to do so!.So hurry up and login!
            </p>
          </div>
        </div>
        <div className={classes["card2"]}>
          <div className={classes["c-head"]}>
            {" "}
            <h2>Detailed Graphs</h2>
          </div>
          <div className={classes["c-body"]}>
            <p>
              Want to know what are the best resoures to learn something new?
              Join the community of top programmers who share their learning
              experience all day long.Do not forget to post something which may
              be a valuable resouce to some other person.
            </p>
          </div>
        </div>
        <div className={classes["card3"]}>
          <div className={classes["c-head"]}>
            {" "}
            <h2>Robust Database</h2>
          </div>
          <div className={classes["c-body"]}>
            <p>
              Get all updated informations about what is going on and around.
              Get the latest news and updatea about programming.Whether it is
              information or doubt.Every thing is present inside this amazing
              world.So hurry up and login!
            </p>
          </div>
        </div>
      </div>

    </Fragment>
  );
};

export default withRouter(Home);
