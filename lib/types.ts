export interface APIResponseType {
  status: boolean;
  data?: any;
  message?: string | undefined;
}

export interface FieldTypes {
  name: string;
  values: string[];
}

export interface RetailerShopTypes {
  id: string;
  name: string;
  about: string;
  description: string;
  madeIn: string;
  minOrder: number;
  url: string;
  returnPolicy: string;
  storePolicy: string;
  fields: FieldTypes[];
}

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

export interface ProductCardTypes {
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

export interface MenuTypes {
  id: string;
  name: string;
  slug: string;
}

export interface OrdersReportTypes {
  ordersCancelled: number;
  ordersProcessing: number;
  ordersReturnsRequested: number;
  ordersShipped: number;
  totalEarnings: number;
}

export interface CategoryTypes {
  id: string;
  name: string;
}

// PropTypes For Components

export interface LayoutPropTyes {
  children?: React.ReactNode;
}

export interface TopHeaderPropTypes {
  toggleDrawer?: () => void;
  toggleSearchDrawer: () => void;
}

export interface DropShippingSideBarMobileViewPropTypes {
  showSideBar: boolean;
  toggleDrawer: () => void;
}

export interface SearchDrawerPropTypes {
  showSideBar: boolean;
  toggleDrawer?: () => void;
}

export interface UsersDashboardPropTypes {
  ordersReport: OrdersReportTypes;
}

export interface ProductCardProps {
  product: ProductCardTypes;
  loading?: boolean;
  pushToStore: () => void;
}

export interface CategoryChipsPropTypes {
  handleSelectCategory: (id: string) => void;
  activeCategory: string;
  menus: MenuTypes[] | any;
}

export interface ProductSkeletonPropTypes {
  itemTotal: number;
}

export interface ProductCollectionPropTypes {
  products: ProductCardTypes[];
  idsForPushToStore?: string[];
  pushToStore: (id: string) => void;
}

export interface WebSocketTypes {
  categoryId: string;
  client: string;
  eventId: string;
  imported: number;
  shopId: string;
  storeId: string;
  totalProducts: number;
}

export interface CategoryInterface {
  checked: boolean;
  id: string;
  name: string;
  products: {
    totalCount: number;
  };
  sync: boolean;
}

export interface AutoSyncResponseInterface {
  eventId: string;
  categoryId: string;
}
