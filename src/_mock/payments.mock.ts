import { Payment } from '@/features/payments/models/payments.model';

export const paymentMock: Payment = { id: 1, title: 'title', isPayed: true, image: '', name: 'Teste', username: 'Teste', value: 20, date: '2021-01-28T14:01:29Z' };

export const paymentsMock: Payment[] = [
    paymentMock,
    { ...paymentMock, id: 2, name: 'John', title: 'title 2' },
    { ...paymentMock, id: 3, name: 'Marie', title: 'title 3' },
    { ...paymentMock, id: 4, name: 'Fredie', title: 'title 4' },
    { ...paymentMock, id: 5, name: 'Marie Johnson', title: 'title 5', isPayed: false },
    { ...paymentMock, id: 6, name: 'To Test Edition', title: 'title 5', isPayed: false }
];
