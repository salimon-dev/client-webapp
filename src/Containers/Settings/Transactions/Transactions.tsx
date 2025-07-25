import Record from "./Record";
import { useQuery } from "@tanstack/react-query";
import { searchTransactions } from "@apis/transactions";
import { Heading } from "@radix-ui/themes";
import SendTransactionModal from "./SendTransactionModal";
import LoadingView from "./Components/LoadingView/LoadingView";

export default function Transactions() {
  const { data, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => {
      return searchTransactions({ page: 1, page_size: 10 });
    },
  });

  function records() {
    if (isLoading || !data) return [];
    return data.data;
  }

  return (
    <div>
      <div style={{ border: "1px solid var(--gray-3)", boxSizing: "border-box", width: "100%" }} />
      <div
        style={{
          marginTop: 12,
          height: 46,
          padding: "0px 12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Heading>Transactions</Heading>
        <SendTransactionModal />
      </div>
      <div
        style={{ padding: 12, boxSizing: "border-box", overflow: "auto", maxHeight: "calc(100vh - 234px)" }}
      >
        {records().map((item) => (
          <Record key={item.id} record={item} />
        ))}
        {isLoading && <LoadingView message="loading transactions" />}
      </div>
    </div>
  );
}
