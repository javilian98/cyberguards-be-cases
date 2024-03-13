export interface Case {
  id: string;
  title: string;
  riskScore: number;
  createdAt: string;
  assigneeId?: string;
  assignedDateTime?: string;
}

export interface CaseDetail {
  id: string;
  title: string;
  description: string;
  riskScore: number;
  createdAt?: string;
  assigneeId?: string;
  suspectedUserId?: string;
  assignedDateTime?: string;
  threatPageUrl: string;
}

export interface UserListItem {
  id: string;
  firstName: string;
  lastName: string;
  profession: string;
  riskScore: number;
  suspectCaseId: number;
  lastAccessAt: string;
}
export interface UserDetail {
  id: string;
  firstName: string;
  lastName: string;
  profession: string;
  roleId: number;
  riskStatus: string;
  riskScore: number;
  suspectCaseId: number;
  lastAccessAt: string;
}
