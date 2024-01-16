// @ts-nocheck
import { Box, Tab, Tabs } from "@mui/material";
import React, { ReactElement } from "react";

import {
  GeneralSettings,
  Layout,
  OrdersSettings,
  TabPanel,
} from "@/components";
import { BaseSeo } from "@/components/seo/BaseSeo";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function SettingsPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="w-full">
      <BaseSeo />
      <div className="pt-4 pb-12 px-8">
        <Box className="border-b border-slate-300">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              className="text-base font-normal"
              label={<div>General</div>}
              {...a11yProps(0)}
            />
            <Tab
              className="text-base font-normal"
              label={<div className="flex gap-x-2">Orders</div>}
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <GeneralSettings />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <OrdersSettings />
        </TabPanel>
      </div>
    </div>
  );
}

export default SettingsPage;

SettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
