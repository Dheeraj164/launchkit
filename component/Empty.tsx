import Link from "next/link";
import { Activity } from "react";

export default function Empty({
  header,
  message,
  button,
}: {
  header: string;
  message: string;
  button: boolean;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="max-w-md text-center space-y-6 p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
        {/* Icon */}

        <div className="border border-gray-400 rounded-2xl shadow-2xl mt-3   space-y-6 p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-2xl">
            🚀
          </div>
          {/* Title */}
          <h1 className="text-2xl font-semibold">{header}</h1>

          {/* Description */}
          <p className="text-sm leading-relaxed">{message}</p>

          {/* CTA */}
          <Activity mode={button ? "visible" : "hidden"}>
            <div className="pt-2">
              <Link
                href="/workspace/create"
                className="inline-flex items-center text-white justify-center rounded-lg bg-linear-to-br from-gray-900 via-black to-gray-900 px-5 py-2.5 text-sm font-medium  hover:bg-gray-200 transition">
                Create your first workspace
              </Link>
            </div>
          </Activity>
        </div>
      </div>
    </div>
  );
}
