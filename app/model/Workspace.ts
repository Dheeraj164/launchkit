export class Workspace {
  id: string;
  owner: string;
  clientName: string;
  clientEmail: string;
  deliverables: string;
  milestones: {
    title: string;
    rate: string;
    dueDate: string;
  }[];
  created_at: string;
  constructor({
    id,
    owner,
    clientName,
    clientEmail,
    deliverables,
    milestones,
    created_at,
  }: {
    id: string;
    owner: string;
    clientName: string;
    clientEmail: string;
    deliverables: string;
    milestones: {
      title: string;
      rate: string;
      dueDate: string;
    }[];
    created_at: string;
  }) {
    this.id = id;
    this.owner = owner;
    this.clientName = clientName;
    this.clientEmail = clientEmail;
    this.deliverables = deliverables;
    this.milestones = milestones;
    this.created_at = created_at;
  }
}
