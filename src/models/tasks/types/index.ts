export type Data = {
  username: string;
  title: string;
  date: Date;
  value: number;
  isPayed: boolean;
  edit?: string;
  exclude?: string;
};

export type HeadCell = {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
};

export type TaskData = {
  id?: string;
  user: string;
  value: string;
  date: string;
  title: string;
};
