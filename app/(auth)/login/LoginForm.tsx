"use client";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signin, signinWithGoogole } from "./Action";

export default function LoginForm() {
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
    signin({ email, password, router });
  };
  return (
    <Form
      className="flex w-96 flex-col gap-4  m-5 p-5 bg-gray-200 rounded-2xl"
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
        minLength={6}
        name="password"
        type="password"
        // validate={(value) => {
        //   if (value.length < 8) {
        //     return "Password must be at least 8 characters";
        //   }
        //   if (!/[A-Z]/.test(value)) {
        //     return "Password must contain at least one uppercase letter";
        //   }
        //   if (!/[0-9]/.test(value)) {
        //     return "Password must contain at least one number";
        //   }
        //   return null;
        // }}
      >
        <Label className="text-gray-600">Password</Label>
        <Input className=" " placeholder="Enter your password" />
        <Description>
          Must be at least 8 characters with 1 uppercase and 1 number
        </Description>
        <FieldError />
      </TextField>
      <div className="flex gap-2">
        <Button type="submit">
          <Icon icon="gravity-ui:check" />
          Submit
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
      <div className="flex ">
        <Description>
          Don&apos;t have an account
          <Link href={"/signup"} className="px-2">
            SignUp
          </Link>
        </Description>
      </div>
      <div>
        <Button variant="danger" onClick={signinWithGoogole}>
          Sign In with Google+
        </Button>
      </div>
    </Form>
  );
}
