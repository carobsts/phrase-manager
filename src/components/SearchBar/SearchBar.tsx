import * as React from "react";

import { useState, useEffect, useMemo, useCallback } from "react";

import { Search, X } from "lucide-react";

import {
  ClearButton,
  IconLeft,
  Input,
  VisuallyHidden,
  Wrapper,
} from "./SearchBar.styles";

import { debounce } from "../../utils/debounce";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearch = useMemo(
    () => debounce((term) => onSearch(term as string), 300),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    onSearch("");
  }, [onSearch]);

  return (
    <Wrapper>
      <VisuallyHidden htmlFor="search-input">Search phrases</VisuallyHidden>
      <Input
        id="search-input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
        aria-label="Search phrases"
      />
      <IconLeft>
        <Search />
      </IconLeft>
      {searchTerm && (
        <ClearButton onClick={clearSearch} aria-label="Clear search">
          <X />
        </ClearButton>
      )}
    </Wrapper>
  );
};
