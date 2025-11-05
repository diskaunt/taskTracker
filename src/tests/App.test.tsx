import { describe, test, expect, afterEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import App from "../layouts/applayout/AppLayouts";

describe("App Component", () => {
  // Автоматическая очистка после каждого теста
  afterEach(() => {
    cleanup();
  });

  test("adds new todo", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What needs to be done?");
    const button = screen.getByTestId("addTodo-button");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(button);

    expect(await screen.findAllByText("New Task")).toHaveLength(2);
  });

  test("toggles todo completion", async () => {
    render(<App />);
    const checkboxes = await screen.findAllByRole("checkbox");
    const firstCheckbox = checkboxes[0] as HTMLInputElement;

    fireEvent.click(firstCheckbox);
    expect(firstCheckbox.checked).toBe(true);
  });

  test("number of items left is correct", async () => {
    render(<App />);
    let itemsLeft = await screen.findByText("2 items left");

    expect(itemsLeft).toBeInTheDocument();
  });

  test("clears completed todos", async () => {
    render(<App />);
    const checkboxes = await screen.findAllByRole("checkbox");
    const firstCheckbox = checkboxes[2] as HTMLInputElement;
    fireEvent.click(firstCheckbox);

    const clearButton = screen.getByText("Clear completed");
    fireEvent.click(clearButton);

    expect(await screen.findByText("3 items left")).toBeInTheDocument();
  });
});
