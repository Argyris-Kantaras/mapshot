import { useContext, useEffect, useRef } from "react";
import InfoContext from "../../hooks/use-infoContext";
import styles from "./Profile.module.css";

const currentDate = new Date();

function Profile() {
  const info = useContext(InfoContext);
  const profileRef = useRef();
  const yearOfBirth = info.user ? info.user.birthday.slice(0, 4) : "";

  useEffect(() => {
    if (info.themeValues.theme === "dark" && profileRef.current)
      profileRef.current.style.color = "white";
    if (info.themeValues.theme === "light" && profileRef.current)
      profileRef.current.style.color = "black";
  }, [info]);

  if (info.user === undefined) {
    return <div className={styles.notLoggedMessage}>Not Logged in</div>;
  }
  if (info.user === null) {
    return <div className={styles.notLoggedMessage}>Not Logged in</div>;
  }
  return (
    <div ref={profileRef} className={styles.profile}>
      <h3>Welcome, {info.user.username}</h3>
      <div className={styles.profileDetails}>
        <div>
          <label>Lives in</label>
          <div>{info.user.location}</div>
        </div>
        <div>
          <label>Age</label>
          <div>{currentDate.getFullYear() - Number(yearOfBirth)}</div>
        </div>
        <div>
          <label>email</label>
          <div>{info.user.email}</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
