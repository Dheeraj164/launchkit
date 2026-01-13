import { User } from "@/model/User";

export interface WorkspaceData {
  id: string;
  name: string;
  owner: string;
  plan: "free" | "pro";
  created_at: Date;
  userinfo: {
    firstname: string;
    lastname: string;
  };
  workspace_members: {
    role: "owner" | "member";
    userinfo: {
      firstname: string;
      lastname: string;
    };
  }[];
}

export interface WorkspaceMember {
  id: string;
  workspace_id: string;
  user_id: string;
  role: string;
  created_at: string;
}
export interface selectedWorkspaceMembers {
  role: string;
  userinfo: {
    firstname: string;
    lastname: string;
  };
}

export interface Payment {
  id: string;
  payment_id: string;
  order_id: string;
  amount: number;
  status: "Success" | "Failure";
  payment_date: Date;
  exp_date: Date | null;
}

export interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;

  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  selectedWorkspace: WorkspaceData | null;
  setSelectedWorkspace: React.Dispatch<
    React.SetStateAction<WorkspaceData | null>
  >;
  workspace: WorkspaceData[] | null;
  setWorkspace: React.Dispatch<React.SetStateAction<WorkspaceData[] | null>>;
  showInvite: boolean;
  setShowInvite: React.Dispatch<React.SetStateAction<boolean>>;
}
