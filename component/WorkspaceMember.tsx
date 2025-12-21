import { Icon } from "@iconify/react";
import Image from "next/image";
import React from "react";

interface WorkspaceMemberProps {
  members: {
    role: string;
    userinfo: {
      firstname: string;
      lastname: string;
    };
  }[];
}

export default function WorkspaceMember({ members }: WorkspaceMemberProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {members.map((member, i) => (
        <div key={i} className="flex items-center gap-3 rounded-md border p-3">
          <Image
            src={`https://avatars.dicebear.com/api/identicon/${member.userinfo.firstname}.svg`}
            alt="member"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <div className="text-sm font-medium">
              {member.userinfo.firstname} {member.userinfo.lastname}
            </div>
            <div className="text-xs text-gray-500 capitalize">
              {member.role}
            </div>
          </div>
        </div>
      ))}

      {/* Invite card */}
      <div className="flex items-center gap-3 rounded-md border p-3 opacity-70 cursor-pointer">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50">
          <Icon icon="mdi:account-plus" width={18} />
        </div>
        <div>
          <div className="text-sm font-medium">Invite member</div>
          <div className="text-xs text-gray-500">Send an invite by email</div>
        </div>
      </div>
    </div>
  );
}
