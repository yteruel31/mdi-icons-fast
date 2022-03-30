export interface Pagination<T extends object> {
  result: T[];
  total: number;
}
