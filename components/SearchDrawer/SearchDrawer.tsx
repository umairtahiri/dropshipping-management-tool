import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Box, Drawer, MenuItem, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { SearchDrawerPropTypes } from "@/lib/types";

import { RootState } from "../../lib/redux/store";
import { extractNodes } from "../../lib/util";
import { BorderLessInput, BorderLessSelect } from "./SearchDrawer.style";

export function SearchDrawer({
  showSideBar,
  toggleDrawer,
}: SearchDrawerPropTypes) {
  const router = useRouter();
  const { query, category } = router?.query;

  const menus = useSelector((state: RootState) =>
    extractNodes(state?.categories?.menusCategories || [])
  );

  const [selectedCategory, setSelectedCategory] = useState<string | string[]>(
    "all"
  );
  const [value, setValue] = useState<string | string[]>("");

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearch = async () => {
    const query = { query: value };

    if (value) {
      if (toggleDrawer) toggleDrawer();
      if (selectedCategory !== "all") {
        query["category"] = selectedCategory;
      }
      router.push({
        pathname: "/default-channel/en-US/search",
        query,
      });
    }
  };

  const handlePressEnter = (key) => {
    if (key === "Enter" && value) {
      handleSearch();
      if (toggleDrawer) toggleDrawer();
    }
  };

  const resetSearchField = () => {
    setValue("");
    setSelectedCategory("all");
  };

  useEffect(() => {
    if (query) {
      setValue(query);
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
    <Drawer
      open={showSideBar}
      onClose={toggleDrawer}
      anchor="right"
      sx={{
        width: "100%",
        height: "100%",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          padding: "26px 18px",
        },
      }}
    >
      <Stack direction="row" alignItems="center" className="mb-8">
        <CloseOutlinedIcon className="text-2xl" onClick={toggleDrawer} />
        <Box className="w-full text-center">
          <Typography variant="body2" component="div">
            Search
          </Typography>
        </Box>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        className="rounded-lg	w-full px-4 mb-7 bg-[#f2f2f2]"
        spacing={1}
      >
        <SearchOutlinedIcon className="text-[#7E8389]" />
        <BorderLessSelect
          aria-label="borderless-select-for-search"
          value={selectedCategory}
          onChange={handleChange}
        >
          <MenuItem value="all">All</MenuItem>
          {(menus || []).map((menu) => (
            <MenuItem value={menu?.id} key={menu?.id} className="capitalize">
              {(menu?.name || "").toLowerCase()}
            </MenuItem>
          ))}
        </BorderLessSelect>
        <BorderLessInput
          id="outlined-basic"
          placeholder="Search for products"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => handlePressEnter(e?.key)}
        />
      </Stack>
      <Typography className="mb-4 text-xl font-normal" component="div">
        Recent Searches
      </Typography>
      {/* NOTE: Will be used later */}
      {/* <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className="mb-2.5"
      >
        <Typography
          className="text-sm text-[#979797] font-normal"
          component="div"
        >
          Red Dress
        </Typography>
        <CloseOutlinedIcon className="text-base" />
      </Stack> */}
    </Drawer>
  );
}
