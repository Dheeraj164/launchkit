import { getAllInfo } from "@/app/actions/getAllInfo";
import Empty from "@/component/Empty";
import React from "react";
import UserInfoSection from "./UserInfoSection";
import WorkspaceSection from "./WorkspaceSection";
import { Button } from "@heroui/react";
import Link from "next/link";

export default async function page() {
  const { data, error } = await getAllInfo();
  if (error || !data) {
    <Empty
      header={error}
      message="You haven't created a workspace yet. Workspaces help you manage
              projects, teammates, and usage in one place."
      button={true}
    />;
  }
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center">
      <div>
        <div className="flex justify-end items-end w-full">
          <Button>
            <Link href={"/dashboard"}>Go to Dashboard </Link>
          </Button>
        </div>
        <UserInfoSection users={data?.users} />
        <WorkspaceSection workspaces={data?.workspaces} />
      </div>
    </div>
  );
}
