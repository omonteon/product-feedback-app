import { ReactComponent as ChevronIcon } from "@assets/chevron-icon.svg";
import styles from "./voteButton.module.css";

interface VoteButtonProps {
  className?: string;
  count?: number;
  upVoted?: boolean;
  onChange?: () => void;
}

function VoteButton({
  className = "",
  count = 0,
  upVoted = false,
  onChange = () => {},
}: VoteButtonProps) {
  return (
    <label className={`${styles.voteButton} ${className}`}>
      <ChevronIcon className={styles.upVoteIcon} />
      <input
        type="checkbox"
        checked={upVoted}
        onClick={(event) => event.stopPropagation()} // This is to avoid a card with a link being triggered
        onChange={onChange}
        aria-checked={upVoted}
      />
      <b>{count}</b>
    </label>
  );
}

export default VoteButton;
