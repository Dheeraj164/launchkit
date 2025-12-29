"use client";
import { AppContext } from "@/context/AppContext";
import { Button } from "@heroui/react";
import React, { useContext, useEffect } from "react";

export default function WorkspaceHeader() {
  const { setWorkspace, workspace, setSelectedWorkspace } =
    useContext(AppContext);

  useEffect(() => {
    async function loadWorkspace() {
      try {
        if (workspace === null) {
          const res = await fetch("/api/workspace");
          const json = await res.json();
          setWorkspace(json.workspaces);

          setSelectedWorkspace(json.workspaces[0]);
        }
      } catch (e) {
        alert(e);
      }
    }
    loadWorkspace();
  }, [setWorkspace, workspace, setSelectedWorkspace]);

  return (
    <header className="mb-6 flex justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Workspace</h1>
        <p className="text-sm text-gray-600">
          Manage your team and workspace settings.
        </p>
      </div>
      <div>
        <Button onPress={() => {}}>Add New Workspace</Button>
      </div>
    </header>
  );
}
