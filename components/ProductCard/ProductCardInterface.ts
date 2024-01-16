export interface AttributeTypes {
  attribute: {
    name: string;
  };
  values: Array<{ name: string }>;
}

export interface VariantTypes {
  attributes: Array<AttributeTypes>;
}

export interface UrlType {
  url: string;
}

export interface ProductCardType {
  id: string;
  slug: string;
  name: string;
  description: string;
  imgUrl: string;
  costPrice: number;
  resalePrice: number;
  colors: string[];
  b2cProductId: string;
  thumbnail?: {
    url: string;
  };
  isSelected?: boolean;
  collection?: string;
  productType?: string;
  category: {
    name: string;
    ancestors: {
      data: Array<{ id: string; name: string }>;
    };
  };
}

export interface ProductCardProps {
  product: ProductCardType;
  loading?: boolean;
  pushToStore: () => void;
}
