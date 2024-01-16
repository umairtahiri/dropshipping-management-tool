import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";

import { B2B_SHOP_URL } from "@/lib/const";

import { getBanner, isValidURL } from "../../../lib/util";
import { ImageWarpper, VendorPaper } from "./VendorCard.style";

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

interface VendorCardPropTypes {
  vendor: VendorDataTypes;
  handleSelectVendor: (vendor: VendorDataTypes, checked: boolean) => void;
}

export function VendorCard({
  vendor,
  handleSelectVendor,
}: VendorCardPropTypes) {
  const { vendorDetail, isSelected } = vendor;
  const { name, fields, products } = vendorDetail;
  const logo = getBanner(fields);
  return (
    <VendorPaper className="w-full hidden md:block">
      <Box className="pb-3">
        <Grid container>
          <Grid item xs={5}>
            <Typography variant="h6">Vendor Name</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">Main Category</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">Ready to ship</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">Dropshipping Products</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h6">Action</Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box className="pt-5">
        <Grid container>
          <Grid item xs={5} className="flex items-center">
            <Stack direction="row" spacing={3} alignItems="center">
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
              <ImageWarpper>
                {isValidURL(logo) && (
                  <Image
                    src={logo}
                    layout="intrinsic"
                    alt="SHAROVE LOGO"
                    width={105}
                    height={38}
                  />
                )}
              </ImageWarpper>
              <Typography variant="h6">{name}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={2} className="flex items-center">
            <Typography variant="body1">Women</Typography>
          </Grid>
          <Grid item xs={2} className="flex items-center">
            <Typography variant="body1">{products?.length || 0}</Typography>
          </Grid>
          <Grid item xs={2} className="flex items-center">
            <Typography variant="body1">{products?.length || 0}</Typography>
          </Grid>
          <Grid item xs={1} className="flex items-center">
            <Link
              passHref
              href={`${B2B_SHOP_URL}/default-channel/en-US/vendor/${name}`}
              target="_blank"
            >
              <Typography variant="body1" className="blue-color cursor-pointer">
                View More Products
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </VendorPaper>
  );
}
