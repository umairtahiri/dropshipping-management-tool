import Grid from "@mui/material/Grid";
import Link from "next/link";
import React from "react";

import { ProductCard } from "@/components";
import { B2B_SHOP_URL } from "@/lib/const";
import { DEFAULT_CHANNEL, DEFAULT_LOCALE } from "@/lib/regions";
import { ProductCardTypes, ProductCollectionPropTypes } from "@/lib/types";

/**
 * Renders list of products
 * @param products Array of products
 * @param loading Boolean for loading state
 */

export function ProductCollection({
  products,
  pushToStore,
  idsForPushToStore,
}: ProductCollectionPropTypes) {
  return (
    <Grid container spacing={2} justifyContent="center">
      {(products || []).map((product: ProductCardTypes) => {
        const { slug, id } = product;
        const loading = idsForPushToStore?.includes(id);
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
                loading={loading}
                pushToStore={() => pushToStore(id)}
              />
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ProductCollection;
