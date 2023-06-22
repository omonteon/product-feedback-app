import { ReactNode, useEffect } from "react";
import FocusTrap from "focus-trap-react";
import styles from "./drawer.module.css";

interface DrawerProps {
  isOpen: boolean;
  toggleButton?: ReactNode;
  toggle: () => void;
  children?: ReactNode;
}

function Drawer({
  isOpen = false,
  toggleButton,
  toggle,
  children,
}: DrawerProps) {
  // Handle 'Escape' key press event to close the drawer
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.code === "Escape" && isOpen) {
        toggle();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, toggle]);

  return (
    <FocusTrap
      paused={!isOpen}
      focusTrapOptions={{ fallbackFocus: "#fallbackTabbable" }}
    >
      <div id="fallbackTabbable" tabIndex={-1}>
        {toggleButton}
        <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`}></div>
        <aside
          id="drawer"
          className={`${styles.drawer} ${isOpen ? styles.open : ""}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
        >
          <h2 id="drawer-title" tabIndex={-1} className="sr-only">
            Menu
          </h2>

          {children}
        </aside>
      </div>
    </FocusTrap>
  );
}

export default Drawer;
