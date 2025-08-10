import { ITransaction, TRANSACTION_STATUS_PENDING } from "@specs/transactions";
import Styles from "./styles.module.css";
import { useAtomValue } from "jotai";
import { profileAtom } from "@providers/auth";
import { formatWithCommas, transactionStatusToString } from "@helpers/transformers";
import { Button, DropdownMenu, Text } from "@radix-ui/themes";
import MenuIcon from "@icons/MenuIcon";
import SuccessIcon from "@icons/SuccessIcon";
import ErrorIcon from "@icons/ErrorIcon";
import { useState } from "react";
import LoadingIcon from "@icons/LoadingIcon";
import { updateTransactionStatus } from "@apis/transactions";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  record: ITransaction;
}
export default function TransactionCard({ record }: Props) {
  const profile = useAtomValue(profileAtom);
  if (!profile) return;
  const type = record.source_id === profile!.id ? "out" : "in";
  return (
    <div className={Styles.container}>
      {record.status === TRANSACTION_STATUS_PENDING && <ActionsMenu record={record} />}
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

function ActionsMenu({ record }: Props) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<"accept" | "reject" | undefined>();
  async function changeStatus(value: "accept" | "reject") {
    if (loading) return;
    try {
      setLoading(value);
      await updateTransactionStatus(record.id, value);
      queryClient.refetchQueries({ queryKey: ["transactions"] });
    } catch (err) {
      console.log(err);
    } finally {
      setOpen(false);
      setLoading(undefined);
    }
  }
  return (
    <div className={Styles.actionsBtn}>
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger>
          <Button variant="ghost" radius="full" style={{ width: 24, height: 24, padding: 0 }}>
            <MenuIcon style={{ width: 16, height: 16 }} />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <div className={Styles.actionsMenu}>
            <div onClick={() => changeStatus("accept")}>
              {loading === "accept" ? <LoadingIcon /> : <SuccessIcon />}
              <label>Accept</label>
            </div>
            <div onClick={() => changeStatus("reject")}>
              {loading === "reject" ? <LoadingIcon /> : <ErrorIcon />}
              <label>Reject</label>
            </div>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
