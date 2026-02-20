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
import React, { Suspense, useState } from "react";
import { login } from "./action";
import SocialButtons from "./SocialButton";
import Loading from "@/component/Loading";

export default function LoginSection({ isSignUp }: { isSignUp: boolean }) {
  const [seePassword, setSeePassword] = useState(false);

  return (
    <div
      className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-700 ease-in-out z-10 ${
        !isSignUp ? "translate-x-full opacity-0" : "opacity-100"
      }`}
    >
      <Suspense fallback={<Loading page={"Login Loading"} />}>
        <Form
          action={login}
          className="flex flex-col items-center justify-center h-full px-12 text-center gap-4"
        >
          <h1 className="text-3xl font-bold mb-2">Sign In</h1>
          <SocialButtons />
          <span className="text-sm text-gray-500 mb-2">
            or use your account email
          </span>

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

          <a
            href="#"
            className="text-sm text-gray-400 hover:underline self-end"
          >
            Forgot your password?
          </a>

          <Button
            type="submit"
            className="px-12 bg-indigo-600 text-white rounded-full font-bold uppercase tracking-wider hover:bg-indigo-700 transition"
          >
            Sign In
          </Button>
        </Form>
      </Suspense>
    </div>
  );
}
