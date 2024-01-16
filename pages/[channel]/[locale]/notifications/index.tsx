import { Stack, Typography } from "@mui/material";
import React, { ReactElement } from "react";

import { Layout, NotificationCard } from "@/components";
import { BaseSeo } from "@/components/seo/BaseSeo";
import { notifications } from "@/lib/notification";

function NotificationsPage() {
  return (
    <div className="w-full">
      <BaseSeo />
      <div className="px-4 pb-20 pt-10 sm:px-8 sm:pb-0 sm:pt-0">
        <Typography variant="h4" gutterBottom>
          Notifications
        </Typography>
        <Stack spacing={2} direction="row">
          <Typography variant="body2" className="light-grey mb-6">
            52 Notifications, 52 unread
          </Typography>
          <Typography variant="h5" className="underline mb-6 cursor-pointer">
            Mark all as read
          </Typography>
        </Stack>
        <Stack direction="column" spacing={3}>
          {notifications.map((notification) => (
            <NotificationCard notification={notification} />
          ))}
        </Stack>
      </div>
    </div>
  );
}

export default NotificationsPage;

NotificationsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
