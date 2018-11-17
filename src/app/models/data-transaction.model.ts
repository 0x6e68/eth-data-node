export interface DataTransactionModel{
  author: string;
  data: Uint8Array;
  metaData: Object;
  block: string;
  index: number;
}
