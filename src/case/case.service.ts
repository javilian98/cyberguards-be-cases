import { Case, CaseAuditLog } from "../types/types";
import { db } from "../utils/db.server";

export const getCaseList = async ({
  skip = 0,
  take = 10,
}: {
  skip?: number; // Making skip optional
  take?: number; // Making take optional
} = {}): Promise<Case[]> => {
  return await db.case.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      riskScore: true,
      assigneeId: true,
      createdAt: true,
      assignedAt: true,
      caseStatus: true,
      employeeId: true,
    },
    skip,
    take,
  });
};

export const getCase = async (id: string): Promise<Case | null> => {
  return await db.case.findUnique({
    where: {
      id,
    },
  });
};

export const getCaseByEmployeeId = async (
  employeeId: string
): Promise<Case | null> => {
  return await db.case.findFirst({
    where: {
      employeeId,
    },
  });
};

export const createCase = async (caseItem: Omit<Case, "id">): Promise<Case> => {
  const { title, description, riskScore, assigneeId, caseStatus, employeeId } =
    caseItem;

  return await db.case.create({
    data: {
      title,
      description,
      riskScore,
      assigneeId,
      caseStatus,
      employeeId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      riskScore: true,
      assigneeId: true,
      caseStatus: true,
      employeeId: true,
    },
  });
};

export const updateCase = async (
  caseItem: Omit<Case, "id">,
  id: string
): Promise<Case> => {
  const { title, description, riskScore, assigneeId, caseStatus, employeeId } =
    caseItem;

  return await db.case.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      riskScore,
      assigneeId,
      caseStatus,
      employeeId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      riskScore: true,
      assigneeId: true,
      caseStatus: true,
      employeeId: true,
    },
  });
};

export const deleteCase = async (id: string): Promise<void> => {
  await db.case.delete({
    where: {
      id,
    },
  });
};

export const getCaseAuditLogList = async ({
  skip = 0,
  take = 10,
}: {
  skip?: number; // Making skip optional
  take?: number; // Making take optional
} = {}): Promise<CaseAuditLog[]> => {
  return await db.caseAuditLog.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      caseId: true,
      assigneeId: true,
      action: true,
      edits: true,
      createdAt: true,
    },
    skip,
    take,
  });
};

export const createCaseAuditLog = async (
  log: Omit<CaseAuditLog, "id">
): Promise<CaseAuditLog> => {
  const { caseId, assigneeId, action, edits } = log;

  return await db.caseAuditLog.create({
    data: {
      caseId,
      assigneeId,
      action,
      edits,
    },
    select: {
      id: true,
      caseId: true,
      assigneeId: true,
      action: true,
      edits: true,
    },
  });
};
