import { PaymentsDetails, PaymentsHeader } from '@/features/payments/models/payments.model';

const header: PaymentsHeader = [
    {
        title: 'Usuário',
        value: 'name',
        sort: 'desc'
    },
    {
        title: 'Título',
        value: 'title',
        sort: 'desc'
    },
    {
        title: 'Data',
        value: 'date',
        sort: 'desc'
    },
    {
        title: 'Valor',
        value: 'value',
        sort: 'desc'
    },
    {
        title: 'Pago',
        value: 'isPayed',
        sort: 'desc'
    }
];

const pageSizeOptions = [5, 10, 15, 25, 50];
const pageNumberOptions = [1, 2, 3, 4, 5];

export const paymentsDetailsMock: PaymentsDetails = {
    header,
    pageNumberOptions,
    pageSizeOptions
};
