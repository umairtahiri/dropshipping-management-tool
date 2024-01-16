import { Box, Popover, Typography } from "@mui/material";
import { bindPopover } from "material-ui-popup-state";
import Link from "next/link";
import { useState } from "react";
import * as React from "react";

interface NotificationsPopoverPropTypes {
  popupState: any;
}

export function NotificationsPopover({
  popupState,
}: NotificationsPopoverPropTypes) {
  const [notifications] = useState([]);
  const hasNotifications = !!notifications?.length;
  return (
    <Popover
      {...bindPopover(popupState)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      PaperProps={{
        className: "w-80",
        style: { maxWidth: "320px" },
      }}
    >
      {hasNotifications ? (
        <Box>
          <Typography variant="h4" className="font-normal p-6">
            You have <span className="sharove-color">34</span> new notifications
          </Typography>
          <Box className="px-6 max-h-80 overflow-auto">
            {notifications.map((notification) => {
              const { title, message, date } = notification;
              return (
                <Box className="w-full border-b border-slate-300">
                  <Typography variant="h6" className="mb-1 pt-2.5">
                    {title}
                  </Typography>
                  <Typography className="mb-1 text-sm light-grey font-normal truncate">
                    {message}
                  </Typography>
                  <Typography className="mb-1 pb-2.5 text-sm light-grey font-normal">
                    {date}
                  </Typography>
                </Box>
              );
            })}
          </Box>
          <Box className="py-4 w-full text-center cursor-pointer">
            <Link href="/default-channel/en-US/notifications" passHref>
              <Typography>View More</Typography>
            </Link>
          </Box>
        </Box>
      ) : (
        <Box className="w-full h-80 flex items-center justify-center">
          <Typography>No new notifications!</Typography>
        </Box>
      )}
    </Popover>
  );
}
