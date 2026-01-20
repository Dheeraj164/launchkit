"use client";

import { AppCtx } from "@/context/AppContext";
import { User } from "@/model/User";
import { createClient } from "@/utils/supabase/client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Helper function for simple phone number validation (digits only)
const validatePhoneNumber = (value: string) => {
  if (!/^\d{10}$/.test(value)) {
    return "Please enter a valid 10-digit Phone Number";
  }
  return null;
};

interface InitialData {
  firstname: string;
  lastname: string;
  phonenumber: string;
}

export default function InfoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [initialData] = useState<InitialData>({
    firstname: "",
    lastname: "",
    phonenumber: "",
  });
  const { setUser } = AppCtx();
  const [error, setError] = useState("");

  // --- Fetch Data on Load ---
  useEffect(() => {
    const getInfo = async () => {
      const supabaseClient = createClient();
      const { data: authData, error: authError } =
        await supabaseClient.auth.getUser();

      if (authError) {
        console.error("Auth Error:", authError);
        router.push("/login"); // Redirect if not logged in
        return;
      }

      if (authData?.user) {
        try {
          const { data, error: dbError } = await supabaseClient
            .from("userinfo")
            .select("*") // Only select necessary fields
            .eq("id", authData.user.id) // Querying by ID is usually faster/safer than email
            .single();

          if (dbError && dbError.code !== "PGRST116") {
            // PGRST116 is "Row not found" which is handled below
            throw dbError;
          }

          if (data) {
            console.log(data);
            if (data.firstname && data.lastname) {
              router.push("/dashboard");
              setUser(
                new User({
                  email: data.email,
                  firstname: data.firstname,
                  lastname: data.lastname,
                  phonenumber: data.phonenumber,
                  created_at: data.created_at,
                  id: data.id,
                  role: data.role,
                }),
              );
            }
          }
        } catch (e) {
          console.error("Database Error:", e);
          setError("Failed to load user data. Check RLS policies.");
        }
      }
      setLoading(false);
    };
    getInfo();
  }, [router, setUser]);

  //   --- Submit Handler ---
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.values contains the form data automatically from the <Form> component
    // const { fname, lname, phonenumber } = e.values;

    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    const fname = data["fname"];

    const lname = data["lname"];
    const phonenumber = data["phonenumber"];
    setLoading(true);
    const supabaseClient = createClient();
    const { data: authData } = await supabaseClient.auth.getUser();

    if (!authData?.user) {
      alert("You must be logged in to submit.");
      setLoading(false);
      return;
    }

    // 1. Prepare data for insertion/update
    const updatePayload = {
      firstname: fname,
      lastname: lname,
      phonenumber: phonenumber,
    };

    // 2. Insert or Update the row based on the user's ID
    const { error: upsertError } = await supabaseClient.from("userinfo").upsert(
      {
        id: authData.user.id, // Use the user's ID to identify the row
        email: authData.user.email, // Include email on upsert for consistency
        ...updatePayload,
      },
      {
        onConflict: "id",
      }, // If ID exists, update; otherwise, insert
    );

    setLoading(false);

    if (upsertError) {
      console.error("Supabase Upsert Error:", upsertError);
      alert(
        `Failed to save data: ${upsertError.message}. Check your table columns and RLS.`,
      );
    } else {
      alert("Profile information saved successfully!");
      router.push("/dashboard");
    }
  };

  if (loading) {
    return (
      <div className="bg-black flex justify-center items-center h-screen">
        <h1 className="text-6xl text-white typewriter text-center">
          Loading.....
        </h1>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black justify-center items-center">
      {error && (
        <div className="p-4 m-5 text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}
      <Form
        className="flex w-auto flex-col gap-4 m-5 p-5 bg-gray-200 rounded-2xl"
        onSubmit={onSubmit}>
        <h2 className="text-2xl font-bold text-gray-800">
          Complete Your Profile
        </h2>
        <p className="text-sm text-gray-500">
          Just a few more details to get started.
        </p>

        <div className="flex w-full">
          <div className="m-1">
            <TextField
              isRequired
              name="fname"
              type="text"
              defaultValue={initialData?.firstname || ""}
              validate={(value) =>
                value.length < 1 ? "Please enter a valid First Name" : null
              }>
              <Label className="text-gray-600">First Name</Label>
              <Input placeholder="John" />
              <FieldError />
            </TextField>
          </div>
          <div className="m-1">
            <TextField
              isRequired
              name="lname"
              type="text"
              defaultValue={initialData?.lastname || ""}
              validate={(value) =>
                value.length < 1 ? "Please enter a valid Last Name" : null
              }>
              <Label className="text-gray-600">Last Name</Label>
              <Input placeholder="Doe" />
              <FieldError />
            </TextField>
          </div>
        </div>

        {/* Phonenumber Field: Assuming you have a 'phonenumber' column in userinfo */}
        <TextField
          isRequired
          name="phonenumber"
          type="tel" // Use 'tel' type for better mobile usability
          defaultValue={initialData?.phonenumber || ""}
          validate={validatePhoneNumber} // Using the dedicated validation function
        >
          <Label className="text-gray-600">Phone Number</Label>
          <Input placeholder="1234567890" />
          <FieldError />
        </TextField>

        <div className="flex gap-2 justify-center">
          <Button
            type="submit"
            //   disabled={loading}
          >
            {loading ? "Saving..." : "Submit"}
          </Button>
        </div>

        <div className="flex justify-center">
          <Link href={"/login"} className="px-2">
            <Description className="text-sm text-blue-600 hover:underline">
              Already have an account? Log In
            </Description>
          </Link>
        </div>
      </Form>
    </div>
  );
}
