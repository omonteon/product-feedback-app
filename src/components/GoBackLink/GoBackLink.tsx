import { ReactComponent as ChevronLeftIcon } from "@assets/chevron-left-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import styles from "./goBackLink.module.css";

function GoBackLink() {
  const navigate = useNavigate();
  return (
    <Link to=".." onClick={() => navigate(-1)} className={styles.link}>
      <ChevronLeftIcon /> <span>Go Back</span>
    </Link>
  );
}

export default GoBackLink;
