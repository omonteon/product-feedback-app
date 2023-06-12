import { useState } from "react";
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
  const [checkedTag, setCheckedTag] = useState<string>("");

  // TODO: Get this data from API, localstorage or somewhere else
  const tags = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];

  const handleCheckTag = (tag: string) => {
    setCheckedTag(tag);
    // TODO: Update list of cards depending on tag
    // TODO: Probably move this to the parent component
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
      <Card className={styles.tagsCard}>
        {/* TODO: This might be better to do as a list for a11y reasons. */}
        {tags.map((tag) => (
          <CheckableTag
            checked={tag === checkedTag}
            key={tag}
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
