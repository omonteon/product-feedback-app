import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Button from "./Button";

test("Button: displays a default button", () => {
  render(
    <MemoryRouter>
      <Button>Click me</Button>
    </MemoryRouter>
  );

  const button = screen.getByRole("button", { name: /click me/i });
  expect(button).toBeDefined();
});
