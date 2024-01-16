import { getCookie } from "cookies-next";

import { colorsList } from "./colorsList";
import { DEFAULT_LOCALE } from "./regions";

export const formatAsMoney = (
  amount = 0,
  currency = "USD",
  locale = DEFAULT_LOCALE
) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);

// Returns true for non nullable values
export function notNullable<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}

export const getUniqueAttributes = (variants, type) => {
  const attributes: Array<string> = [];
  const colorVariants = (variants || []).map((variant) => {
    const colorAttribute = variant?.attributes.find(
      (attr) => (attr?.attribute?.name || "").toLowerCase() === type
    );
    return colorAttribute;
  });
  (colorVariants || []).forEach((t) =>
    (t?.values || []).forEach((c) => {
      if (!(attributes || []).includes(c?.name)) {
        attributes.push(c?.name);
      }
    })
  );

  if (type === "Color") {
    return attributes.map((attribute) =>
      capitalize((attribute || "").toLocaleLowerCase())
    );
  }
  return attributes;
};

export const getDescription = (description) => {
  if (description) {
    const parsedDescription = JSON.parse(description);
    return (parsedDescription?.blocks || []).map((b) => b?.data?.text);
  }
  return [];
};

export const replaceImageUrl = (imgUrl: string) => {
  let url: string;
  if (imgUrl) {
    if (
      imgUrl.includes("_L") ||
      imgUrl.includes("_E") ||
      imgUrl.includes("_Z") ||
      imgUrl.includes("_V")
    ) {
      url = imgUrl.replace(
        "http://localhost:8000/media",
        "https://dc964uidi8qge.cloudfront.net/OSFile/OS/Pictures"
      );
    } else if (imgUrl.includes("http://localhost:8000/media")) {
      url = imgUrl.replace(
        "http://localhost:8000/media",
        "https://dc964uidi8qge.cloudfront.net/OSFile/OS"
      );
    } else {
      url = imgUrl.replace(
        "http://localhost:8000/thumbnail",
        "https://dc964uidi8qge.cloudfront.net/OSFile/OS"
      );
    }
    return url;
  }
};

export const replaceImageUrlForESProducts = (imgUrl: string) => {
  let url: string;
  if (imgUrl) {
    if (imgUrl.includes("ColorSwatch")) {
      url = imgUrl.replace(
        "ec2-3-13-238-104.us-east-2.compute.amazonaws.com",
        "https://dc964uidi8qge.cloudfront.net/OSFile/OS"
      );
    } else {
      url = imgUrl.replace(
        "ec2-3-13-238-104.us-east-2.compute.amazonaws.com",
        "https://dc964uidi8qge.cloudfront.net/OSFile/OS/Pictures"
      );
    }
    return url;
  }
};

export const extractNodes = (edges: any = []) => {
  if (Array.isArray(edges)) {
    return edges.map((edge) => edge?.node);
  }
  return [];
};

export const homePageCategories = [
  "women",
  "shoes",
  "handbags",
  "accessories/jewelry",
  "beauty",
  "kids",
  "men",
];

export const getImageByLabel = (name) => {
  switch (name) {
    case "women":
      return "/slider/7.png";
    case "shoes":
      return "/slider/3.png";
    case "handbags":
      return "/slider/2.png";
    case "accessories/jewelry":
      return "/slider/4.png";
    case "beauty":
      return "/slider/5.png";
    case "kids":
      return "/slider/6.png";
    case "men":
      return "/slider/8.png";
    default:
      return "/slider/1.png";
  }
};

export const getCategoriesForHomePage = (menus: any = []) => {
  if (Array.isArray(menus) && menus.length) {
    return menus.filter((menu: any) =>
      homePageCategories.includes((menu?.name || "").toLowerCase())
    );
  }
  return [];
};

export const getCategoriesForCarousel = (menus: any = []) => {
  if (Array.isArray(menus) && menus.length) {
    return menus
      .filter((menu: any) =>
        homePageCategories.includes((menu?.name || "").toLowerCase())
      )
      .map((menu: any) => ({
        ...menu,
        img: getImageByLabel((menu?.name || "").toLowerCase()),
      }));
  }
  return [];
};

