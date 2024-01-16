import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import React from "react";

interface SearchCard {
  title: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  handleSearch: () => void;
}

export function SearchCard({
  title,
  placeholder,
  onChange,
  value,
  handleSearch,
}: SearchCard) {
  return (
    <Paper
      elevation={0}
      className="w-full rounded-t py-8 px-7 mb-6 hidden md:block"
    >
      <Typography variant="h4" gutterBottom className="mb-5">
        {title}
      </Typography>
      <Stack spacing={3} direction="row">
        <TextField
          fullWidth
          size="medium"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleSearch}
          disabled={!value}
        >
          Search
        </Button>
      </Stack>
    </Paper>
  );
}
