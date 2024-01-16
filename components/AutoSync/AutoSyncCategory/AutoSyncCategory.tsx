import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";

import { CategoryInterface, WebSocketTypes } from "@/lib/types";
import { capitizedText } from "@/lib/util";

import { BorderLinearProgress, CategoryItem } from "./AutoSyncCategory.style";

interface AutoSyncProps {
  waiting: boolean;
  categories: CategoryInterface;
  toggleCheckbox: (string) => void;
  socketResponse: WebSocketTypes | any;
  removeFromWaitingList: (id: string) => void;
}

export function AutoSyncCategory({
  waiting,
  categories,
  toggleCheckbox,
  socketResponse,
  removeFromWaitingList,
}: AutoSyncProps) {
  const { imported, totalProducts } = socketResponse || {};

  const { sync, id, checked, name, products } = categories || {};
  const importProductsCount = products?.totalCount;

  const IS_SELECTED = checked || sync;

  const percentage = (imported / totalProducts) * 100;
  const SYNC_NOT_STARTED = waiting && !percentage;
  const SYNC_STARTED = socketResponse && Boolean(percentage);

  // NOTE: will be used later
  // const ALREADY_SYNCED = sync && !socketResponse && !waiting;

  // if (ALREADY_SYNCED) {
  //   percentage = 100;
  // }

  useEffect(() => {
    if (!sync && percentage === 100) {
      removeFromWaitingList(id);
    }
  }, [percentage]);

  return (
    <Box className="grow">
      <CategoryItem>
        <FormGroup className="w-full flex-row justify-between">
          <Box className="flex w-2/5">
            <FormControlLabel
              control={
                <Checkbox
                  disabled={sync}
                  onChange={() => toggleCheckbox(id)}
                  checked={IS_SELECTED}
                />
              }
              label={
                <Typography variant="h6">
                  {name === "ACCESSORIES/JEWELRY"
                    ? "Accessories"
                    : capitizedText(name?.toLowerCase())}
                </Typography>
              }
            />
          </Box>
          <Box className="flex w-3/5">
            {SYNC_NOT_STARTED && (
              <Box className="w-full">
                <span className="grey-color-10">Waiting to Import</span>
                <BorderLinearProgress variant="determinate" value={0} />
              </Box>
            )}
            {SYNC_STARTED && (
              <Box className="w-full">
                <span className="grey-color-10">
                  {percentage < 100
                    ? `Importing ${imported} products`
                    : `Imported ${
                        totalProducts || importProductsCount
                      } products`}
                </span>
                <BorderLinearProgress
                  success={percentage >= 100}
                  variant="determinate"
                  value={percentage}
                />
              </Box>
            )}
          </Box>
        </FormGroup>
      </CategoryItem>
    </Box>
  );
}
