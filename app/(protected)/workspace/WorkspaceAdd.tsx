"use client";

import React, { useContext, useState } from "react";
import {
  Button,
  FieldError,
  Input,
  Label,
  TextField,
  TextArea,
  Form,
} from "@heroui/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { addWorkspace } from "@/app/actions/addWorkspace";
import { AppContext } from "@/context/AppContext";

export default function WorkspaceAdd({
  showInvite,
  setShowInvite,
}: {
  showInvite: boolean;
  setShowInvite: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setWorkspace } = useContext(AppContext);

  // Start with 3 milestone rows
  const [rows, setRows] = useState([0, 1, 2]);

  const addRow = () => {
    setRows((prev) => [...prev, prev.length]);
  };

  const deleteRow = (indexToDelete: number) => {
    if (rows.length === 1) return;
    setRows((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="mt-10">
      <Button onPress={() => setShowInvite(true)}>Add New Workspace</Button>

      {showInvite && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <Form
            aria-labelledby="create-workspace-heading"
            action={async (e: FormData) => {
              const { data } = await addWorkspace(e);
              if (data) setWorkspace((prev) => [...(prev ?? []), data]);
            }}
            className="min-h-screen w-full bg-gray-50">
            {/* HEADER */}
            <div className="sticky top-0 z-20 bg-white border-b px-10 py-6 flex justify-between items-center">
              <div>
                <h2
                  id="create-workspace-heading"
                  className="text-2xl font-semibold text-gray-900">
                  Create Contract Workspace
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Add client details and define milestones.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowInvite(false)}
                  className="rounded-lg px-5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition">
                  Cancel
                </button>

                <Button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                  Create Workspace
                </Button>
              </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-6xl mx-auto px-10 pt-6 pb-16 space-y-8">
              {/*  WorkSpace Name */}
              <TextField isRequired aria-label="name" name="name">
                <Label className="text-gray-600 text-left w-full block text-sm">
                  Project Name
                </Label>
                <Input
                  className="border-2 border-black rounded-xl"
                  placeholder="Website"
                  // variant="bordered"
                />
                <FieldError className="text-xs text-red-500" />
              </TextField>
              {/* CLIENT INFO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-xl shadow-sm border">
                <TextField isRequired aria-label="clientName" name="clientName">
                  <Label>Client Name</Label>
                  <Input
                    className="border border-gray-300"
                    placeholder="e.g. Acme Corp"
                  />
                  <FieldError />
                </TextField>

                <TextField
                  isRequired
                  aria-label="clientEmail"
                  name="clientEmail"
                  type="email">
                  <Label>Client Email</Label>
                  <Input
                    className="border border-gray-300"
                    placeholder="client@email.com"
                  />
                  <FieldError />
                </TextField>
              </div>

              {/* DELIVERABLES */}
              <div className="bg-white p-8 rounded-xl shadow-sm border">
                <TextField
                  isRequired
                  aria-label="deliverables"
                  name="deliverables"
                  validate={(value) => {
                    if (value.trim().length < 10) {
                      return "Please provide more details about the deliverables";
                    }
                    return null;
                  }}>
                  <Label>Overall Deliverables</Label>

                  <TextArea
                    rows={4}
                    className="border border-gray-300 mt-2"
                    placeholder="Describe overall project scope, features, expectations..."
                  />

                  <FieldError />
                </TextField>
              </div>

              {/* MILESTONES */}
              <div className="bg-white p-8 rounded-xl shadow-sm border">
                <h3 className="text-lg font-semibold mb-6">Milestones</h3>

                <div className="overflow-x-auto border rounded-xl">
                  <Table removeWrapper aria-label="Milestone Table">
                    <TableHeader>
                      <TableColumn>No</TableColumn>
                      <TableColumn>Milestone</TableColumn>
                      <TableColumn>Expected Due Date</TableColumn>
                      <TableColumn>Rate</TableColumn>
                      <TableColumn> </TableColumn>
                    </TableHeader>

                    <TableBody>
                      {rows.map((_, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>

                          <TableCell>
                            <TextField
                              isRequired
                              aria-label="milestoneTitle"
                              name="milestoneTitle">
                              <Input
                                className="border border-gray-300"
                                placeholder="Milestone title"
                              />
                              <FieldError />
                            </TextField>
                          </TableCell>

                          <TableCell>
                            <TextField
                              isRequired
                              aria-label="milestoneDueDate"
                              name="milestoneDueDate">
                              <Input
                                type="date"
                                className="border border-gray-300"
                              />
                              <FieldError />
                            </TextField>
                          </TableCell>

                          <TableCell>
                            <TextField
                              isRequired
                              aria-label="milestoneRate"
                              name="milestoneRate">
                              <Input
                                type="number"
                                className="border border-gray-300"
                                placeholder="₹"
                              />
                              <FieldError />
                            </TextField>
                          </TableCell>

                          {/* DELETE BUTTON */}
                          <TableCell>
                            <button
                              type="button"
                              onClick={() => deleteRow(index)}
                              className="text-red-500 hover:text-red-700 font-bold"
                              aria-label={`Delete milestone ${index + 1}`}>
                              ✕
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* ADD ROW BUTTON */}
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={addRow}
                    className="text-indigo-600 hover:text-indigo-700 font-medium">
                    + Add Milestone
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}
