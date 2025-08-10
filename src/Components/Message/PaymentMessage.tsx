import { amountToString, transactionStatusToString } from "@helpers/transformers";
import { Text } from "@radix-ui/themes";
import { ILocalMessage } from "@specs/threads";

interface Props {
  message: ILocalMessage;
}

// TODO: this is not a good design, needs to be refactored
export default function PaymentMessage({ message }: Props) {
  if (!message.transaction) return <div>invalid message</div>;
  const transaction = message.transaction;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 8 }}>
        <Text size="4">Transaction</Text>
      </div>
      <div>
        {amountToString(transaction.amount)} token (total:{" "}
        {amountToString(transaction.fee + transaction.amount)} with fee {amountToString(transaction.fee)}){" "}
        {transaction.source_username} to {transaction.target_username}
      </div>
      <div style={{ marginBottom: 8 }}>current status {transactionStatusToString(transaction.status)}</div>
      <div style={{ borderTop: "1px solid var(--gray-6)", paddingTop: 8 }}>
        Description: {transaction.description}
      </div>
    </div>
  );
}
