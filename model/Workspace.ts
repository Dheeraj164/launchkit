export class Workspace {
  workspaceId: string;
  workspaceName: string;
  owner: string;
  createdAt: Date;

  constructor({
    workspaceId,
    workspaceName,
    owner,
    createdAt,
  }: {
    workspaceId: string;
    workspaceName: string;
    owner: string;
    createdAt: Date;
  }) {
    this.createdAt = createdAt;
    this.owner = owner;
    this.workspaceId = workspaceId;
    this.workspaceName = workspaceName;
  }
}
