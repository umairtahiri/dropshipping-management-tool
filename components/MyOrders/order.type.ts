export interface orderType {
  id: string;
  number: string;
  shippingAddress: {
    streetAddress1: string;
    streetAddress2: string;
  };
  deliveryMethod: {
    maximumDeliveryDays: number;
    minimumDeliveryDays: number;
    name: string;
  };
  created: string;
  status: string;
  quantity?: number;
  profit?: number;
  lines?: any;
  user: {
    email: string;
    firstName: string;
    id: string;
    lastName: string;
  };
}
