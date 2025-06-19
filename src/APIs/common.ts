export interface ISearchParams {
  page?: number;
  page_size?: number;
}

export interface ICollection<T> {
  data: T[];
  total: number;
}
