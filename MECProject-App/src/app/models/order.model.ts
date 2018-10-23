export class Order {
    clint_name: number;
    clint_phone: string;
    clint_address: string;
    order_amount: string;
    service_ID: number;
    order_ID: number;
    userId: number;
}

export class OrderView {
    name: string;
    phone: string;
    amount: number;
    address: string;
    service: string;
    trackingId: string;
    shopkeeperName: string
}