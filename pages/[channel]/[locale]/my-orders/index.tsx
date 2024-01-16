import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import {
  Box,
  CircularProgress,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Empty,
  FiltersCard,
  Layout,
  OrderCard,
  OrderCardSmall,
  Pagination,
  TabPanel,
} from "@/components";
import { orderType } from "@/components/MyOrders/order.type";
import { BaseSeo } from "@/components/seo/BaseSeo";
import { DEFAULT_PAGINATION } from "@/constants/others";
import {
  getAllVendors,
  getOrders,
  getReturnedOrders,
} from "@/lib/api/requests";
import { fetchOrdersCount } from "@/lib/redux/order";
import type { RootState } from "@/lib/redux/store";
import { extractNodes } from "@/lib/util";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface vendorType {
  node: {
    id: string;
    name: string;
  };
}

interface PaginationTypes {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}

interface OrderReportTypes {
  ordersCancelled: number;
  ordersProcessing: number;
  ordersReturnsRequested: number;
  ordersShipped: number;
  totalEarnings: number;
}
interface MyOrdersPagePropTypes {
  vendors: vendorType[];
}
function MyOrdersPage({ vendors }: MyOrdersPagePropTypes) {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const storeFrontId = useSelector(
    (state: RootState) => state?.retailer?.storeFront?.id
  );

  const orderReport: OrderReportTypes = useSelector(
    (state: RootState) => state?.order?.report
  );

  const [activeTab, setActiveTab] = useState(0);
  const [orders, setOrders] = useState<orderType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationTypes>({
    endCursor: "",
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: "",
  });
  const [filters, setFilters] = useState({
    statuses: "",
    startDate: "",
    endDate: "",
    customer: "",
    orderIds: "",
  });

  const getTotalPages = (totalCount) => {
    const total = Math.ceil(totalCount / 30);
    setTotalPages(total);
  };

  const fetchReturnedOrders = async (
    paginationInfo?: any,
    appliedFilters?: any
  ) => {
    const response: any = await getReturnedOrders({
      storeFrontId,
      filters: appliedFilters,
      paginationInfo,
    });
    return response;
  };

  const getOtherOrders = async (paginationInfo?: any, appliedFilters?: any) => {
    const response: any = await getOrders({
      storeFrontId,
      filters: appliedFilters,
      paginationInfo,
    });
    return response;
  };

  const getAllOrders = async (paginationInfo?: any, appliedFilters?: any) => {
    setLoading(true);

    const returnStatuses = ["PARTIALLY_RETURNED", "RETURNED"];
    const isReturnStatus = returnStatuses.includes(appliedFilters.statuses);

    const response: any = isReturnStatus
      ? await fetchReturnedOrders(paginationInfo, appliedFilters)
      : await getOtherOrders(paginationInfo, appliedFilters);

    if (response?.status) {
      const { edges, pageInfo, totalCount } = response?.data?.data || {};

      if (edges) {
        const ordersList = extractNodes(edges);
        setOrders(ordersList);
        setPagination(pageInfo);
        getTotalPages(totalCount);
      }
    } else {
      enqueueSnackbar(response?.message, {
        variant: "error",
      });
    }
    dispatch(fetchOrdersCount(storeFrontId));
    setLoading(false);
  };

  useEffect(() => {
    let appliedFilter = {};
    if (activeTab === 1) {
      appliedFilter = {
        ...filters,
        statuses: [
          "UNFULFILLED",
          "READY_TO_CAPTURE",
          "PARTIALLY_FULFILLED",
          "READY_TO_FULFILL",
        ],
      };
    } else if (activeTab === 2) {
      appliedFilter = {
        ...filters,
        statuses: ["READY_TO_CAPTURE", "READY_TO_FULFILL"],
      };
    } else if (activeTab === 3) {
      appliedFilter = {
        ...filters,
        statuses: ["CANCELED"],
      };
    } else if (activeTab === 4) {
      appliedFilter = { ...filters, statuses: ["FULFILLED"] };
    } else {
      appliedFilter = {
        ...filters,
        statuses: [],
      };
    }
    setPagination(DEFAULT_PAGINATION);
    setCurrentPage(1);
    if (storeFrontId) {
      getAllOrders({}, appliedFilter);
    }
  }, [activeTab, storeFrontId]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handlePageChange = (change) => {
    if (change === "next" && pagination?.hasNextPage) {
      getAllOrders({ after: pagination?.endCursor });
      setCurrentPage(currentPage + 1);
    }

    if (change === "prev" && pagination?.hasPreviousPage) {
      getAllOrders({ before: pagination?.startCursor });
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilters = (selectedFilters) => {
    setFilters(selectedFilters);
  };

  const applyFilters = () => {
    getAllOrders({}, filters);
  };

  const resetFilters = () => {
    setFilters({
      statuses: "",
      startDate: "",
      endDate: "",
      customer: "",
      orderIds: "",
    });
  };

  function tabLabel(tabText: string, count: number) {
    return (
      <Box>
        <span className="pr-2 default-black-color">
          {tabText}
          <span className="ml-2 sharove-color hidden">{count}</span>
        </span>
      </Box>
    );
  }

  const noData = !loading && !orders?.length;

  const renderOrderTable = () => (
    <Box>
      <Box className={loading || noData ? "hidden" : ""}>
        <Box className="w-full flex justify-end">
          <Pagination
            pageInfo={pagination}
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </Box>
        <Stack spacing={3} className="mt-0 md:mt-6">
          {(orders || []).map((order) => (
            <>
              <OrderCard order={order} />
              <OrderCardSmall order={order} />
            </>
          ))}
        </Stack>
        <Box className="w-full flex justify-end mt-6">
          <Pagination
            pageInfo={pagination}
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </Box>
      </Box>
      <Box className={noData ? "block" : "hidden"}>
        <Empty message="You haven't any orders yet." />
      </Box>
    </Box>
  );

  return (
    <div className="w-full">
      <BaseSeo />
      <div className="h-full px-4 lg:px-14 pb-10">
        <Stack
          direction="row"
          justifyContent="space-between"
          className="pb-9 w-full hidden md:flex"
        >
          <Typography variant="h4">My Orders</Typography>
          <Typography variant="h5">
            Store Displayed: <StoreOutlinedIcon />{" "}
            <span className="font-normal">All Stores</span>
          </Typography>
        </Stack>
        <Box className="w-full">
          <Box className="border-b border-slate-300 hidden md:block">
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab
                className="text-sm mr-1 2xl:text-base 2xl:mr-10"
                label={<div>All</div>}
                {...a11yProps(0)}
              />
              <Tab
                className="text-sm mr-1 2xl:text-base 2xl:mr-10"
                label={tabLabel("Orders", orderReport?.ordersProcessing)}
                {...a11yProps(1)}
              />
              <Tab
                className="text-sm mr-1 2xl:text-base 2xl:mr-10"
                label={tabLabel("To be shipped", orderReport?.ordersShipped)}
                {...a11yProps(2)}
              />
              <Tab
                className="text-sm mr-1 2xl:text-base 2xl:mr-10"
                label={tabLabel("In Dispute", orderReport?.ordersCancelled)}
                {...a11yProps(3)}
              />
              <Tab
                className="text-sm 2xl:text-base"
                label={tabLabel("Completed/Closed", orderReport?.ordersShipped)}
                {...a11yProps(4)}
              />
            </Tabs>
          </Box>
          <Box className="pt-6">
            <FiltersCard
              filters={filters}
              vendors={extractNodes(vendors)}
              handleFilters={handleFilters}
              applyFilters={applyFilters}
              resetFilters={resetFilters}
            />
          </Box>
          <TabPanel value={activeTab} index={0}>
            {renderOrderTable()}
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            {renderOrderTable()}
          </TabPanel>
          <TabPanel value={activeTab} index={2}>
            {renderOrderTable()}
          </TabPanel>
          <TabPanel value={activeTab} index={3}>
            {renderOrderTable()}
          </TabPanel>
          <TabPanel value={activeTab} index={4}>
            {renderOrderTable()}
          </TabPanel>
        </Box>
      </div>
      <Box className={loading ? "w-full flex justify-center" : "hidden"}>
        <CircularProgress />
      </Box>
    </div>
  );
}

export async function getServerSideProps() {
  const vendorsAPIResponse: any = await getAllVendors();

  return {
    props: {
      vendors: vendorsAPIResponse?.status
        ? vendorsAPIResponse?.data?.data?.edges
        : [],
    },
  };
}

export default MyOrdersPage;

MyOrdersPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
