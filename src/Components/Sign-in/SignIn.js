import { useContext, useEffect, useRef, useState } from "react";
import InfoContext from "../../hooks/use-infoContext";
import styles from "./SignIn.module.css";
import SignUp from "./SignUp";

let user = {};
function SignIn(props) {
  const logInRef = useRef();
  const signUpRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const info = useContext(InfoContext);

  const logInHandler = function () {
    user = JSON.parse(
      localStorage.getItem(
        `${userNameRef.current.value}-${passwordRef.current.value}`
      )
    );
    if (user !== null) {
      info.setUser(user);
      props.setMenuState({ showSignIn: false, showProfile: true });
    } else {
      info.setUser(null);
    }
  };

  return (
    <div>
      <form ref={logInRef} className={styles.logIn}>
        <h3>Log in</h3>

        <div>
          <label>Username</label>
          <input ref={userNameRef} type="text" />
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordRef} type="password" />
        </div>
        {info.user === null ? (
          <span className={styles.warningMessage}>
            *Not a valid account, make sure you signed up!
          </span>
        ) : (
          ""
        )}
        <div onClick={logInHandler} className={styles.submitBtn}>
          Log-in
        </div>
        <span>Don't have account yet? Simply</span>
        <span
          onClick={() => {
            signUpRef.current.style.display = "flex";
            logInRef.current.style.display = "none";
          }}
          className={styles.signUpPageBtn}
        >
          Sign up
        </span>
      </form>
      <SignUp signUpRef={signUpRef} setMenuState={props.setMenuState} />
    </div>
  );
}

export default SignIn;
