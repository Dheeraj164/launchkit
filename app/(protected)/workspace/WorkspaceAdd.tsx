import React, { FormEvent, useState } from "react";
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

export default function WorkspaceAdd({
  showInvite,
  setShowInvite,
  // addWorkspacetoUi,
}: {
  showInvite: boolean;
  setShowInvite: React.Dispatch<React.SetStateAction<boolean>>;
  addWorkspacetoUi?: ({ formData }: { formData: FormData }) => void;
}) {
  // Start with 3 rows
  const [rows, setRows] = useState([0, 1, 2]);

  const addRow = () => {
    setRows((prev) => [...prev, prev.length]);
  };

  const deleteRow = (indexToDelete: number) => {
    if (rows.length === 1) return; // prevent deleting last row
    setRows((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="mt-10">
      <Button onPress={() => setShowInvite(true)}>Add New Workspace</Button>

      {showInvite && (
        <div className="mt-16 z-10 fixed inset-0 bg-white overflow-y-auto">
          <Form
            aria-label=""
            action={addWorkspace}
            className="min-h-screen w-full bg-gray-50"
          >
            {/* HEADER */}
            <div className="sticky top-0 bg-white border-b px-10 py-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
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
                  className="rounded-lg px-5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <Button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Create Workspace
                </Button>
              </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-6xl mx-auto px-10 pt-6 space-y-8">
              {/* CLIENT INFO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-xl shadow-sm border">
                <TextField isRequired name="clientName">
                  <Label>Client Name</Label>
                  <Input
                    className="border border-gray-300"
                    placeholder="e.g. Acme Corp"
                  />
                  <FieldError />
                </TextField>

                <TextField isRequired name="clientEmail" type="email">
                  <Label>Client Email</Label>
                  <Input
                    className="border border-gray-300"
                    placeholder="client@email.com"
                  />
                  <FieldError />
                </TextField>
              </div>

              {/* DELIVERABLES */}
              <div className="bg-white px-8 rounded-xl shadow-sm border">
                <TextField
                  isRequired
                  name="deliverables"
                  validate={(value) => {
                    if (value.trim().length < 10) {
                      return "Please provide more details about the deliverables";
                    }
                    return null;
                  }}
                >
                  <Label>Overall Deliverables</Label>

                  <TextArea
                    className="border border-gray-300 mt-2"
                    placeholder="Describe overall project scope, features, expectations..."
                    rows={4}
                  />

                  <FieldError />
                </TextField>
              </div>

              {/* MILESTONES */}
              <div className="bg-white px-8 rounded-xl shadow-sm border">
                <h4 className="text-lg font-semibold mb-6">Milestones</h4>

                <div className="overflow-x-auto border rounded-xl">
                  <Table removeWrapper aria-label="Milestone Table">
                    <TableHeader>
                      <TableColumn>No</TableColumn>
                      <TableColumn>Milestone</TableColumn>
                      <TableColumn>Expected Due Date</TableColumn>
                      <TableColumn>Rate</TableColumn>
                      <TableColumn>{"   "}</TableColumn>
                    </TableHeader>

                    <TableBody>
                      {rows.map((_, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>

                          <TableCell>
                            <TextField isRequired name="milestoneTitle">
                              <Input
                                className="border border-gray-300"
                                placeholder="Milestone title"
                              />
                              <FieldError />
                            </TextField>
                            {/* <Input
                              className="border border-gray-300"
                              name={`milestone_${index}`}
                              placeholder="Milestone title"
                            /> */}
                          </TableCell>

                          <TableCell>
                            <TextField isRequired name="milestoneDueDate">
                              <Input
                                className="border border-gray-300"
                                placeholder="mm/dd/yyyy"
                                type="date"
                              />
                              <FieldError />
                            </TextField>
                            {/* <Input
                              className="border border-gray-300"
                              name={`dueDate_${index}`}
                              type="date"
                            /> */}
                          </TableCell>

                          <TableCell>
                            <TextField isRequired name="milestoneRate">
                              <Input
                                className="border border-gray-300"
                                placeholder="₹"
                              />
                              <FieldError />
                            </TextField>
                            {/* <Input
                              className="border border-gray-300"
                              name={`rate_${index}`}
                              type="number"
                              placeholder="₹"
                            /> */}
                          </TableCell>

                          {/* Delete Button */}
                          <TableCell>
                            <button
                              type="button"
                              onClick={() => deleteRow(index)}
                              className="text-red-500 hover:text-red-700 font-bold"
                            >
                              ✕
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Add Row Button */}
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={addRow}
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
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
