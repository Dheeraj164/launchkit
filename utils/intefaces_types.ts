import { User } from "@/app/model/User";
import { Workspace } from "@/app/model/Workspace";

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
  workspace: Workspace[] | null;
  setWorkspace: React.Dispatch<React.SetStateAction<Workspace[] | null>>;
  selectedWorkspace: Workspace | null;
  setSelectedWorkspace: React.Dispatch<React.SetStateAction<Workspace | null>>;
}
