export interface attributeType {
  attribute: {
    name: string;
  };
  values: Array<{ name: string }>;
}

export interface variantType {
  attributes: Array<attributeType>;
}

export interface UrlType {
  id: string;
  url: string;
}

export interface ChannelListingsType {
  costPrice: {
    amount: number;
  };
  price: {
    amount: number;
  };
}
export interface productType {
  defaultVariant: {
    sku: string;
    pricing: {
      price: {
        gross: {
          amount: number;
          currency: string;
        };
      };
    };
  };
  media: UrlType[];
  thumbnail: {
    url: string;
  };
  description: string;
  id: string;
  slug: string;
  name: string;
  variants: Array<variantType>;
  isSelected: boolean;
  productType?: string;
  category: {
    id: string;
    name: string;
    ancestors: {
      edges: Array<{ id: string; name: string }>;
    };
  };
  metadata: Array<{ key: string; value: string }>;
}
