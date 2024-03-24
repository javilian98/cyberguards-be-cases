// export interface Case {
//   id: string;
//   title: string;
//   riskScore: number;
//   createdAt: string;
//   assigneeId: string;
//   caseStatus: number;
//   assignedDateTime?: string;
//   employeeId: string;
// }

// export interface CaseDetail {
//   id: string;
//   title: string;
//   description: string;
//   riskScore: number;
//   createdAt?: string;
//   caseStatus: number;
//   assigneeId?: string;
//   employeeId: string;
// }

export interface Case {
  title: string;
  description: string;
  riskScore: number;
  assigneeId: string | null;
  caseStatus: number;
  employeeId: string | null;
}

export interface CaseAuditLog {
  id: string;
  caseId: string;
  assigneeId: string | null;
  action: string;
  edits: string | null;
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
