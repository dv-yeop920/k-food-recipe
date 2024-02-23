import styles from "./ScrollUpButton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";

const ScrollUpButton = () => {
  const handleClickScroll = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <>
      <button className={styles.scroll} onClick={handleClickScroll}>
        <FontAwesomeIcon icon={faUpLong} size="2x" />
      </button>
    </>
  );
};

export default ScrollUpButton;
