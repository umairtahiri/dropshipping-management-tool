// @ts-nocheck
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

import { PopoverConfirm } from "@/components";
import { B2B_SHOP_URL } from "@/lib/const";
import { DEFAULT_CHANNEL, DEFAULT_LOCALE } from "@/lib/regions";

import { RootState } from "../../../lib/redux/store";
import {
  getMetaValue,
  getPriceFromVariant,
  replaceImageUrl,
} from "../../../lib/util";
import { productType } from "../product.type";

interface ProductCardSmallPropTypes {
  data: productType;
  addToMyVendors: (id: string) => void;
  handleSelectProduct?: (data: productType, checked: boolean) => void;
  handleRemoveSingleProduct?: (id: string) => void;
}

export function ProductCardSmall({
  data,
  addToMyVendors,
  handleSelectProduct,
  handleRemoveSingleProduct,
}: ProductCardSmallPropTypes) {
  const STOREFRONT_URL: string = useSelector(
    (state: RootState) => state?.retailer?.storeFront?.url
  );

  const { name: storeFrontName } = useSelector(
    (state: RootState) => state?.retailer?.storeFront
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const open = Boolean(anchorEl);
  const eleID = open ? "simple-popover" : undefined;

  const handleShowPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    defaultVariant,
    media = [],
    name,
    variants = [],
    isSelected,
    category,
    slug,
    id,
    metadata,
  } = data;
  const { name: categoryName } = category;

  const { pricing: { price: { gross: { amount = 0 } = {} } = {} } = {} } =
    defaultVariant || {};
  const costPrice = getPriceFromVariant(defaultVariant);
  const vendorId = getMetaValue(metadata, "vendorId");

  return (
    <Box className="bg-white px-5 block md:hidden">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        className="py-2.5"
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <FormControl>
            <FormControlLabel
              label=""
              control={
                <Checkbox
                  checked={isSelected}
                  onChange={(event) => {
                    if (handleSelectProduct) {
                      handleSelectProduct(data, event.target.checked);
                    }
                  }}
                />
              }
            />
          </FormControl>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" component="div" className="capitalize">
              {(storeFrontName || "").toLowerCase()}
            </Typography>
            <Tooltip title="Add vendor to my vendors" placement="top">
              <PersonAddAltOutlinedIcon
                className="default-black-color"
                onClick={() => addToMyVendors(vendorId)}
              />
            </Tooltip>
          </Stack>
        </Stack>
        <Link
          passHref
          href={{
            pathname:
              `${B2B_SHOP_URL}/${DEFAULT_CHANNEL.slug}/${DEFAULT_LOCALE}/products/${slug}` as const,
            query: {
              id,
            },
          }}
          target="_blank"
        >
          <VisibilityIcon className="default-black-color" />
        </Link>
      </Stack>
      <Divider />
      <Stack direction="row" spacing={2} className="py-5 my-1.5">
        <Box className="ml-3 rounded-sm w-[88px] h-[132px]">
          <Image
            src={replaceImageUrl(media[0]?.url || "")}
            alt=""
            layout="intrinsic"
            width={88}
            height={132}
            className="rounded-sm"
          />
        </Box>
        <Box className="w-full">
          <Typography variant="body1" component="div" className="capitalize">
            {(name || "").toLocaleLowerCase()}
          </Typography>
          <Divider className="my-3" />
          <Stack direction="row" spacing={1}>
            <Typography
              variant="body1"
              className="text-sm w-52"
              component="div"
            >
              Variants:
            </Typography>
            <Typography variant="body1" className="text-sm" component="div">
              {variants.length}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography
              variant="body1"
              className="text-sm w-52"
              component="div"
            >
              Main Category:
            </Typography>
            <Typography
              variant="body1"
              className="text-sm capitalize"
              component="div"
            >
              {categoryName.toLocaleLowerCase()}
            </Typography>
          </Stack>
          <br />
          <Stack direction="row" spacing={1}>
            <Typography
              variant="body1"
              className="text-sm w-52"
              component="div"
            >
              Price:
            </Typography>
            <Typography variant="body1" className="text-sm" component="div">
              ${costPrice}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="h6" className="w-52">
              Suggested Resale Price:
            </Typography>
            <Typography variant="h6" component="div">
              ${amount}
            </Typography>
          </Stack>
        </Box>
      </Stack>
      <Divider />
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        className="py-5 my-0.5"
      >
        <DeleteIcon
          id={eleID}
          className="cursor-pointer"
          onClick={handleShowPopover}
        />
        <PopoverConfirm
          handleClose={handleClose}
          anchorEl={anchorEl}
          handleDelete={() => {
            handleRemoveSingleProduct(id);
            handleClose();
          }}
          id={eleID}
          open={open}
        />
        <Link
          href={`https://${STOREFRONT_URL}/default-channel/en-US/product/?id=${id}`}
          target="_blank"
        >
          <Button variant="contained" color="primary" disableElevation>
            View on Store
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}
