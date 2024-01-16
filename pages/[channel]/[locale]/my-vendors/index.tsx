// @ts-nocheck
import { Box, CircularProgress, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  Empty,
  Layout,
  Pagination,
  RemoveModal,
  RemoveVendor,
  SearchCard,
  VendorCard,
  VendorCardSmall,
} from "@/components";
import { BaseSeo } from "@/components/seo/BaseSeo";
import {
  getMyVendors,
  removeVendorFromMyVendors,
  searchVendors,
} from "@/lib/api/requests";
import { RootState } from "@/lib/redux/store";

function MyVendorsPage() {
  const { enqueueSnackbar } = useSnackbar();

  const retailerShopId = useSelector(
    (state: RootState) => state?.retailer?.retailerShop?.id
  );

  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
  const [myVendors, setMyVendors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchStr, setSearchStr] = useState("");
  const [pagination] = useState<PaginationTypes>({
    endCursor: "",
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: "",
  });

  useEffect(() => {
    fetchMyVendors();
  }, []);

  useEffect(() => {
    if ((myVendors || []).length) {
      const total = Math.ceil(myVendors.length / 30);
      setTotalPages(total);
      setCurrentPage(1);
    }
  }, [myVendors]);

  const fetchMyVendors = async () => {
    setLoading(true);
    const response = await getMyVendors(retailerShopId);
    if (response?.status) {
      setMyVendors(
        response?.data?.data?.map((vendor) => ({ ...vendor, isSelected: true }))
      );
    } else {
      enqueueSnackbar(response?.message, {
        variant: "error",
      });
    }
    setLoading(false);
  };

  const toggleRemoveModal = () => {
    setShowRemoveModal(!showRemoveModal);
  };

  const handleSelectVendor = (selectedVendor, checked) => {
    const updatedVendorsList = (myVendors || []).map((vendor) => {
      if (selectedVendor?.vendorDetail?.id === vendor?.vendorDetail?.id) {
        return { ...vendor, isSelected: checked };
      }
      return vendor;
    });
    setMyVendors(updatedVendorsList);
  };

  const handleSelectAll = (checked) => {
    const updatedVendorsList = (myVendors || []).map((vendor) => ({
      ...vendor,
      isSelected: checked,
    }));
    setMyVendors(updatedVendorsList);
  };

  const handleRemoveVendor = async () => {
    toggleRemoveModal();
    setLoading(true);
    const selectedVendors = getSelectedVendors();
    const vendorIds = getVendorIds(selectedVendors);
    const payload = {
      vendorIds: (vendorIds || []).map((id) => Number(id)),
    };
    const response = await removeVendorFromMyVendors(retailerShopId, payload);
    if (response?.status) {
      enqueueSnackbar("Vendor(s) deleted successfully", {
        variant: "success",
      });
      fetchMyVendors();
    } else {
      enqueueSnackbar(response?.message, {
        variant: "error",
      });
    }
    setLoading(false);
  };

  const handlePageChange = (change) => {
    if (change === "next") {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchVendor = async () => {
    setLoading(true);
    const response = await searchVendors(searchStr);
    if (response) {
      enqueueSnackbar("Results fetched successfully", {
        variant: "success",
      });
    } else {
      enqueueSnackbar(response, {
        variant: "error",
      });
    }
    setSearchStr("");
    setLoading(false);
  };

  const getSelectedVendors = () =>
    (myVendors || []).filter((vendor) => vendor?.isSelected);

  const getVendorIds = (selectedVendors = []) =>
    selectedVendors.map((vendor) => vendor?.vendorDetail?.id);

  const allSelected = (myVendors || []).every((vendor) => vendor?.isSelected);

  const selectedVendorNames = (myVendors || [])
    .filter((vendor) => vendor?.isSelected)
    .map((vendor) => vendor?.vendorDetail?.name);

  const offset = (currentPage - 1) * 30;
  const limit = currentPage * 30;
  const noData = !loading && !myVendors?.length;

  if (noData) {
    return (
      <Empty
        message="You haven't added any vendors yet."
        buttonText="Add New Vendor"
      />
    );
  }

  return (
    <div className="w-full">
      <BaseSeo />
      <Box className="h-full px-4 pb-10 lg:px-14">
        <SearchCard
          title="My Vendors"
          onChange={setSearchStr}
          value={searchStr}
          handleSearch={handleSearchVendor}
          placeholder="Search for vendors in My Vendors"
        />
        <Box className={loading ? "hidden" : "py-8 md:py-0"}>
          <Box className="flex justify-between items-center w-full mb-6">
            <RemoveVendor
              toggleRemoveModal={toggleRemoveModal}
              handleSelectAll={handleSelectAll}
              allSelected={allSelected}
              disabled={selectedVendorNames.length === 0}
            />
            <Pagination
              pageInfo={pagination}
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          </Box>
          <Stack direction="column" spacing={2}>
            {(myVendors || []).slice(offset, limit).map((vendor) => (
              <>
                <VendorCardSmall
                  vendor={vendor}
                  key={vendor?.vendorDetail?.id}
                  handleSelectVendor={handleSelectVendor}
                />
                <VendorCard
                  vendor={vendor}
                  key={vendor?.vendorDetail?.id}
                  handleSelectVendor={handleSelectVendor}
                />
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
      </Box>
      <RemoveModal
        title="Remove vendor"
        message="Are you sure you want to remove the following from the list"
        products={selectedVendorNames}
        showModal={showRemoveModal}
        onClose={toggleRemoveModal}
        onRemove={handleRemoveVendor}
      />
      <Box className={loading ? "w-full flex justify-center" : "hidden"}>
        <CircularProgress />
      </Box>
    </div>
  );
}

export default MyVendorsPage;

MyVendorsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
