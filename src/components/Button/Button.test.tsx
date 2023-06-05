import { test, expect } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Button from "./Button";

test("Should display a default button", () => {
  const app = render(
    <MemoryRouter>
      <Button>Click me</Button>
    </MemoryRouter>
  );
  app.unmount();
});

test("Should execute handler on click", () => {
  const app = render(
    <MemoryRouter initialEntries={["/home"]}>
      <Routes>
        <Route path="home" element={<h1>Home</h1>} />
        <Route path="about" element={<h1>About</h1>} />
      </Routes>

      <Button to="../about">Click me</Button>
    </MemoryRouter>
  );
  const button = app.getByRole("link", { name: /click me/i });
  expect(app.getByRole("heading", { name: /home/i })).toBeDefined();
  fireEvent.click(button);
  expect(app.getByRole("heading", { name: /about/i })).toBeDefined();
  app.unmount();
});
