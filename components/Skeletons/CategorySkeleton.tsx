import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import React from "react";

export function CategorySkeleton() {
  const itemTotal = 8;
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {new Array(itemTotal).fill(1).map(() => (
        <Grid item xs={12} sm={12} md={4}>
          <Skeleton variant="rectangular" width="100%" height={74} />
        </Grid>
      ))}
    </Grid>
  );
}
