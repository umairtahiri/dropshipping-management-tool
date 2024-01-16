import Box from "@mui/material/Box";
import React from "react";

import { CategoryChipsPropTypes, CategoryTypes } from "@/lib/types";
import { getCategoriesForHomePage } from "@/lib/util";

import { Chips } from "./CategoryChips.style";

export function CategoryChips({
  handleSelectCategory,
  activeCategory,
  menus,
}: CategoryChipsPropTypes) {
  const categories = getCategoriesForHomePage(menus);
  const NEW_CATEGORY_SELECTED = !activeCategory ? "active" : "";

  return (
    <div className="w-full my-10 flex justify-center overflow-auto">
      <Box className="flex pb-2 pl-3 max-w-full gap-x-4 md:gap-x-6 md:pb-0,pl-0">
        {(categories || []).length > 0 && (
          <Chips
            onClick={() => handleSelectCategory("")}
            className={NEW_CATEGORY_SELECTED}
          >
            New
          </Chips>
        )}
        {(categories || []).map((category: CategoryTypes) => {
          const isSelected = activeCategory === category?.id;
          return (
            <Chips
              onClick={() => handleSelectCategory(category?.id)}
              className={isSelected ? "active" : ""}
            >
              {category?.name}
            </Chips>
          );
        })}
      </Box>
    </div>
  );
}
