import { ReactComponent as ChevronIcon } from "@assets/chevron-icon.svg";
import styles from "./voteButton.module.css";

interface VoteButtonProps {
  count?: number;
  upVoted?: boolean;
  onChange?: () => void;
}

function VoteButton({ count = 0, upVoted = false, onChange }: VoteButtonProps) {
  return (
    <label className={styles.voteButton}>
      <ChevronIcon className={styles.upVoteIcon} />
      <input
        type="checkbox"
        checked={upVoted}
        onChange={onChange}
        aria-checked={upVoted}
      />
      <b>{count}</b>
    </label>
  );
}

export default VoteButton;
