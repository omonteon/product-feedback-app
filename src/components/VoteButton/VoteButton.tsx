import { useFetcher } from "react-router-dom";
import { ReactComponent as ChevronIcon } from "@assets/chevron-icon.svg";
import styles from "./voteButton.module.css";

interface VoteButtonProps {
  className?: string;
  feedbackId: string;
  count?: number;
  upVoted?: boolean;
}

function VoteButton({
  className = "",
  feedbackId,
  count = 0,
  upVoted = false,
}: VoteButtonProps) {
  const fetcher = useFetcher();
  let checked = upVoted;
  let voteCount = count;

  if (fetcher.formData) {
    const formUpvotes = Number(fetcher.formData.get("upvotes"));
    checked = formUpvotes > count;
    voteCount = formUpvotes;
  }

  return (
    <div onClick={(event) => event.stopPropagation()} role="presentation">
      <label className={`${styles.voteButton} ${className}`}>
        <ChevronIcon className={styles.upVoteIcon} />
        <input
          name="upvotes"
          type="checkbox"
          checked={checked}
          value={voteCount}
          onChange={() => {
            const upvotes = upVoted ? count - 1 : count + 1;
            // For some reason RR6 requires all form data to be strings
            fetcher.submit(
              {
                upVoted: (upvotes > count).toString(),
                upvotes: upvotes.toString(),
                feedbackId: feedbackId.toString(),
                intent: "upVote",
              },
              { method: "put" }
            );
          }}
          aria-checked={checked}
        />
        <b>{voteCount}</b>
      </label>
    </div>
  );
}

export default VoteButton;
