import Card from "@components/Card";
import Tag from "@components/Tag";
import { Feedback } from "src/interfaces/Feedback";

interface FeedbackCardProps {
  feedback: Feedback;
}

// TODO: Style the content
// TODO: Add upvote component and comment component
function FeedbackCard({ feedback }: FeedbackCardProps) {
  const {
    title = "",
    description = "",
    tag = "Enhancement",
    upVoteCount = 0,
    commentCount = 0,
  } = feedback;
  return (
    <Card>
      <h4>{title}</h4>
      <p>{description}</p>
      <Tag>{tag}</Tag>
    </Card>
  );
}

export default FeedbackCard;
