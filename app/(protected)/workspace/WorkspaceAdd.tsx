"use client";
import { addWorkspace } from "@/app/actions/addWorkspace";
import React, { Activity, useState } from "react";

import { Button, FieldError, Input, Label, TextField } from "@heroui/react";
export default function WorkspaceAdd() {
  const [showInvite, setShowInvite] = useState(false);
  return (
    <div>
      <Button
        onPress={() => {
          setShowInvite(true);
        }}>
        Add New Workspace
      </Button>
      <div>
        <Activity mode={showInvite ? "visible" : "hidden"}>
          <form
            action={addWorkspace}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              {/* Header */}
              <div className="mb-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Create new workspace
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Workspaces help you organize projects and teammates.
                </p>
              </div>

              {/* Input */}
              <div className="mt-6">
                <TextField
                  isRequired
                  name="workspaceName"
                  type="text"
                  validate={(value) => {
                    if (value.trim().length < 3) {
                      return "Workspace name must be at least 3 characters";
                    }
                    return null;
                  }}>
                  <Label className="text-sm text-gray-700">
                    Workspace name
                  </Label>
                  <Input placeholder="e.g. Acme Team" autoFocus />
                  <FieldError />
                </TextField>
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowInvite(false)}
                  className="rounded-md px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                  Cancel
                </button>

                <Button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                  Create workspace
                </Button>
              </div>
            </div>
          </form>
        </Activity>
      </div>
    </div>
  );
}