export const getCommission = (variant: any = {}) => {
  const commissionAttr = (variant?.attributes || []).find(
    (attribute) => attribute?.attribute?.name === "Commission"
  );
  return commissionAttr?.values[0]?.name;
};

export const getCollection = (ancestors: any = []) => {
  const collectionList = (ancestors || []).map((category) =>
    capitalize((category?.name || "").toLowerCase())
  );
  return collectionList.join(", ");
};

export function capitalize(str) {
  if (!str) return str;
  let stri = str;
  stri = str.toLowerCase();
  if (typeof stri !== "string") return "";
  return stri.charAt(0).toUpperCase() + stri.slice(1);
}

export const ACCESS_TOKEN = `Bearer ${String(getCookie("access_token") || "")}`;

export const getProductVariantIds = (variants = []) =>
  variants.map((variant: any) => variant?.id);

export const getBanner = (fields: any = []) => {
  const bannerField: any = fields.find(
    (field: any) => field?.name === "banner"
  );
  return (bannerField?.values || [])[0];
};

export const getStatusLabel = (status) => {
  switch (status) {
    case "READY_TO_FULFILL":
      return "Ready To Fulfill";
    case "READY_TO_CAPTURE":
      return "Ready To Capture";
    case "UNFULFILLED":
      return "Unfulfilled";
    case "UNCONFIRMED":
      return "Uncorfirmed";
    case "PARTIALLY_FULFILLED":
      return "Partially Fulfilled";
    case "FULFILLED":
      return "Fulfilled";
    case "RETURNED":
      return "Returned";
    case "PARTIALLY_RETURNED":
      return "Partially Returned";
    default:
      return "Cancelled";
  }
};

/* eslint-disable */
export const isValidURL = (string) => {
  const res = string.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
};
/* eslint-enable */

export const getFieldValues = (fields, key: string) => {
  const fieldObject: any = (fields || []).find(
    (field: any) => field?.name === key
  );
  return (fieldObject?.values || [])[0];
};

export const getPriceFromVariant = (variant: any) => {
  const costPriceAttribute = (variant?.attributes || []).find(
    (attribute) => attribute?.attribute?.name === "Cost Price"
  );
  return costPriceAttribute?.values[0]?.name;
};

export const getResalePriceFromVariant = (variant: any) => {
  const resalePriceAttribute = (variant?.attributes || []).find(
    (attribute) => attribute?.attribute?.name === "Resale Price"
  );
  return resalePriceAttribute?.values[0]?.name;
};

/* eslint-disable */
export const parseResult = (results = []) =>
  results.map((item: any) => {
    (Object.keys(item || {}) || []).forEach((i) => (item[i] = item[i]?.raw));
    return item;
  });
/* eslint-enable */

export const getUniqueColorCodes = (colors) =>
  (
    (colors || []).map((color: string) => {
      const productColor =
        colorsList[color.toLowerCase().replace("/clear", "")];
      return productColor || colorsList.multi;
    }) || []
  ).filter((value, index, self) => self.indexOf(value) === index);

export const parseResponseFromES = (products) =>
  products.map((product) => {
    const {
      name,
      description,
      color_names,
      default_variant_image,
      default_variant_cost,
      channel_prices,
      id,
      slug,
      thumbnail,
    } = product || {};
    const imgUrl = (default_variant_image || thumbnail || "").replace(
      "ec2-3-13-238-104.us-east-2.compute.amazonaws.com",
      "https://dc964uidi8qge.cloudfront.net/OSFile/OS"
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

export const capitizedText = (str: string) => {
  const stringValue = str?.charAt(0)?.toUpperCase() + str?.slice(1);
  return stringValue;
};

export const getMetaValue = (metadata, key) => {
  const field = metadata.find((meta) => meta?.key === key);
  return field?.value;
};
