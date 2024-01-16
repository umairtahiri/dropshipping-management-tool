import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Image from "next/legacy/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { B2B_SHOP_URL } from "@/lib/const";
import { DEFAULT_CHANNEL, DEFAULT_LOCALE } from "@/lib/regions";

import { RootState } from "../../../lib/redux/store";
import {
  getMetaValue,
  getPriceFromVariant,
  getUniqueAttributes,
  replaceImageUrl,
} from "../../../lib/util";
import { EditProductDrawer } from "../EditProductDrawer/EditProductDrawer";
import { productType } from "../product.type";

interface valuesTypes {
  name: string;
  description: string;
  category: string;
}

interface MyProductCardPropTypes {
  data: productType;
  handleSaveChanges: (
    id: string,
    values: valuesTypes,
    removeMediaIds: string[]
  ) => void;
  addToMyVendors: (id: string) => void;
  handleRemoveSingleProduct: (id: string) => void;
  handleSelectProduct: (data: productType, checked: boolean) => void;
}

export function MyProductCard({
  data,
  addToMyVendors,
  handleSaveChanges,
  handleSelectProduct,
  handleRemoveSingleProduct,
}: MyProductCardPropTypes) {
  const { name: storeFrontName } = useSelector(
    (state: RootState) => state?.retailer?.storeFront
  );

  const STOREFRONT_URL: string = useSelector(
    (state: RootState) => state?.retailer?.storeFront?.url
  );

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const {
    id,
    slug,
    defaultVariant,
    media = [],
    name,
    variants = [],
    isSelected,
    category,
    metadata,
  } = data;
  const { name: categoryName } = category;

  const { pricing: { price: { gross: { amount = 0 } = {} } = {} } = {} } =
    defaultVariant || {};
  const costPrice = getPriceFromVariant(defaultVariant);

  const colorVariants = getUniqueAttributes(variants, "color");
  const sizeVariants = getUniqueAttributes(variants, "size");
  const imgUrl = replaceImageUrl(media[0]?.url || "");
  const vendorId = getMetaValue(metadata, "vendorId");
  const vendorName = getMetaValue(metadata, "vendorName");

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <Box className="bg-white px-5 hidden md:block">
      <Stack
        direction="row"
        justifyContent="space-between"
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
                  onChange={(event) =>
                    handleSelectProduct(data, event.target.checked)
                  }
                />
              }
            />
          </FormControl>
          <Typography variant="body2" className="capitalize">
            {(storeFrontName || "").toLowerCase()}
          </Typography>
        </Stack>
        <Box className="flex gap-x-2.5 items-center">
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
            <Box className="text-[#333]">
              <Typography
                className="underline text-sm cursor-pointer"
                component="div"
              >
                View Original Details
              </Typography>
            </Box>
          </Link>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip title="Add vendor to my vendors" placement="top">
              <Box
                className="flex items-center gap-x-2 cursor-pointer"
                onClick={() => addToMyVendors(vendorId)}
              >
                <PersonOutlinedIcon />
                <Typography variant="body2" className="capitalize">
                  {(vendorName || "").toLowerCase()}
                </Typography>
              </Box>
            </Tooltip>
            <Divider orientation="vertical" flexItem className=" bg-black" />
            <MoreHorizOutlinedIcon
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              className="cursor-pointer"
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => handleRemoveSingleProduct(id)}>
                Delete
              </MenuItem>
            </Menu>
          </Stack>
        </Box>
      </Stack>
      <Divider />
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={2}
        className="py-5 my-1.5"
      >
        <Stack direction="row" spacing={2}>
          <Stack direction="column" alignItems="center" spacing={1}>
            <Box className="w-[85px] h-[127px]">
              {imgUrl && (
                <Image
                  src={imgUrl}
                  alt=""
                  width={85}
                  height={127}
                  className="ml-3 rounded-sm"
                />
              )}
            </Box>
            <Typography variant="caption" component="div">
              {media.length} Images
            </Typography>
          </Stack>
          <Box>
            <Typography variant="body1" className="mb-6 capitalize">
              {(name || "").toLocaleLowerCase()}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Typography variant="body1" className="w-36">
                Variants:
              </Typography>
              <Typography variant="body1" className="font-semibold">
                {variants.length}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="body1" className="w-36">
                Main Category:
              </Typography>
              <Typography variant="body1" className="font-semibold capitalize">
                {categoryName.toLocaleLowerCase()}
              </Typography>
            </Stack>
            {/* NOTE: Will be used later */}
            {/* <Stack direction="row" spacing={1}>
              <Typography variant="body1" className="w-36">
                Collection:
              </Typography>
              <Typography variant="body1" className="font-semibold">
                {getCollection(extractNodes(ancestors?.edges))}
              </Typography>
            </Stack> */}
            <Stack direction="row" spacing={1}>
              <Typography variant="body1" className="w-36" component="div">
                Sizes:
              </Typography>
              <Box>
                <Typography
                  variant="body1"
                  className="font-semibold"
                  component="div"
                >
                  {sizeVariants.join(", ")}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="body1" className="w-36" component="div">
                Color:
              </Typography>
              <Typography
                variant="body1"
                className="font-semibold"
                component="div"
              >
                {colorVariants.join(", ")}
              </Typography>
            </Stack>
          </Box>
        </Stack>
        <Box>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Typography variant="body1" className="w-36">
              Price:
            </Typography>
            <Typography variant="body1" className="font-semibold">
              ${costPrice}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Typography variant="body1" className="font-semibold">
              Suggested Resale Price:
            </Typography>
            <Typography variant="body1" className="font-semibold">
              ${amount}
            </Typography>
          </Stack>
        </Box>
      </Stack>
      <Divider />
      <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-end"
        className="py-5 my-0.5"
      >
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={toggleDrawer}
        >
          Edit Product
        </Button>
        <Link
          href={`https://${STOREFRONT_URL}/default-channel/en-US/product/?id=${id}`}
          target="_blank"
        >
          <Button variant="contained" color="primary" disableElevation>
            View on Store
          </Button>
        </Link>
      </Stack>
      <EditProductDrawer
        product={data}
        open={openDrawer}
        toggleDrawer={toggleDrawer}
        handleSaveChanges={(values, removeMediaIds) =>
          handleSaveChanges(data?.id, values, removeMediaIds)
        }
      />
    </Box>
  );
}
