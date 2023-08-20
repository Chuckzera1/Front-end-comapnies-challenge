import { Supplier } from '../entities/supplier';

export type ListSuppliersReturnType = {
  total: number;
  data: Supplier[];
};
