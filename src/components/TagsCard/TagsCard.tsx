import { useState } from "react";
import { useNavigation, useSubmit } from "react-router-dom";
import Card from "@components/Card";
import CheckableTag from "@components/Tag/CheckableTag";
import styles from "./tagsCard.module.css";

function TagsCard({ className = "", defaultTag = "All" }) {
  const navigation = useNavigation();
  const [checkedTag, setCheckedTag] = useState(defaultTag);
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  // TODO: Get this data from API, localstorage or somewhere else
  const tags = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];

  const handleCheckTag = (tag: string) => {
    setCheckedTag(tag);
    submit({ q: tag });
  };

  return (
    <Card
      className={`${styles.tagsCard} ${searching ? styles.searching : ""} ${
        className ?? ""
      }`}
    >
      {/* TODO: This might be better to do as a list for a11y reasons. */}
      {tags.map((tag) => (
        <CheckableTag
          checked={tag === checkedTag}
          key={tag}
          disabled={searching}
          onClick={() => handleCheckTag(tag)}
        >
          {tag}
        </CheckableTag>
      ))}
    </Card>
  );
}

export default TagsCard;
