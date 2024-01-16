import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Empty, Layout, ProductCard, ProductSkeleton } from "@/components";
import { ProductCardType } from "@/components/ProductCard/ProductCardInterface";
import { BaseSeo } from "@/components/seo/BaseSeo";
import { getProductsFromElasticSearch, pushToStore } from "@/lib/api/requests";
import { B2B_SHOP_URL } from "@/lib/const";
import { fetchMyProductsCount } from "@/lib/redux/my-products";
import type { RootState } from "@/lib/redux/store";
import { DEFAULT_CHANNEL, DEFAULT_LOCALE } from "@/lib/regions";
import { parseResult, replaceImageUrlForESProducts } from "@/lib/util";

interface PaginationTypes {
  current: number;
  size: number;
  total_pages: number;
  total_results: number;
}
function SearchResultsPage() {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();
  const { query, category } = router?.query;

  const retailerShopId = useSelector(
    (state: RootState) => state?.retailer?.retailerShop?.id
  );

  const storeFrontId = useSelector(
    (state: RootState) => state?.retailer?.storeFront?.id
  );

  const [products, setProducts] = useState<ProductCardType[]>([]);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [pagination, setPagination] = useState<PaginationTypes>({
    current: 1,
    size: 30,
    total_pages: 0,
    total_results: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const firstPage = 1;
    setLoading(true);
    getProducts(firstPage);
  }, [query, category]);

  const parseResponse = (products) =>
    products.map((product) => {
      const {
        name,
        description,
        color_names,
        default_variant_image,
        default_variant_cost,
        channel_prices = [],
        id,
        slug,
        thumbnail,
      } = product || {};
      const imgUrl = replaceImageUrlForESProducts(
        default_variant_image || thumbnail
      );
      return {
        id,
        slug,
        name,
        description,
        imgUrl,
        costPrice: default_variant_cost,
        resalePrice: channel_prices[0],
        colors: color_names,
      };
    });

  const getProducts = async (currentPage) => {
    const payload: any = {
      query,
      sort: [
        {
          _score: "desc",
        },
        {
          created_at: "desc",
        },
      ],
      filters: {
        all: [],
      },
      page: {
        current: currentPage,
        size: pagination?.size,
      },
      result_fields: {
        name: {
          raw: {},
        },
        description: {
          raw: {},
        },
        channel_prices: {
          raw: {},
        },
        color_images: {
          raw: {},
        },
        color_names: {
          raw: {},
        },
        color_slugs: {
          raw: {},
        },
        default_variant_cost: {
          raw: {},
        },
        default_variant_id: {
          raw: {},
        },
        default_variant_image: {
          raw: {},
        },
        preorder: {
          raw: {},
        },
        shop_id: {
          raw: {},
        },
        shop_name: {
          raw: {},
        },
        slug: {
          raw: {},
        },
        thumbnail: {
          raw: {},
        },
      },
    };
    if (category) {
      payload?.filters.all.push({
        category_slugs: [category],
      });
    }
    const response: any = await getProductsFromElasticSearch(payload);
    const { status, data } = response || {};
    const { meta, results } = data || {};
    const { current, size, total_pages, total_results } = meta?.page || {};
    const parsedResults: any = parseResult(results);
    const productsList: any = parseResponse(parsedResults);
    if (status) {
      if (currentPage > 1) {
        setProducts([...products, ...productsList]);
      } else {
        setProducts(productsList);
      }
      setPagination({ current, size, total_pages, total_results });
    } else {
      setProducts([]);
    }
    setLoading(false);
    setLoadingMore(false);
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    const nextPage = pagination?.current + 1;
    setPagination({ ...pagination, size: nextPage });
    getProducts(nextPage);
  };

  const addB2CProductId = (productId) => {
    const updatedProductList = products.map((product) => {
      if (product?.id === productId) {
        return {
          ...product,
          b2cProductId: productId,
        };
      }
      return product;
    });

    setProducts(updatedProductList);
  };

  const pushProductToStore = async (productId) => {
    setSelectedProductId(productId);
    const payload = {
      products: [{ id: productId }],
      shopId: retailerShopId,
      storefrontId: storeFrontId,
      importList: true,
    };
    const response: any = await pushToStore(payload);
    const count = response?.data?.data?.count || 0;
    if (response?.status && count > 0) {
      addB2CProductId(productId);
      dispatch(fetchMyProductsCount(retailerShopId));
      enqueueSnackbar("Product(s) pushed to store successfully", {
        variant: "success",
      });
    } else {
      enqueueSnackbar(response?.message || "Push to store failed", {
        variant: "error",
      });
    }
    setSelectedProductId("");
  };

  const noData = !loading && !products?.length;

  if (noData) {
    return <Empty message="No results found!" />;
  }

  return (
    <div className="w-full">
      <BaseSeo />
      <Box className="h-full px-4 pb-10 lg:px-14">
        <Box className="pl-8 pr-8 pb-10 md:pb-6">
          <Breadcrumbs aria-label="breadcrumb" className="ml-4 mb-6">
            <Link href="/default-channel/en-US/dashboard">
              <Typography variant="h5" className="font-normal cursor-pointer">
                Home
              </Typography>
            </Link>
            <Typography variant="h5" className="text-[#999] font-normal">
              Search
            </Typography>
          </Breadcrumbs>
          <Typography variant="h3" className="ml-4 mb-6 text-3xl font-medium">
            {loading ? (
              <Skeleton variant="text" className="w-72 text-base" />
            ) : (
              `Search in "${query}" ${pagination?.total_results} results`
            )}
          </Typography>
          {loading ? (
            <ProductSkeleton itemTotal={35} />
          ) : (
            <Grid container spacing={2} justifyContent="center">
              {(products || []).map((product) => {
                const { id, slug } = product;
                return (
                  <Grid key={id} item>
                    <Link
                      href={{
                        pathname:
                          `${B2B_SHOP_URL}/${DEFAULT_CHANNEL.slug}/${DEFAULT_LOCALE}/products/${slug}` as const,
                        query: {
                          id,
                        },
                      }}
                      passHref
                      target="_blank"
                    >
                      <ProductCard
                        product={product}
                        loading={selectedProductId === id}
                        pushToStore={() => pushProductToStore(id)}
                      />
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          )}
          {loadingMore && <ProductSkeleton itemTotal={14} />}
        </Box>
        {pagination?.current < pagination?.total_pages && (
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
              {products?.length} / {pagination?.total_results}
            </Typography>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default SearchResultsPage;

SearchResultsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
