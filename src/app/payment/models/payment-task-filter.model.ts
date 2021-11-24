export interface PaymentTaskFilter {
  name_like?: string;
  username_like?: string;
  title_like?: string;
  value_gte?: number; // value greater than
  value_lte?: number; // value less than
  date_gte?: string; // date greater than
  date_lte?: string; // value less than
  isPayed?: boolean;
}
