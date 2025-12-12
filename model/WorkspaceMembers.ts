import { Roletype } from "@/utils/general/workspaceRole";

export class WorkspaceMembers {
  workspaceId: string;
  workspaceName: string;
  memberId: string;
  memberName: string;
  role: Roletype;

  constructor({
    workspaceId,
    workspaceName,
    memberId,
    memberName,
    role,
  }: {
    workspaceId: string;
    workspaceName: string;
    memberId: string;
    memberName: string;
    role: Roletype;
  }) {
    this.memberName = memberName;
    this.role = role;
    this.memberId = memberId;
    this.workspaceId = workspaceId;
    this.workspaceName = workspaceName;
  }
}
