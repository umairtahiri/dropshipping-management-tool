import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import React from "react";

import { ProductSkeletonPropTypes } from "@/lib/types";

export function ProductSkeleton({ itemTotal = 6 }: ProductSkeletonPropTypes) {
  return (
    <Box className="w-full flex flex-wrap	whitespace-nowrap justify-center gap-x-4">
      {new Array(itemTotal).fill(1).map(() => (
        <Box className="mt-3 d-inline-block w-[calc(1064px/6)]">
          <Card>
            <Skeleton animation="pulse" variant="rectangular" height={273} />
            <CardContent>
              <Skeleton width="80%" />
              <Skeleton width="40%" />
              <Skeleton width="60%" />
              <Box display="flex" alignItems="center" mt={2}>
                <Box mr={1}>
                  <Skeleton variant="circular" width={15} height={15} />
                </Box>
                <Box mr={1}>
                  <Skeleton variant="circular" width={15} height={15} />
                </Box>
                <Box mr={1}>
                  <Skeleton variant="circular" width={15} height={15} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
}
