import SearchIcon from "@mui/icons-material/Search";
import { IconButton, MenuItem, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/lib/redux/store";
import { extractNodes } from "@/lib/util";

import { BorderLessSelect } from "../SearchDrawer/SearchDrawer.style";
import { SearchIconBtn, SearchWrapper } from "./Globalsearch.style";

export function GlobalSearch() {
  const router = useRouter();
  const { query, category } = router?.query;

  const menus = useSelector((state: RootState) =>
    extractNodes(state?.categories?.menusCategories || [])
  );

  const [selectedCategory, setSelectedCategory] = useState<string | string[]>(
    "all"
  );
  const [searchValue, setSeachValue] = useState<string | string[]>("");

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearch = async () => {
    const query = { query: searchValue };
    if (selectedCategory !== "all") {
      query["category"] = selectedCategory;
    }
    if (searchValue) {
      router.push({
        pathname: "/default-channel/en-US/search",
        query,
      });
    }
  };

  const handlePressEnter = (key) => {
    if (key === "Enter" && searchValue) {
      handleSearch();
    }
  };

  const resetSearchField = () => {
    setSeachValue("");
    setSelectedCategory("all");
  };

  useEffect(() => {
    if (query) {
      setSeachValue(query);
    }
    if (category) {
      setSelectedCategory(category);
    }
  }, [query, category]);

  useEffect(() => {
    const isNotSearchPage = !router?.pathname.includes("/search");
    if (isNotSearchPage) {
      resetSearchField();
    }
  }, [router?.pathname]);

  return (
    <SearchWrapper>
      <TextField
        InputProps={{
          startAdornment: (
            <BorderLessSelect
              aria-label="borderless-select-for-search"
              size="small"
              value={selectedCategory}
              onChange={handleChange}
              className="p-0"
            >
              <MenuItem value="all">All</MenuItem>
              {(menus || []).map((menu) => (
                <MenuItem
                  value={menu?.slug}
                  key={menu?.id}
                  className="capitalize"
                >
                  {(menu?.name || "").toLowerCase()}
                </MenuItem>
              ))}
            </BorderLessSelect>
          ),
          endAdornment: (
            <SearchIconBtn onClick={handleSearch}>
              <IconButton>
                <SearchIcon />
              </IconButton>
            </SearchIconBtn>
          ),
        }}
        className="w-full min-w-full px-0"
        value={searchValue}
        onChange={(event) => setSeachValue(event.target.value)}
        onKeyDown={(event) => handlePressEnter(event?.key)}
      />
    </SearchWrapper>
  );
}
