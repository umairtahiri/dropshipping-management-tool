import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

import { colorsList } from "@/lib/colorsList";
import type { RootState } from "@/lib/redux/store";
import { getUniqueColorCodes } from "@/lib/util";

import {
  BorderedColorOption,
  Card,
  ColorOption,
  ColorOptionsContainer,
  Info,
  Label,
  ProductCost,
  ProductDescription,
  ProductImage,
  ProductItem,
  ProductName,
  ResalePrice,
} from "./ProductCard.style";
import { ProductCardProps } from "./ProductCardInterface";

/**
 * Single product card component
 * @param product  The product object
 */

export function ProductCard({
  product,
  loading,
  pushToStore,
}: ProductCardProps) {
  const STOREFRONT_URL: string = useSelector(
    (state: RootState) => state?.retailer?.storeFront?.url
  );

  const {
    name,
    description,
    imgUrl,
    costPrice,
    resalePrice,
    colors,
    b2cProductId,
  } = product;

  const IS_B2C_PRODUCT = Boolean(b2cProductId);

  const renderColorOptions = () => {
    const colorPalettes = getUniqueColorCodes(colors);

    return (colorPalettes || []).map((color: string) =>
      color === "#ffffff" ? (
        <BorderedColorOption />
      ) : (
        <ColorOption color={color || colorsList.multi} />
      )
    );
  };

  return (
    <ProductItem className="relative bg-white">
      <Card>
        {imgUrl ? (
          <ProductImage src={imgUrl} className="main-image" alt="image" />
        ) : (
          <div className="grid justify-items-center content-center h-[322px] 3md:h-[274px] w-full">
            <PermMediaOutlinedIcon className="h-10 w-10 content-center" />
          </div>
        )}
        <Info>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="flex-start"
            className="h-full"
          >
            <div className="w-full">
              <ColorOptionsContainer>
                {renderColorOptions()}
              </ColorOptionsContainer>

              <ProductName className="text-xs capitalize xl:text-sm">
                {name.toLocaleLowerCase()}
              </ProductName>
              <ProductDescription className="text-xs capitalize xl:text-sm">
                {(description || "").substring(0, 50).toLocaleLowerCase()}
              </ProductDescription>
            </div>
            <div className="w-full">
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Label>Product Cost:</Label>
                <ProductCost>${costPrice}</ProductCost>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Label>Suggested Resale Price:</Label>
                <ResalePrice>${resalePrice}</ResalePrice>
              </Grid>
            </div>
            {IS_B2C_PRODUCT ? (
              <Link
                href={`https://${STOREFRONT_URL}/default-channel/en-US/product/?id=${b2cProductId}`}
                target="_blank"
                className="w-full"
              >
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={
                    <VisibilityOutlinedIcon className="text-sm md:text-base" />
                  }
                  className="px-2 py-3 text-xs sm:text-sm md:text-base"
                  disableElevation
                >
                  View on Store
                </Button>
              </Link>
            ) : (
              <LoadingButton
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  pushToStore();
                }}
                fullWidth
                className="px-2 py-3 text-xs sm:text-sm md:text-base"
                startIcon={<AddBusinessOutlinedIcon className="text-base" />}
                loading={loading}
                variant="outlined"
              >
                Push To Store
              </LoadingButton>
            )}
          </Grid>
        </Info>
      </Card>
    </ProductItem>
  );
}
