import axios from "axios";
import dayjs from "dayjs";

import {
  API_URL,
  API_URL_B2C,
  AUTO_SYNC_URL,
  B2B_DEV_TOKEN,
  B2C_DEV_TOKEN,
  ELASTIC_SEARCH_TOKEN,
  ENGINE_NAME,
  ENTERPRISE_SEARCH_BASE_URL,
  LOCAL_API_URL,
} from "@/lib/const";
import { ACCESS_TOKEN } from "@/lib/util";

import { responseHandler } from "./responseHandler";

interface OrdersFuncTypes {
  storeFrontId: string;
  filters?: {
    orderIds: string;
    customer: string;
    statuses: string[];
    returnStatus: string[];
    startDate: string;
    endDate: string;
  };
  paginationInfo?: {
    after: string;
    before: string;
  };
}

export const whoAmI = (token) => {
  const url = `${API_URL}/api/v2/user/whoami`;
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return responseHandler({ method: "get", url, headers });
};

export const getMenuCategories = () => {
  const url = `${API_URL}/api/v1/categories?first=30`;
  return responseHandler({ method: "get", url });
};

export const getNewProducts = (
  category: string,
  after: string,
  retailerShopId: string
) => {
  const url = `${API_URL}/api/v1/products?type=new&first=36&category=${
    category || ""
  }&after=${after || ""}&retailerId=${retailerShopId}`;
  return responseHandler({ method: "get", url });
};

export const getProductsFromElasticSearch = (payload) => {
  const url = `${ENTERPRISE_SEARCH_BASE_URL}/api/as/v1/engines/${ENGINE_NAME}/search`;
  const headers = {
    headers: {
      Authorization: `Bearer ${ELASTIC_SEARCH_TOKEN}` || "",
    },
  };
  return responseHandler({ method: "post", url, payload, headers });
};

export const getOrders = ({
  storeFrontId,
  filters,
  paginationInfo,
}: OrdersFuncTypes) => {
  const { after, before } = paginationInfo || {};
  const { orderIds, customer, statuses, startDate, endDate } = filters || {};

  let url = `${API_URL_B2C}/api/v1/orders/list/shop/${storeFrontId}`;
  if (after) {
    url += `?first=30&after=${after || ""}`;
  } else if (before) {
    url += `?last=30&before=${before || ""}`;
  } else {
    url += "?first=30";
  }

  if (orderIds) {
    url += `&orderIds=${orderIds}`;
  }

  if (customer) {
    url += `&customer=${customer}`;
  }

  if (statuses?.length) {
    url += `&statuses=${statuses}`;
  }

  if (startDate) {
    url += `&startDate=${dayjs(startDate).format("YYYY-MM-DD")}`;
  }

  if (endDate) {
    url += `&endDate=${dayjs(endDate).format("YYYY-MM-DD")}`;
  }

  return responseHandler({ method: "get", url });
};

export const getReturnedOrders = ({
  storeFrontId,
  filters,
  paginationInfo,
}: OrdersFuncTypes) => {
  const { after, before } = paginationInfo || {};
  const { orderIds, customer, statuses, startDate, endDate } = filters || {};

  let url = `${API_URL_B2C}/api/v1/orders/returns?shopId=${storeFrontId}`;
  if (after) {
    url += `&first=30&after=${after || ""}`;
  } else if (before) {
    url += `&last=30&before=${before || ""}`;
  } else {
    url += "&first=30";
  }

  if (orderIds) {
    url += `&orderIds=${orderIds}`;
  }

  if (customer) {
    url += `&customer=${customer}`;
  }

  if (statuses?.length) {
    url += `&returnStatus=${statuses}`;
  }

  if (startDate) {
    url += `&startDate=${dayjs(startDate).format("YYYY-MM-DD")}`;
  }

  if (endDate) {
    url += `&endDate=${dayjs(endDate).format("YYYY-MM-DD")}`;
  }

  url += "&isStaffReturn=false";

  return responseHandler({ method: "get", url });
};

export const getOrdersReport = (storeFrontId) => {
  const url = `${API_URL_B2C}/api/v1/orders/report/${storeFrontId}`;
  return responseHandler({ method: "get", url });
};

export const getMyProducts = (
  retailerShopId: string,
  params?: {
    after: string;
    before: string;
  },
  searchStr?: string
) => {
  const { after, before } = params || {};
  let url = `${API_URL}/api/v1/shop/my/products/${retailerShopId}?search=${
    searchStr || ""
  }`;
  if (after) {
    url += `&first=30&after=${after || ""}`;
  } else if (before) {
    url += `&last=30&before=${before || ""}`;
  } else {
    url += "&first=30";
  }
  return responseHandler({ method: "get", url });
};

export const editMyProducts = (payload) => {
  const url = `${API_URL}/api/v1/shop/my/products/update`;
  const headers = {
    headers: {
      Authorization: B2C_DEV_TOKEN || ACCESS_TOKEN,
    },
  };
  return responseHandler({ method: "put", url, payload, headers });
};

export const searchProducts = () => {
  const url = `${API_URL}/api/v1/shop/my/products`;
  return responseHandler({ method: "get", url });
};

export const removeFromMyProduct = async (payload) => {
  const url = `${API_URL_B2C}/api/v1/shop/my/products`;
  const headers = {
    headers: {
      Authorization: B2C_DEV_TOKEN || ACCESS_TOKEN,
    },
  };
  return responseHandler({
    method: "delete",
    url,
    headers,
    payload,
  });
};

export const getProductB2CId = (productId, retailerShopId) => {
  const url = `${API_URL}/api/v1/products?type=new&first=1&productIds=${productId}&retailerId=${retailerShopId}`;
  return responseHandler({ method: "get", url });
};

