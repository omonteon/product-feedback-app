import { useEffect, useState } from "react";
import { useLoaderData, useNavigation, useSubmit } from "react-router-dom";
import { ReactComponent as CloseIcon } from "@assets/close-icon.svg";
import { ReactComponent as HamIcon } from "@assets/ham-icon.svg";
import Drawer from "@components/Drawer";
import Button from "@components/Button";
import Card from "@components/Card";
import Tag from "@components/Tag";
import RoadmapCard from "@components/RoadmapCard";
import styles from "./sidebar.module.css";

const { CheckableTag } = Tag;

interface SidebarProps {
  open: boolean;
  toggle: () => void;
}

function Sidebar({ open = false, toggle }: SidebarProps) {
  const { q } = useLoaderData() as { q: string };
  const navigation = useNavigation();
  const defaultTag = q ? q : "All";
  const [checkedTag, setCheckedTag] = useState<string>(defaultTag);
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
    <Drawer
      isOpen={open}
      toggleButton={
        <Button
          type="clean"
          ariaExpanded={open}
          ariaControls="drawer"
          onClick={toggle}
        >
          {open ? <CloseIcon /> : <HamIcon />}
        </Button>
      }
      toggle={toggle}
    >
      <Card
        className={`${styles.tagsCard} ${searching ? styles.searching : ""}`}
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
      <RoadmapCard />
    </Drawer>
  );
}

export default Sidebar;
