// Type definitions for exaconnect-node-sdk
// Project: exaconnect-node-sdk
// Definitions by: Kevin Rambaud <https://twitter.com/kevinrambaud>

export interface IConfiguration {
  schema: string;
  hostname: string;
  port: string;
  readonly sdkVersion: string;
}

export interface IOptions {
  schema: string;
  hostname: string;
  port: string;
}

export interface IGetTokenRequest {
  username: string;
  password: string;
}

export interface ICancelOrderRequest {
  token: string;
  order: {
    orderId: number;
    reason: string;
  };
}

export interface ICreateOrderRequest {
  token: string;
  order: {
    reference: string;
    product: string;
    quantity: number;
    openedFormatLength: string;
    openedFormatWidth: string;
    closedFormatLength: string;
    closedFormatWidth: string;
    comment: string;
    address: {
      contactName: string;
      line1: string;
      line2: string;
      line3: string;
      doorCode: string;
      mail: string;
      phone: string;
      mobile: string;
      city: string;
      zipCode: string;
      country: string;
      comment: string;
    };
  };
}

export interface ICreateOrderResponse {
  orderPrices: {
    productPriceExcludingTax: number;
    productVatRate: number;
    totalPriceExcludingTax: number;
    totalAllTaxesIncludedPrice: number;
  };
  orderId: number;
}

export interface ICreateOrderFromPartnerOrderRequest {
  token: string;
  order: {
    reference: string;
    partnerOrderId: number;
    comment: string;
    address: {
      contactName: string;
      line1: string;
      line2: string;
      line3: string;
      doorCode: string;
      mail: string;
      phone: string;
      mobile: string;
      city: string;
      zipCode: string;
      country: string;
      comment: string;
    };
  };
}

export interface ICreateOrderFromPartnerOrderResponse extends ICreateOrderResponse { }

export interface IGetOrderStatusRequest {
  token: string;
  orders: number[];
}

export interface IGetOrderStatusResponse {
  code: number;
  orderId: number;
}

export interface IGetOrdersRequest {
  token: string;
  dateFilterMin: string;
  dateFilterMax: string;
  statusFilter: number;
  page: number;

}

export interface IGetOrder {
  id: number;
  status: number;
}

export interface IGetOrdersResponse {
  orders: IGetOrder[];
  page: number;
  remainingRecords: boolean;
}

export interface ISetOrderStateAsFileTransferredRequest {
  token: string;
  orders: number[];
}

export interface ISetOrderStateAsFileTransferredResponse {
  orderId: number;
  success: boolean;
}

export interface IClient {
  cancelOrder(request: ICancelOrderRequest): Promise<boolean>;

  createOrder(request: ICreateOrderRequest): Promise<ICreateOrderResponse>;

  createOrderFromPartnerOrder(
    request: ICreateOrderFromPartnerOrderRequest,
  ): Promise<ICreateOrderFromPartnerOrderResponse>;

  getOrderStatus(request: IGetOrderStatusRequest): Promise<IGetOrderStatusResponse[]>;

  getOrders(request: IGetOrdersRequest): Promise<IGetOrdersResponse>;

  getToken(request: IGetTokenRequest): Promise<string>;

  setOrderStateAsFileTransferred(
    request: ISetOrderStateAsFileTransferredRequest,
  ): Promise<ISetOrderStateAsFileTransferredResponse[]>;
}

export let configuration: IConfiguration;

export function configure(options: IOptions): IConfiguration;

export function createClient(): Promise<IClient>;