export const addVendorToMyVendors = (retailerShopId, payload) => {
  const url = `${API_URL}/api/v1/shop/my/vendors/${retailerShopId}`;
  const headers = {
    headers: {
      Authorization: ACCESS_TOKEN,
    },
  };
  return responseHandler({ method: "post", url, payload, headers });
};

export const getMyVendors = (retailerShopId) => {
  const url = `${API_URL}/api/v1/shop/my/vendors/${retailerShopId}`;
  return responseHandler({ method: "get", url });
};

export const getAllVendors = () => {
  const url = `${API_URL}/api/v1/shops/ids?quantity=${25}`;
  return responseHandler({ method: "get", url });
};

export const getVendorId = (productIds) => {
  const url = `${API_URL}/api/v2/shop/id?productIds=${productIds.join(
    "&productIds="
  )}`;
  return responseHandler({ method: "get", url });
};

export const searchVendors = () => {
  const url = `${API_URL}/product/list/Q2F0ZWdvcnk6MTc=`;
  return responseHandler({ method: "get", url });
};

export const removeVendorFromMyVendors = (retailerShopId, payload) => {
  const url = `${API_URL}/api/v1/shop/my/vendors/${retailerShopId}`;
  const headers = {
    headers: {
      Authorization: B2C_DEV_TOKEN || ACCESS_TOKEN,
    },
  };
  return responseHandler({ method: "delete", url, headers, payload });
};

export const getStoreInfo = (storeFrontId) => {
  const url = `${API_URL}/api/v2/shop?id=${storeFrontId}&isB2c=true`;
  return responseHandler({ method: "get", url });
};

export const getRetailerBankInfo = (retailerShopId) => {
  const url = `${API_URL}/api/v1/shop/bank/${retailerShopId}`;
  const headers = {
    headers: {
      Authorization: B2B_DEV_TOKEN || ACCESS_TOKEN,
    },
  };
  return responseHandler({ method: "get", url, headers });
};

export const saveStoreBankInfo = (retailerShopId, payload) => {
  const url = `${API_URL}/api/v1/shop/bank/${retailerShopId}`;
  const headers = {
    headers: {
      Authorization: B2B_DEV_TOKEN || ACCESS_TOKEN,
    },
  };
  return responseHandler({ method: "post", url, payload, headers });
};

export const updateStoreInfo = (retailerShopId, payload) => {
  const url = `${API_URL_B2C}/api/v2/shop?shopId=${retailerShopId}`;
  const headers = {
    headers: {
      Authorization: B2C_DEV_TOKEN || ACCESS_TOKEN,
    },
  };
  return responseHandler({ method: "put", url, payload, headers });
};

export const createStorefront = (retailerShopId, payload) => {
  const url = `${API_URL}/api/v1/store/create/${retailerShopId}`;
  const headers = {
    headers: {
      Authorization: B2B_DEV_TOKEN || ACCESS_TOKEN,
    },
  };
  return responseHandler({ method: "post", url, payload, headers });
};

export const getFileUrl = (file) => {
  const url = `${API_URL}/api/v1/store/image/upload`;
  const formdata = new FormData();
  formdata.append("store_img", file);
  return axios
    .post(url, formdata, {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: ACCESS_TOKEN,
      },
    })
    .then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        return response?.data?.data;
      }
      return {
        data: {
          results: [],
        },
      };
    })
    .catch((error) => {
      const errorMessage = error?.response?.data?.message;
      if (errorMessage) {
        return errorMessage;
      }
      return "Something went wrong";
    });
};

export const getSalesReport = (storeFrontId) => {
  const url = `${API_URL_B2C}/api/v1/payments/sales/${storeFrontId}`;
  return responseHandler({ method: "get", url });
};

export const getPurchaseHistory = (storeFrontId) => {
  const url = `${API_URL_B2C}/api/v1/payments/purchases/${storeFrontId}`;
  return responseHandler({ method: "get", url });
};

export const getTransactionHistory = (storeFrontId) => {
  const url = `${API_URL_B2C}/api/v1/payments/transactions/${storeFrontId}`;
  return responseHandler({ method: "get", url });
};

export const getAccountStripeLoginLink = (accountId) => {
  const url = `${LOCAL_API_URL}/api/account/login/${accountId}`;
  return responseHandler({ method: "get", url });
};

export const createStripeAccount = () => {
  const url = `${LOCAL_API_URL}/api/account/create`;
  return responseHandler({ method: "get", url });
};

export const getStripeOnboardingLoginLink = (accountId, payload) => {
  const url = `${LOCAL_API_URL}/api/account/onboarding/${accountId}`;
  return responseHandler({ method: "post", url, payload });
};

export const getStripeAccountDetails = (accountId: string) => {
  const url = `${LOCAL_API_URL}/api/account/retrieve/${accountId}`;
  return responseHandler({ method: "get", url });
};

export const pushToStore = (payload) => {
  const url = `${API_URL}/api/v1/store/push`;
  const headers = {
    headers: {
      Authorization: B2B_DEV_TOKEN || ACCESS_TOKEN,
    },
  };
  return responseHandler({ method: "post", url, headers, payload });
};

export const autoSyncProducts = (
  categoryIds: Array<string>,
  shopId: string,
  storeId: string
) => {
  const payload = {
    categoryIds,
    shopId,
    storeId,
  };
  const url = `${AUTO_SYNC_URL}/api/v1/auto/sync`;

  return responseHandler({ method: "post", url, payload });
};

export const getAutoSyncCategories = (shopId: string) => {
  const url = `${API_URL}/api/v1/categories/sync/${shopId}?first=10&categoryLevel=0`;

  return responseHandler({ method: "get", url });
};
