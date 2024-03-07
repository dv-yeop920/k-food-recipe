import styles from "./Writing.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const WritingHeader = () => {
  const navigate = useNavigate();
  return (
    <header className={`${styles.header}`} onClick={() => navigate(-1)}>
      <FontAwesomeIcon icon={faArrowLeft} size="2x" />
      <span className={styles.back}>뒤로가기</span>
    </header>
  );
};

export default WritingHeader;
