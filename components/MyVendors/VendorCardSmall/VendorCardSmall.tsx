import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";

import { B2B_SHOP_URL } from "@/lib/const";

import { getBanner, isValidURL } from "../../../lib/util";
import { ImageWarpper, VendorPaper } from "./VendorCardSmall.style";

interface fieldType {
  name: string;
  values: string[];
}

interface productType {
  id: string;
}
interface VendorDataTypes {
  vendorDetail: {
    name: string;
    id: string;
    fields: fieldType[];
    products: productType[];
  };
  isSelected: boolean;
}

interface VendorCardSmallPropTypes {
  vendor: VendorDataTypes;
  handleSelectVendor: (vendor: VendorDataTypes, checked: boolean) => void;
}

export function VendorCardSmall({
  vendor,
  handleSelectVendor,
}: VendorCardSmallPropTypes) {
  const { vendorDetail, isSelected } = vendor;
  const { name, fields, products } = vendorDetail;
  const banner = getBanner(fields);
  return (
    <VendorPaper className="w-full block md:hidden">
      <Box className="pb-3">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <FormControl>
              <FormControlLabel
                label=""
                control={
                  <Checkbox
                    checked={isSelected}
                    onChange={(event) =>
                      handleSelectVendor(vendor, event.target.checked)
                    }
                  />
                }
              />
            </FormControl>
            <Typography variant="body1" className="text-sm">
              {name}
            </Typography>
          </Stack>
          <Link
            passHref
            href={`${B2B_SHOP_URL}/default-channel/en-US/vendor/${name}`}
            target="_blank"
          >
            <Typography variant="body1" className="blue-color cursor-pointer">
              More Products
            </Typography>
          </Link>
        </Stack>
      </Box>
      <Divider />
      <Box className="pt-5">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <ImageWarpper>
            {isValidURL(banner) && (
              <Image
                src={banner}
                layout="intrinsic"
                alt="SHAROVE LOGO"
                width={82}
                height={29}
              />
            )}
          </ImageWarpper>
          <Box>
            <Stack direction="row" spacing={2}>
              <Stack direction="column" alignItems="center" spacing={1}>
                <Typography
                  variant="body1"
                  className="text-sm w-full text-right"
                >
                  Main Category:
                </Typography>
                <Typography
                  variant="body1"
                  className="text-sm w-full text-right"
                >
                  Ready to Ship:
                </Typography>
                <Typography
                  variant="body1"
                  className="text-sm w-full text-right"
                >
                  Dropshipping Products:
                </Typography>
              </Stack>

              <Stack direction="column" alignItems="center" spacing={1}>
                <Typography
                  variant="body1"
                  className="text-sm w-full text-left"
                >
                  Women
                </Typography>
                <Typography
                  variant="body1"
                  className="text-sm w-full text-left"
                >
                  0
                </Typography>
                <Typography
                  variant="body1"
                  className="text-sm w-full text-left"
                >
                  {products?.length || 0}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </VendorPaper>
  );
}
