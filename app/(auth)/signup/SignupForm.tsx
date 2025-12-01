"use client";

import { createClient } from "@/utils/supabase/client";
// import { createClient } from "@/utils/supabase/server";
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

export default function SignupForm() {
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    const email = data["email"];

    const password = data["password"];

    try {
      const supabaseClient = createClient();
      const { error } = await supabaseClient.auth.signUp({
        email,
        password,
      });
      if (error) {
        alert(error);
      } else {
        router.replace("/confirmmail");
      }
    } catch (e) {
      alert(e);
    }
  };
  return (
    <Form
      className="flex w-auto flex-col gap-4  m-5 p-5 bg-gray-200 rounded-2xl"
      onSubmit={onSubmit}>
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}>
        <Label className="text-gray-600">Email</Label>
        <Input placeholder="john@example.com" />
        <FieldError />
      </TextField>
      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          console.log(value);
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }}>
        <Label className="text-gray-600">Password</Label>
        <Input className=" " placeholder="Enter your password" />

        <FieldError />
      </TextField>
      <TextField
        isRequired
        minLength={8}
        name="Re-password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }}>
        <Label className="text-gray-600">Re-Enter Password</Label>
        <Input className=" " placeholder="Enter your password" />

        <FieldError />
      </TextField>
      <Description>
        Must be at least 8 characters with 1 uppercase and 1 number
      </Description>
      <div className="flex gap-2 justify-center">
        <Button type="submit">
          {/* <Icon icon="gravity-ui:check" /> */}
          Submit
        </Button>
        {/* <Button type="reset" variant="secondary">
          Reset
        </Button> */}
      </div>
      <div className="flex ">
        <Link href={"/login"} className="px-2">
          <Description>Already have an account Login</Description>
        </Link>
      </div>
    </Form>
  );
}
