import styles from "../css-modules/ConfirmMessage.module.css";

function ConfirmMessage(props) {
  return (
    <div className={styles.confirmMessage}>
      <span>Would you like to place a new marker point on your map?</span>
      <div
        className={styles.yesBtn}
        onClick={() => {
          props.confirmation(true);
        }}
      >
        YES
      </div>
      <div
        className={styles.noBtn}
        onClick={() => {
          props.confirmation(false);
        }}
      >
        NO
      </div>
    </div>
  );
}

export default ConfirmMessage;
