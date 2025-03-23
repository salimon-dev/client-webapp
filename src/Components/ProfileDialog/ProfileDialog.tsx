import Dialog from "@components/Dialog/Dialog";
import { useProfile } from "@network/hooks";
import { userRoleToString, userStatusToString } from "@network/specs";
import { DataList } from "@radix-ui/themes";
import { JSX } from "react";

interface Props {
  children: JSX.Element;
}
export default function ProfileDialog({ children }: Props) {
  const profile = useProfile();
  if (!profile) return;
  return (
    <Dialog title="profile" description="you can view and manage your profile here" trigger={children}>
      <DataList.Root>
        <DataList.Item align="center">
          <DataList.Label>username</DataList.Label>
          <DataList.Value>{profile.username}</DataList.Value>
        </DataList.Item>
        <DataList.Item align="center">
          <DataList.Label>role</DataList.Label>
          <DataList.Value>{userRoleToString(profile.role)}</DataList.Value>
        </DataList.Item>
        <DataList.Item align="center">
          <DataList.Label>status</DataList.Label>
          <DataList.Value>{userStatusToString(profile.status)}</DataList.Value>
        </DataList.Item>
        <DataList.Item align="center">
          <DataList.Label>credit</DataList.Label>
          <DataList.Value>{profile.credit}</DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </Dialog>
  );
}
