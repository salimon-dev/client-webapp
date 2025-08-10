export interface ITransaction {
  id: string;
  created_at: number;
  updated_at: number;
  source_id: string;
  source_username: string;
  target_id: string;
  target_username: string;
  amount: number;
  fee: number;
  status: number;
  description: string;
  category: string;
}

export const TRANSACTION_STATUS_PENDING = 1;
export const TRANSACTION_STATUS_DONE = 2;
export const TRANSACTION_STATUS_REJECTED = 3;
