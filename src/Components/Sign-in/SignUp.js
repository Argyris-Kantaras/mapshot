import { useRef, useState } from "react";
import styles from "./SignUp.module.css";

function SignUp(props) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const locationRef = useRef();
  const birthdayRef = useRef();
  const emailRef = useRef();
  const checkPasswordRef = useRef();
  const [accept, setAccept] = useState(null);

  const applyData = function () {
    if (checkPasswordRef.current.value !== passwordRef.current.value) {
      setAccept(false);
      return;
    }
    if (
      usernameRef.current.value !== "" &&
      passwordRef.current.value !== "" &&
      locationRef.current.value !== "" &&
      birthdayRef.current.value !== "" &&
      emailRef.current.value !== ""
    ) {
      const dataObj = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        location: locationRef.current.value,
        birthday: birthdayRef.current.value,
        email: emailRef.current.value,
      };
      localStorage.setItem(
        `${usernameRef.current.value}-${passwordRef.current.value}`,
        JSON.stringify(dataObj)
      );
      setAccept(true);
    } else {
      setAccept(false);
    }
  };

  return (
    <form ref={props.signUpRef} className={styles.signIn}>
      <div className={styles.signUpTopPart}>
        <h3 className={styles.heading}>Sign up</h3>
      </div>
      <div>
        <label>UserName</label>
        <input ref={usernameRef} type="text" />
        {accept === false && usernameRef.current.value === "" ? (
          <span className={styles.warningMessage}>*Field is missing</span>
        ) : (
          ""
        )}
      </div>
      <div>
        <label>Password</label>
        <input ref={passwordRef} type="password" />
        {accept === false && passwordRef.current.value === "" ? (
          <span className={styles.warningMessage}>*Field is missing</span>
        ) : (
          ""
        )}
      </div>
      <div>
        <label>Re-enter password</label>
        <input ref={checkPasswordRef} type="password" />
        {(accept === false && checkPasswordRef.current.value === "") ||
        (accept == false &&
          checkPasswordRef.current.value !== passwordRef.current.value) ? (
          <span className={styles.warningMessage}>*Passwords don't match</span>
        ) : (
          ""
        )}
      </div>
      <div>
        <label>Email</label>
        <input ref={emailRef} type="email" />
        {accept === false && emailRef.current.value === "" ? (
          <span className={styles.warningMessage}>*Field is missing</span>
        ) : (
          ""
        )}
      </div>
      <div>
        <label>Location</label>
        <input ref={locationRef} type="text" />
        {accept === false && locationRef.current.value === "" ? (
          <span className={styles.warningMessage}>*Field is missing</span>
        ) : (
          ""
        )}
      </div>
      <div>
        <label>Date of birth</label>
        <input ref={birthdayRef} type="date" />
        {accept === false && birthdayRef.current.value === "" ? (
          <span className={styles.warningMessage}>*Field is missing</span>
        ) : (
          ""
        )}
      </div>
      <div onClick={applyData} className={styles.submitBtn}>
        Sign-up
      </div>
    </form>
  );
}

export default SignUp;
