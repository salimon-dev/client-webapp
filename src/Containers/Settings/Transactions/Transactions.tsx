import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { searchTransactions } from "@apis/transactions";
import { Button, Heading } from "@radix-ui/themes";
import SendTransactionModal from "./SendTransactionModal";
import LoadingView from "./Components/LoadingView/LoadingView";
import { ITransaction } from "@specs/transactions";
import { ICollection } from "@apis/common";
import TransactionCard from "@components/TransactionCard/TransactionCard";

const page_size = 10;
export default function Transactions() {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<
    ICollection<ITransaction>,
    Error,
    InfiniteData<ICollection<ITransaction>>,
    [string],
    number
  >({
    queryKey: ["transactions"],
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const offset = lastPageParam * page_size;
      if (lastPage.total > offset) {
        return lastPageParam + 1;
      } else {
        return;
      }
    },
    queryFn: ({ pageParam }): Promise<ICollection<ITransaction>> => {
      return searchTransactions({ page: pageParam, page_size });
    },
  });

  function records() {
    if (isLoading || !data) return [];
    return data.pages.reduce<ITransaction[]>((prev, curr) => {
      return [...prev, ...curr.data];
    }, []);
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
          <TransactionCard key={item.id} record={item} />
        ))}
        {isLoading && <LoadingView message="loading transactions" />}
        {hasNextPage && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 60 }}>
            <Button onClick={() => fetchNextPage()} variant="ghost" loading={isFetchingNextPage}>
              Load more
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
