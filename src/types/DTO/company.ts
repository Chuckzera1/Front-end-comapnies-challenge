import { Company } from '../entities/company';

export type ListCompaniesReturnType = {
  total: number;
  data: Company[];
};
