import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import useLoadTodo from "../hooks/useLoadTodo";

describe("useLoadTodo hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test("should load initial todos when localStorage is empty", () => {
    const setTodos = vi.fn();
    renderHook(() => useLoadTodo(null, setTodos));

    expect(setTodos).toHaveBeenCalledWith([
      { id: 1, text: "Покрытие тестами", completed: false },
      { id: 2, text: "Прекрасный код", completed: true },
      { id: 3, text: "Тестовое задание", completed: false },
    ]);
  });

	test('should load todos from localStorage', () => {
    const mockTodos = [
      { id: 1, text: "Купить молоко", completed: false }
    ];
    localStorage.setItem("todosList", JSON.stringify(mockTodos));

    const setTodos = vi.fn();
    renderHook(() => useLoadTodo(null, setTodos));

    expect(setTodos).toHaveBeenCalledWith(mockTodos);
  });
});
