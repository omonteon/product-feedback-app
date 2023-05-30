import { ReactComponent as ChevronIcon } from "@assets/chevron-icon.svg";
import styles from "./voteButton.module.css";
import { useFetcher } from "react-router-dom";

interface VoteButtonProps {
  className?: string;
  count?: number;
  upVoted?: boolean;
}

function VoteButton({
  className = "",
  count = 0,
  upVoted = false,
}: VoteButtonProps) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="put">
      <label className={`${styles.voteButton} ${className}`}>
        <ChevronIcon className={styles.upVoteIcon} />
        <input
          name="upvotes"
          type="checkbox"
          checked={upVoted}
          value={count}
          onChange={() => {
            const upvotes = upVoted ? count - 1 : count + 1;
            fetcher.submit({ upvotes }, { method: "put" });
          }}
          aria-checked={upVoted}
        />
        <b>{count}</b>
      </label>
    </fetcher.Form>
  );
}

export default VoteButton;
