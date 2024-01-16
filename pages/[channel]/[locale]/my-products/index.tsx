import { Box, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Empty,
  Layout,
  MyProductCard,
  Pagination,
  ProductCardSmall,
  RemoveModal,
  RemoveProduct,
  SearchCard,
} from "@/components";
import { productType } from "@/components/MyProducts/product.type";
import { BaseSeo } from "@/components/seo/BaseSeo";
import { DEFAULT_PAGINATION, DESCRIPTION } from "@/constants/others";
import {
  addVendorToMyVendors,
  editMyProducts,
  getMyProducts,
  removeFromMyProduct,
} from "@/lib/api/requests";
import { fetchMyProductsCount } from "@/lib/redux/my-products";
import { RootState } from "@/lib/redux/store";
import { extractNodes, getDescription } from "@/lib/util";

interface PaginationTypes {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}

function MyProductsPage() {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const retailerShopId = useSelector(
    (state: RootState) => state?.retailer?.retailerShop?.id
  );

  const storeFrontId = useSelector(
    (state: RootState) => state?.retailer?.storeFront?.id
  );

  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
  const [myProducts, setMyProducts] = useState<productType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchStr, setSearchStr] = useState("");
  const [, setRetailerData] = useState({});
  const [pagination, setPagination] =
    useState<PaginationTypes>(DEFAULT_PAGINATION);

  useEffect(() => {
    if (!searchStr) {
      setPagination(DEFAULT_PAGINATION);
      fetchMyProducts();
    }
  }, [searchStr]);

  const getTotalPages = (totalCount) => {
    const total = Math.ceil(totalCount / 30);
    setTotalPages(total);
  };

  const toggleRemoveModal = () => {
    setShowRemoveModal(!showRemoveModal);
  };

  const fetchMyProducts = async (params?: any) => {
    setLoading(true);

    const response: any = await getMyProducts(
      retailerShopId,
      params,
      searchStr
    );
    if (response?.status) {
      const { data = [] } = response?.data;
      const retailer = data[0];
      const { edges, pageInfo, totalCount } = data[1] || {};

      if (retailer) {
        setRetailerData(retailer);
      }

      if (edges?.length) {
        const productsList = extractNodes(edges).map((item) => {
          const descriptionBlock = getDescription(item?.description);
          return {
            ...item,
            description: descriptionBlock[0],
            defaultVariant: (item?.variants || [])[0],
            isSelected: true,
          };
        });
        setMyProducts(productsList);
        setPagination(pageInfo);
        getTotalPages(totalCount);
        setLoading(false);
      } else {
        setMyProducts([]);
      }
      dispatch(fetchMyProductsCount(retailerShopId));
    } else {
      enqueueSnackbar(response?.message, {
        variant: "error",
      });
    }

    setLoading(false);
  };

  const handleSelectProduct = (selectedProduct, checked) => {
    const updatedProductsList = (myProducts || []).map((product) => {
      if (selectedProduct?.id === product?.id) {
        return { ...product, isSelected: checked };
      }
      return product;
    });
    setMyProducts(updatedProductsList);
  };

  const handleSelectAll = (checked) => {
    const updatedProductsList = (myProducts || []).map((product) => ({
      ...product,
      isSelected: checked,
    }));
    setMyProducts(updatedProductsList);
  };

  const handleRemoveProduct = async () => {
    toggleRemoveModal();
    setLoading(true);
    const selectedProducts = getSelectedProducts();
    const productIds = getProductIds(selectedProducts);
    const payload = {
      productIds,
      storeId: storeFrontId,
    };
    const response: any = await removeFromMyProduct(payload);
    const count = response?.data?.data?.saleor?.count;
    if (response?.status && count > 0) {
      fetchMyProducts();
      enqueueSnackbar("Product(s) deleted successfully from my products", {
        variant: "success",
      });
    } else {
      enqueueSnackbar(response?.message || "Unable to delete the product", {
        variant: "error",
      });
      setLoading(false);
    }
  };

  const handleRemoveSingleProduct = async (id) => {
    setLoading(true);
    const payload = {
      productIds: [id],
      storeId: storeFrontId,
    };
    const response: any = await removeFromMyProduct(payload);
    const count = response?.data?.data?.saleor?.count;
    if (response?.status && count > 0) {
      fetchMyProducts();
      enqueueSnackbar("Product deleted successfully from my products", {
        variant: "success",
      });
    } else {
      enqueueSnackbar(response?.message || "Unable to delete the product", {
        variant: "error",
      });
      setLoading(false);
    }
  };

  const handleSearchProduct = async () => {
    setPagination(DEFAULT_PAGINATION);
    fetchMyProducts();
  };

  const handleSaveChanges = async (id, values, removeMediaIds) => {
    setLoading(true);
    const payload = {
      productId: id,
      removeMediaIds,
      input: {
        ...values,
        description: DESCRIPTION.replace(
          "dummyDescription",
          values?.description
        ),
      },
    };
    const response: any = await editMyProducts(payload);
    if (response?.status) {
      fetchMyProducts();
      enqueueSnackbar("Product updated successfully", {
        variant: "success",
      });
    } else {
      enqueueSnackbar(response?.message, {
        variant: "error",
      });
    }
    setLoading(false);
  };

  const handlePageChange = (change) => {
    if (change === "next" && pagination?.hasNextPage) {
      fetchMyProducts({ after: pagination?.endCursor });
      setCurrentPage(currentPage + 1);
    }

    if (change === "prev" && pagination?.hasPreviousPage) {
      fetchMyProducts({ before: pagination?.startCursor });
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddToMyVendors = async (id) => {
    setLoading(true);
    const payload = {
      vendorIds: [Number(id)],
    };
    const response: any = await addVendorToMyVendors(retailerShopId, payload);
    if (response?.status) {
      enqueueSnackbar("Vendor added to my vendors list", {
        variant: "success",
      });
    } else {
      enqueueSnackbar(response?.message, {
        variant: "error",
      });
    }
    setLoading(false);
  };

  const allSelected = (myProducts || []).every(
    (product) => product?.isSelected
  );

  const getSelectedProducts = () =>
    (myProducts || []).filter((product) => product?.isSelected);

  const getProductIds = (selectedProducts: productType[] = []) =>
    selectedProducts.map((product) => product?.id);

  const selectedProductNames = (myProducts || [])
    .filter((product) => product?.isSelected)
    .map((product) => product?.name);

  const noData = !loading && !myProducts?.length;

  if (noData) {
    return (
      <Empty
        message="You haven't added any Product(s) to My Products"
        buttonText="Add Products"
      />
    );
  }

  return (
    <div className="w-full">
      <BaseSeo />
      <Box className="h-full px-4 pb-10 lg:px-14">
        <SearchCard
          title="My Products"
          value={searchStr}
          onChange={setSearchStr}
          handleSearch={handleSearchProduct}
          placeholder="Search for products in My Products"
        />
        <Box className={loading ? "hidden" : "py-8 md:py-0"}>
          <Box className="flex justify-between items-center w-full mb-6">
            <RemoveProduct
              toggleRemoveModal={toggleRemoveModal}
              handleSelectAll={handleSelectAll}
              allSelected={allSelected}
              disabled={selectedProductNames.length === 0}
            />
            <Pagination
              pageInfo={pagination}
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          </Box>
          {(myProducts || []).map((data) => (
            <div key={data.id} className="pb-6 mb-0.5">
              <MyProductCard
                data={data}
                addToMyVendors={handleAddToMyVendors}
                handleSaveChanges={handleSaveChanges}
                handleSelectProduct={handleSelectProduct}
                handleRemoveSingleProduct={handleRemoveSingleProduct}
              />
              <ProductCardSmall
                data={data}
                addToMyVendors={handleAddToMyVendors}
                handleSelectProduct={handleSelectProduct}
                handleRemoveSingleProduct={handleRemoveSingleProduct}
              />
            </div>
          ))}
          <Box className="w-full flex justify-end">
            <Pagination
              pageInfo={pagination}
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          </Box>
        </Box>
      </Box>
      <RemoveModal
        title="Remove Product"
        message="Are you sure you want to remove the following from the list"
        products={selectedProductNames}
        showModal={showRemoveModal}
        onClose={toggleRemoveModal}
        onRemove={handleRemoveProduct}
      />
      <Box className={loading ? "w-full flex justify-center" : "hidden"}>
        <CircularProgress />
      </Box>
    </div>
  );
}

export default MyProductsPage;

MyProductsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
