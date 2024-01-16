// @ts-nocheck
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import React from "react";

import { ORDER_STATUS_LIST } from "@/constants/others";

interface FilterTypes {
  statuses: string;
  startDate: string;
  endDate: string;
  customer: string;
  orderIds: string;
}

interface vendorType {
  id: string;
  name: string;
}

interface FiltersCardPropTypes {
  vendors: vendorType[];
  filters: FilterTypes;
  handleFilters: (filters: FilterTypes) => void;
  applyFilters: () => void;
  resetFilters: () => void;
}

export function FiltersCard({
  vendors,
  filters,
  handleFilters,
  applyFilters,
  resetFilters,
}: FiltersCardPropTypes) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOtherDate = (time) => {
    let startDate = "";
    const endDate = dayjs();
    switch (time) {
      case "3 months":
        startDate = endDate.subtract(3, "month");
        break;
      case "6 months":
        startDate = endDate.subtract(6, "month");
        break;
      default:
        startDate = endDate.subtract(1, "year");
    }
    handleFilters({ ...filters, startDate, endDate });
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Paper
      elevation={0}
      className="w-full rounded-t py-7 px-10 hidden md:block"
    >
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <InputLabel id="demo-multiple-name-label">
            <Typography variant="h5" gutterBottom>
              Order Status
            </Typography>
          </InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            input={<OutlinedInput fullWidth placeholder="Please select" />}
            value={filters?.statuses}
            onChange={(event) =>
              handleFilters({
                ...filters,
                statuses: event.target.value,
              })
            }
            size="small"
          >
            {ORDER_STATUS_LIST.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.labal}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel id="demo-multiple-name-label">
            <Typography variant="h5" gutterBottom>
              Order Time
            </Typography>
          </InputLabel>
          <Box
            aria-describedby={id}
            onClick={(event) => handleClick(event)}
            className="flex justify-between border border-[#c4c4c4] rounded py-[6px] px-3 cursor-pointer"
          >
            {filters?.startDate || filters?.endDate ? (
              <Box className="text-[#333]">
                {dayjs(filters?.startDate).format("YYYY-MM-DD")} to{" "}
                {dayjs(filters?.endDate).format("YYYY-MM-DD")}
              </Box>
            ) : (
              <Box className="text-[#c4c4c4]">Please Select </Box>
            )}
            {open ? (
              <ArrowDropUpIcon className="text-[#757575]" />
            ) : (
              <ArrowDropDownIcon className="text-[#757575]" />
            )}
          </Box>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box className="px-5 py-[18px] max-w-[561px]">
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={filters?.startDate}
                      onChange={(value) =>
                        handleFilters({
                          ...filters,
                          startDate: value,
                        })
                      }
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={5}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={filters?.endDate}
                      onChange={(value) =>
                        handleFilters({
                          ...filters,
                          endDate: value,
                        })
                      }
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    disableElevation
                    onClick={handleClose}
                  >
                    OK
                  </Button>
                </Grid>
                <Grid item xs={12} className="mt-4 cursor-pointer">
                  <Typography
                    variant="h6"
                    onClick={() => handleOtherDate("3 months")}
                  >
                    Within 3 months
                  </Typography>
                </Grid>
                <Grid item xs={12} className="cursor-pointer">
                  <Typography
                    variant="h6"
                    onClick={() => handleOtherDate("6 months")}
                  >
                    Within 6 months
                  </Typography>
                </Grid>
                <Grid item xs={12} className="cursor-pointer">
                  <Typography
                    variant="h6"
                    onClick={() => handleOtherDate("1 year")}
                  >
                    Within 1 year
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Popover>
        </Grid>
        <Grid item xs={4}>
          <InputLabel id="demo-multiple-name-label">
            <Typography variant="h5" gutterBottom>
              Vendor ID
            </Typography>
          </InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            input={<OutlinedInput fullWidth placeholder="Please select" />}
            size="small"
            value={filters?.customer}
            onChange={(event) =>
              handleFilters({
                ...filters,
                customer: event.target.value,
              })
            }
          >
            {(vendors || []).map((vendor) => (
              <MenuItem key={vendor?.id} value={vendor?.id}>
                {vendor?.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel id="demo-multiple-name-label">
            <Typography variant="h5" gutterBottom>
              Order ID
            </Typography>
          </InputLabel>
          <TextField
            fullWidth
            id="searchId"
            size="medium"
            placeholder="Search"
            value={filters?.orderIds}
            onChange={(event) =>
              handleFilters({
                ...filters,
                orderIds: event.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={4}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="flex-end"
            className="h-full"
          >
            <Button
              variant="contained"
              size="large"
              disableElevation
              onClick={applyFilters}
            >
              Search
            </Button>
            <Button variant="outlined" size="large" onClick={resetFilters}>
              Reset
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
