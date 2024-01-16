import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Carousel,
  CategoryChips,
  Layout,
  ProductCollection,
  ProductSkeleton,
  UsersDashboard,
} from "@/components";
import { BaseSeo } from "@/components/seo/BaseSeo";
import { DEFAULT_PAGINATION } from "@/constants/others";
import {
  getNewProducts,
  getOrdersReport,
  getProductB2CId,
  pushToStore,
} from "@/lib/api/requests";
import { fetchMyProductsCount } from "@/lib/redux/my-products";
import type { RootState } from "@/lib/redux/store";
import { OrdersReportTypes, ProductCardTypes } from "@/lib/types";
import {
  extractNodes,
  getDescription,
  getPriceFromVariant,
  getResalePriceFromVariant,
  getUniqueAttributes,
  replaceImageUrl,
} from "@/lib/util";

function DropShippingPage() {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const menus = useSelector(
    (state: RootState) => state?.categories?.menusCategories
  );

  const retailerShopId = useSelector(
    (state: RootState) => state?.retailer?.retailerShop?.id
  );

  const storeFrontId = useSelector(
    (state: RootState) => state?.retailer?.storeFront?.id
  );

  const NO_STORE_EXISTS = !storeFrontId;

  const [products, setProducts] = useState<ProductCardTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [pageInfo, setPageInfo] = useState(DEFAULT_PAGINATION);
  const [totalCount, setTotalCount] = useState(0);
  const [idsPushing, setIdsPushing] = useState<string[]>([]);
  const [ordersReport, setOrdersReport] = useState<OrdersReportTypes>({
    ordersCancelled: 0,
    ordersProcessing: 0,
    ordersReturnsRequested: 0,
    ordersShipped: 0,
    totalEarnings: 0,
  });

  const getProductDetails = async (productId) => {
    const response: any = await getProductB2CId(productId, retailerShopId);

    if (response?.status) {
      const parsedResponse = parseResponse(response?.data?.data);
      const targetProduct = parsedResponse[0];
      const B2BProductId = productId;
      const B2CProductId = targetProduct?.b2cProductId;
      addB2CProductId(B2BProductId, B2CProductId);
      dispatch(fetchMyProductsCount(retailerShopId));
    }
    setIdsPushing((prevIds) => prevIds.filter((id) => productId !== id));
  };

  const getProducts = async (params: any = {}) => {
    const { after } = params;
    if (after) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    const response: any = await getNewProducts(
      activeCategory,
      after,
      retailerShopId
    );
    if (response?.status) {
      if (after) {
        const parsedResponse = parseResponse(response?.data?.data);
        setProducts([...products, ...parsedResponse]);
      } else {
        const parsedResponse = parseResponse(response?.data?.data);
        setProducts(parsedResponse);
      }
      setPageInfo(response?.data?.pageInfo);
      setTotalCount(response?.data?.totalCount);
    } else {
      enqueueSnackbar(response?.message, {
        variant: "error",
      });
    }
    setLoading(false);
    setLoadingMore(false);
  };

  const fetchOrdersReport = async () => {
    setLoading(true);
    const response: any = await getOrdersReport(storeFrontId);
    if (response?.status) {
      setOrdersReport(response?.data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const addB2CProductId = (B2BProductId, B2CProductId) => {
    setProducts((prevProducts) => {
      const updatedProductList = prevProducts.map((product) => {
        if (product?.id === B2BProductId) {
          return {
            ...product,
            b2cProductId: B2CProductId,
          };
        }
        return product;
      });
      return updatedProductList;
    });
  };

  const pushProductToStore = async (productId) => {
    const payload = {
      products: [{ id: productId }],
      shopId: retailerShopId,
      storefrontId: storeFrontId,
    };
    const response: any = await pushToStore(payload);
    const count = response?.data?.data?.count || 0;
    if (response?.status && count > 0) {
      getProductDetails(productId);
    } else {
      enqueueSnackbar(response?.message || "Push to store failed", {
        variant: "error",
      });
      setIdsPushing((prevIds) => prevIds.filter((id) => productId !== id));
    }
  };

  const handlePushToStoreClick = async (productId) => {
    if (NO_STORE_EXISTS) {
      enqueueSnackbar("No storefront exists, please create a storefront", {
        variant: "error",
      });
    } else {
      setIdsPushing((prevIds) => {
        const updatedIds = [...prevIds, productId];
        pushProductToStore(productId);
        return updatedIds;
      });
    }
  };

  useEffect(() => {
    getProducts();
    setPageInfo(DEFAULT_PAGINATION);
  }, [activeCategory]);

  useEffect(() => {
    if (storeFrontId) {
      fetchOrdersReport();
    }
  }, [storeFrontId]);

  const parseResponse = (products) =>
    products.map((product) => {
      const {
        name,
        description,
        variants = [],
        id,
        slug,
        b2cProductId,
        thumbnail,
      } = product || {};
      const costPrice = getPriceFromVariant(variants[0]);
      const resalePrice = getResalePriceFromVariant(variants[0]);
      const colorVariants = getUniqueAttributes(variants, "Color");
      const imgUrl = replaceImageUrl(thumbnail?.url || "");

      const descriptionBlocks = getDescription(description);
      return {
        id,
        slug,
        name,
        description: descriptionBlocks[0],
        imgUrl,
        costPrice,
        resalePrice,
        colors: colorVariants,
        b2cProductId,
      };
    });

  const handleSelectCategory = (id) => {
    setActiveCategory(id);
  };

  const handleLoadMore = () => {
    getProducts({ after: pageInfo?.endCursor });
  };

  return (
    <Box className="w-full">
      <BaseSeo />
      <Box className="p-0 md:px-8">
        <Carousel />
      </Box>
      <UsersDashboard ordersReport={ordersReport} />
      <CategoryChips
        handleSelectCategory={handleSelectCategory}
        activeCategory={activeCategory}
        menus={extractNodes(menus || [])}
      />
      <Box className="pl-8 pr-8 pb-10 md:pb-6">
        {loading ? (
          <ProductSkeleton itemTotal={18} />
        ) : (
          <ProductCollection
            products={products}
            pushToStore={handlePushToStoreClick}
            idsForPushToStore={idsPushing}
          />
        )}
        {loadingMore && <ProductSkeleton itemTotal={18} />}
      </Box>
      {pageInfo?.hasNextPage && (
        <Box className="flex w-full justify-center items-center gap-x-4 mb-20 md:mb-0">
          <Button
            variant="contained"
            onClick={handleLoadMore}
            disableElevation
            disabled={loadingMore}
          >
            Load More
          </Button>
          <Typography variant="h5">
            {products?.length} / {totalCount}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default DropShippingPage;

DropShippingPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
