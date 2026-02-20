import { RiFacebookBoxFill, RiGoogleFill } from "@remixicon/react";
import { signinWithGoogle } from "./action";

export default function SocialButtons() {
  return (
    <div className="flex gap-3 mb-2">
      <button
        type="button"
        onClick={() => signinWithGoogle()}
        className="p-2 border rounded-full hover:bg-gray-50 transition-colors"
      >
        <RiGoogleFill />
      </button>
      <button
        type="button"
        className="p-2 border rounded-full hover:bg-gray-50 transition-colors"
      >
        <RiFacebookBoxFill />
      </button>
    </div>
  );
}
