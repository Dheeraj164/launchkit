"use client";

import {
  TextField,
  Label,
  Form,
  Input,
  FieldError,
  Description,
  Button,
} from "@heroui/react";
import { RiEye2Line, RiEyeCloseLine } from "@remixicon/react";
import { useState } from "react";
import SocialButtons from "./SocialButton";

export default function SignupSection({ isSignUp }: { isSignUp: boolean }) {
  const [seePassword, setSeePassword] = useState(false);

  return (
    <div
      className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-700 ease-in-out z-10 ${
        isSignUp ? "translate-x-full opacity-100 z-20" : "opacity-0"
      }`}
    >
      {/* Note: You'll need a 'signup' action in your Action.ts for this */}
      <Form className="flex flex-col items-center justify-center h-full px-12 text-center gap-2">
        <h1 className="text-3xl font-bold mb-2">Create Account</h1>
        <SocialButtons />
        <span className="text-sm text-gray-500 mb-2">
          or use your email for registration
        </span>

        <TextField className="w-full" isRequired name="name" type="name">
          <Label className="text-gray-600 text-left w-full block text-sm">
            Name
          </Label>
          <Input
            className="border-2 border-black rounded-xl"
            placeholder="John Doe"
            // variant="bordered"
          />
          <FieldError className="text-xs text-red-500" />
        </TextField>
        <TextField className="w-full" isRequired name="email" type="email">
          <Label className="text-gray-600 text-left w-full block text-sm">
            Email
          </Label>
          <Input
            className="border-2 border-black rounded-xl"
            placeholder="john@example.com"
            // variant="bordered"
          />
          <FieldError className="text-xs text-red-500" />
        </TextField>
        <TextField className="w-full" isRequired name="password">
          <Label className="text-gray-600 text-left w-full block text-sm">
            Password
          </Label>
          <div className="flex border-2 border-black rounded-xl overflow-hidden focus-within:ring-2 ring-indigo-500 transition-all">
            <Input
              name="password"
              type={seePassword ? "text" : "password"}
              className="w-full"
              placeholder="Enter your password"
              // variant="flat"
            />
            <button
              type="button"
              onClick={() => setSeePassword(!seePassword)}
              className="flex items-center justify-center pr-3"
            >
              {seePassword ? <RiEye2Line /> : <RiEyeCloseLine />}
            </button>
          </div>
          <Description className="text-[10px] text-gray-400 mt-1">
            Must include 1 uppercase and 1 number
          </Description>
          <FieldError className="text-xs text-red-500" />
        </TextField>
        <Button className="mt-4 px-12 bg-indigo-600 text-white rounded-full font-bold uppercase tracking-wider">
          Sign Up
        </Button>
      </Form>
    </div>
  );
}
