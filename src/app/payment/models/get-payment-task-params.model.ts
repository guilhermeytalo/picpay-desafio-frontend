import { DefaultListParams } from '@app/shared/models/default-list-params.model';
import { PaymentTaskFilter } from './payment-task-filter.model';

export interface GetPaymentTaskParams extends DefaultListParams, PaymentTaskFilter {}
