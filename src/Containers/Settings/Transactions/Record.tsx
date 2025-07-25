import { ITransaction } from "@specs/transactions";
import Styles from "./styles.module.css";
import { useAtomValue } from "jotai";
import { profileAtom } from "@providers/auth";
import { formatWithCommas, transactionStatusToString } from "@helpers/transformers";
import { Text } from "@radix-ui/themes";

interface Props {
  record: ITransaction;
}
export default function Record({ record }: Props) {
  const profile = useAtomValue(profileAtom);
  if (!profile) return;
  const type = record.source_id === profile!.id ? "out" : "in";
  return (
    <div className={Styles.container}>
      <div className={Styles.amountColumn}>
        <div className={Styles.recordType}>{type}</div>
        <div
          style={{
            maxWidth: 140,
            textOverflow: "ellipsis",
            textWrap: "nowrap",
            overflow: "hidden",
          }}
        >
          {formatWithCommas(record.amount)}
        </div>
      </div>
      <div className={Styles.detailsColumn}>
        <div style={{ flex: 1, display: "flex", width: "100%", flexWrap: "wrap" }}>
          <div
            style={{
              flex: "1 1 200px",
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "column",
            }}
          >
            <div className={Styles.detailField}>
              Status:
              <StatusBadge status={record.status} />
            </div>
            <div className={Styles.detailField}>Category: {record.category}</div>
          </div>
          <div
            style={{
              flex: "1 1 200px",
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "column",
            }}
          >
            <div className={Styles.detailField}>From: {record.source_username}</div>
            <div className={Styles.detailField}>To: {record.target_username}</div>
          </div>
        </div>
        <div className={Styles.detailField} style={{ flex: 1, marginTop: 12 }}>
          Description: {record.description}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: number }) {
  switch (status) {
    case 1:
      return (
        <Text color="yellow" style={{ marginLeft: 8, textTransform: "capitalize" }}>
          {transactionStatusToString(status)}
        </Text>
      );
    case 2:
      return (
        <Text color="green" style={{ marginLeft: 8, textTransform: "capitalize" }}>
          {transactionStatusToString(status)}
        </Text>
      );
    case 3:
      return (
        <Text color="red" style={{ marginLeft: 8, textTransform: "capitalize" }}>
          {transactionStatusToString(status)}
        </Text>
      );
  }
}
