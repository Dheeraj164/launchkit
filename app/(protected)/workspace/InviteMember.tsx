"use client";

import { useEffect, useState, useTransition } from "react";

import { Button, Input, Label, TextField } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Activity } from "react";
import { searchUsers } from "@/app/actions/verifyUser";
import { sendInvite } from "@/app/actions/sendinvited";

type UserResult = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
};

interface InviteMemberProps {
  invitedWorkspace: string;
  invitedWorkspaceId: string;
}

export default function InviteMember({
  invitedWorkspace,
  invitedWorkspaceId,
}: InviteMemberProps) {
  const [showInvite, setShowInvite] = useState(false);
  const [value, setValue] = useState("");
  const [results, setResults] = useState<UserResult[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserResult | null>(null);
  const [isPending, startTransition] = useTransition();

  // 🔹 Debounced search
  //   useEffect(() => {
  //     const query = value.trim();

  //     if (query.length < 2) {
  //       // safe: effect cleanup style update
  //       setResults([]);
  //       return;
  //     }

  //     const timer = setTimeout(() => {
  //       startTransition(async () => {
  //         const users = await searchUsers(query);
  //         setResults(users);
  //       });
  //     }, 300);

  //     return () => clearTimeout(timer);
  //   }, [value]);

  useEffect(() => {
    const query = value.trim();

    // Handle the "too short" case
    if (query.length < 2) {
      // Wrapping in startTransition avoids the "cascading render" error
      // because it marks the state update as non-urgent.
      startTransition(() => {
        setResults([]);
      });
      return;
    }

    // Handle the debounced search
    const timer = setTimeout(() => {
      startTransition(async () => {
        try {
          const users = await searchUsers(query);
          setResults(users);
        } catch (error) {
          console.error("Search failed:", error);
          setResults([]);
        }
      });
    }, 300);

    // Cleanup: cancels the timer if the user types again before 300ms
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div>
      <button
        onClick={() => setShowInvite(true)}
        className="flex items-center gap-3 rounded-md border p-3 opacity-70">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50">
          <Icon icon="mdi:account-plus" width={18} />
        </div>
        <div>
          <div className="text-sm font-medium right-0">Invite member</div>
          <div className="text-xs text-gray-500">Send an invite by email</div>
        </div>
      </button>

      <Activity mode={showInvite ? "visible" : "hidden"}>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            {/* Header */}
            <div className="mb-4 text-center">
              <h3 className="text-lg font-semibold">Invite team member</h3>
              <p className="text-sm text-gray-500">Search by name or email</p>
            </div>

            {/* Input */}
            <TextField isRequired>
              <Label>Email or username</Label>
              <Input
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setSelectedUser(null);
                }}
                placeholder="john@example.com"
                autoFocus
              />
            </TextField>

            {/* Dropdown */}
            {results.length > 0 && !selectedUser && (
              <div className="absolute z-50 mt-1 w-[calc(100%-3rem)] rounded-md border bg-white shadow">
                {results.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => {
                      setSelectedUser(user);
                      setValue(user.email);
                      setResults([]);
                    }}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                    <div className="text-sm font-medium">
                      {user.firstname} {user.lastname}
                    </div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Selected */}
            {selectedUser && (
              <div className="mt-3 rounded-md bg-green-50 p-3 text-sm text-green-700">
                ✅ {selectedUser.firstname} {selectedUser.lastname} (
                {selectedUser.email})
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowInvite(false);
                  setValue("");
                  setResults([]);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
                Cancel
              </button>

              <Button
                isPending={isPending}
                isDisabled={!selectedUser}
                onClick={() => {
                  if (selectedUser) {
                    sendInvite({
                      receviersEmail: selectedUser.email,
                      invitedWorkspace: invitedWorkspace,
                      invitedWorkspaceId: invitedWorkspaceId,
                    });
                  }
                }}
                className="bg-indigo-600 text-white">
                Send Invite
              </Button>
            </div>
          </div>
        </div>
      </Activity>
    </div>
  );
}
