import * as React from "react";

import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";

import { ThemeProvider } from "styled-components";

import { theme } from "../../styles/theme";

import { SearchBar } from "./SearchBar";

jest.useFakeTimers();

describe("SearchBar Component", () => {
  let onSearchMock: jest.Mock;

  const renderWithTheme = (ui: React.ReactElement) =>
    render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

  beforeEach(() => {
    onSearchMock = jest.fn();
    renderWithTheme(<SearchBar onSearch={onSearchMock} />);
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it("renders the input with correct placeholder and icon", () => {
    const input = screen.getByRole("textbox", { name: /search phrases/i });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Search...");
  });

  it("calls onSearch after debounce when typing", () => {
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "hello" } });

    jest.advanceTimersByTime(200);
    expect(onSearchMock).not.toHaveBeenCalled();

    jest.advanceTimersByTime(200);
    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith("hello");
  });

  it("shows clear button only when there is text", () => {
    const input = screen.getByRole("textbox");
    expect(screen.queryByLabelText("Clear search")).toBeNull();

    fireEvent.change(input, { target: { value: "a" } });
    jest.runAllTimers();

    const clearBtn = screen.getByRole("button", { name: /clear search/i });
    expect(clearBtn).toBeInTheDocument();
  });

  it("clears input and calls onSearch('') when clear button is clicked", () => {
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "test" } });
    jest.runAllTimers();

    const clearBtn = screen.getByRole("button", { name: /clear search/i });
    fireEvent.click(clearBtn);

    expect(input).toHaveValue("");
    expect(onSearchMock).toHaveBeenCalledWith("");
  });

  it("updates onSearch if input changes again after clearing", () => {
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "foo" } });
    jest.runAllTimers();
    expect(onSearchMock).toHaveBeenCalledWith("foo");

    const clearBtn = screen.getByRole("button", { name: /clear search/i });
    fireEvent.click(clearBtn);
    expect(onSearchMock).toHaveBeenCalledWith("");

    fireEvent.change(input, { target: { value: "bar" } });
    jest.runAllTimers();
    expect(onSearchMock).toHaveBeenCalledWith("bar");
  });
});
