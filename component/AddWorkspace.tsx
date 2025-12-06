"use client";
import { Button, Input } from "@heroui/react";
import React, { useState } from "react";

interface AddWorkspaceProp {
  createWorkspace: (workspaceName: string) => void;
  setShowAddWorkSpace: (value: boolean) => void;
}

export default function AddWorkspace({
  createWorkspace,
  setShowAddWorkSpace,
}: AddWorkspaceProp) {
  const [workspaceName, setWorkspaceName] = useState("");
  const [creatingError, setCreatingError] = useState("");
  return (
    <div className="w-screen top-0 h-screen backdrop-blur-[2px] flex justify-center items-center absolute">
      <div className=" text-center h-[25%] w-[20%] bg-gray-400 rounded-4xl flex justify-center items-center">
        <div>
          <p className="pt-5 pb-2">Enter the worspace Name</p>
          <Input
            value={workspaceName}
            onChange={(e) => {
              setCreatingError("");
              setWorkspaceName(e.target.value);
            }}
          />
          <div className="pt-2 flex">
            <div className="px-2">
              <Button
                onClick={() => {
                  if (workspaceName && workspaceName.length > 3) {
                    createWorkspace(workspaceName);
                    setShowAddWorkSpace(false);
                  } else {
                    setCreatingError("Please enter a valid Workspace Name");
                  }
                }}>
                Submit
              </Button>
            </div>
            <div className="px-2">
              <Button
                variant="danger"
                onClick={() => setShowAddWorkSpace(false)}>
                Cancel
              </Button>
            </div>
          </div>
          <p className="text-red-500">{creatingError} </p>
        </div>
      </div>
    </div>
  );
}
