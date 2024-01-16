import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import { AutoSyncCategory, CategorySkeleton, Layout } from "@/components";
import { BaseSeo } from "@/components/seo/BaseSeo";
import { autoSyncProducts, getAutoSyncCategories } from "@/lib/api/requests";
import { AUTO_SYNC_WEBSOCKET_URL } from "@/lib/const";
import {
  setInProgressCategories,
  setSelectedCategory,
  setSocketResponse,
} from "@/lib/redux/auto-sync";
import { fetchMyProductsCount } from "@/lib/redux/my-products";
import type { RootState } from "@/lib/redux/store";
import { CategoryInterface } from "@/lib/types";
import { extractNodes } from "@/lib/util";

function AutoSyncPage() {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const shopId = useSelector(
    (state: RootState) => state?.retailer?.retailerShop?.id
  );
  const storeId = useSelector(
    (state: RootState) => state?.retailer?.storeFront?.id
  );
  const { selectedCategory, inProgressCategories, socketResponse } =
    useSelector((state: RootState) => state?.autoSync);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [socket, setSocket] = useState<any>(null);

  const makeSocketConnection = () => {
    socket.on("connect", () => {
      console.log("SOCKET", socket.connected);
    });
  };

  const getResponseFromSocket = () => {
    socket.on("autoSyncStatus", (message) => {
      dispatch(setSocketResponse(message));
    });
  };

  const checkIfAynSynced = (categories) =>
    (categories || []).some((category) => category?.sync);

  const initiateSocket = () => {
    const SOCKET = io(AUTO_SYNC_WEBSOCKET_URL as string);
    setSocket(SOCKET);
  };

  const getAutoSync = async () => {
    const NO_SHOP_ID = !shopId;
    if (NO_SHOP_ID) return;
    setIsLoading(true);
    const response: any = await getAutoSyncCategories(shopId);
    if (response?.status) {
      const categories = extractNodes(response?.data?.edges);
      const anySynced = checkIfAynSynced(categories);
      if (anySynced) {
        initiateSocket();
      }
      setIsLoading(false);
      dispatch(setSelectedCategory(categories));
    } else {
      setIsLoading(false);
    }
  };

  const getSelectedCategoryIds = () =>
    selectedCategory
      .filter((category: CategoryInterface) => category?.checked)
      .map(({ id }) => id);

  useEffect(() => {
    if (socket) {
      makeSocketConnection();
      getResponseFromSocket();
    }
  }, [socket]);

  useEffect(() => {
    getAutoSync();
  }, []);

  const toggleCheckbox = (categoryId: string) => {
    const clonedData = [...selectedCategory];
    const updatedSelectedCategoryList = clonedData.map((data) =>
      data?.id === categoryId ? { ...data, checked: !data?.checked } : data
    );
    dispatch(setSelectedCategory(updatedSelectedCategoryList));
  };

  const storeInProgressCategoris = (categories) => {
    dispatch(
      setInProgressCategories(
        (categories || []).map((category) => category?.categoryId)
      )
    );
  };

  const handleAutoSync = async () => {
    if (!storeId) {
      enqueueSnackbar("Please create your storefront", {
        variant: "error",
      });
      return;
    }
    if (!socket) {
      initiateSocket();
    }
    setIsLoading(true);
    const selectedCategoryIds = getSelectedCategoryIds();
    const response: any = await autoSyncProducts(
      selectedCategoryIds,
      shopId,
      storeId
    );
    if (response?.status) {
      storeInProgressCategoris(response?.data);
      enqueueSnackbar("Sync process has been started successfully", {
        variant: "success",
      });
      setIsLoading(false);
    } else {
      setIsLoading(false);
      enqueueSnackbar(response?.message, {
        variant: "error",
      });
    }
  };

  const removeFromWaitingList = (id) => {
    if (inProgressCategories.includes(id)) {
      const filteredList = inProgressCategories.filter((catId) => catId !== id);
      dispatch(setInProgressCategories(filteredList));
    }
    dispatch(fetchMyProductsCount(shopId));
  };

  const DISABLE_SAVE_BTN = isLoading || !selectedCategory.length;

  return (
    <Box className="px-7 pt-[41px] pb-20 md:pt-0 md:pb-0">
      <BaseSeo />
      <Typography variant="h4">Categories</Typography>
      <Typography variant="body1" className="pt-[15px] pb-[25px]">
        Retailers can automatically import products from Sharove inventory into
        their own product catalog. This feature is useful for retailers who want
        to offer a wider variety of products to their customers without manually
        adding each product one by one.
      </Typography>
      {isLoading && <CategorySkeleton />}

      {!isLoading && selectedCategory && (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {selectedCategory
            .filter((category) => category?.name !== "Default Category")
            .map((category) => {
              const { categoryId } = socketResponse || {};
              const { id } = category || {};
              const CATEGORY_SELECTED = categoryId === id;
              const IN_WAITING_STATE = inProgressCategories.includes(id);
              return (
                <Grid item xs={12} sm={12} md={4} key={id}>
                  <AutoSyncCategory
                    categories={category}
                    toggleCheckbox={toggleCheckbox}
                    waiting={IN_WAITING_STATE}
                    removeFromWaitingList={removeFromWaitingList}
                    socketResponse={CATEGORY_SELECTED ? socketResponse : null}
                  />
                </Grid>
              );
            })}
        </Grid>
      )}

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
        className="py-[25px]"
      >
        <Button
          variant="contained"
          color="primary"
          disableElevation
          className="w-[141px] py-2 px-3.5"
          onClick={handleAutoSync}
          disabled={DISABLE_SAVE_BTN}
        >
          {isLoading ? (
            <CircularProgress className="relative w-6 h-6 text-white" />
          ) : (
            <span>Save Changes</span>
          )}
        </Button>
        <Button variant="text" disableElevation>
          Cancel
        </Button>
      </Stack>
    </Box>
  );
}

export default AutoSyncPage;

AutoSyncPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
