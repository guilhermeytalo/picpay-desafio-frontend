export interface CreatePayment {
    name: string;
    username: string;
    title: string;
    value: number;
    date: string;
}

export interface Payment extends CreatePayment {
    id: number;
    image: string;
    isPayed: boolean;
}

export type SortDirection = 'asc' | 'desc';

export type PaymentsResponse = Payment[];
export interface PaymentsHeaderItem {
    title: string;
    value: string;
    sort: SortDirection;
}

export type PaymentsHeader = PaymentsHeaderItem[];

export interface PaymentsDetails {
    pageNumberOptions: number[];
    pageSizeOptions: number[];
    header: PaymentsHeader;
}
