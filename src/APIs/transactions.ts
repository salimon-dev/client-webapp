import { httpClient } from "@providers/http";
import { ICollection, ISearchParams } from "./common";
import { ITransaction } from "@specs/transactions";

interface ISearchTransactionParams extends ISearchParams {
  status?: number;
}
export function searchTransactions(params: ISearchTransactionParams) {
  return httpClient
    .get<ICollection<ITransaction>>("/member/transactions", { params })
    .then((response) => response.data);
}

interface ITransferCreditParams {
  user_id: string;
  amount: number;
  category: string;
  description: string;
}
export function sendTransaction(param: ITransferCreditParams) {
  return httpClient.post("/member/transactions/send", param).then((response) => response.data);
}
export function requestTransaction(param: ITransferCreditParams) {
  return httpClient.post("/member/transactions/send", param).then((response) => response.data);
}
export function updateTransactionStatus(id: string, status: string) {
  return httpClient.post(`/member/transactions/${id}/${status}`).then((response) => response.data);
}
