import { db } from "../utils/db.server";

type Case = {
  title: string;
  description: string;
  riskScore: number;
  assigneeId: string | null;
  // threatPageUrl: string;
  caseStatus: number;
  employeeId: string | null;
};

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
      // threatPageUrl: true,
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
  const {
    title,
    description,
    // riskStatus,
    riskScore,
    assigneeId,
    // threatPageUrl,
    caseStatus,
    employeeId,
  } = caseItem;

  return await db.case.create({
    data: {
      title,
      description,
      riskScore,
      assigneeId,
      // threatPageUrl,
      caseStatus,
      employeeId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      riskScore: true,
      assigneeId: true,
      // threatPageUrl: true,
      caseStatus: true,
      employeeId: true,
    },
  });
};

export const updateCase = async (
  caseItem: Omit<Case, "id">,
  id: string
): Promise<Case> => {
  const {
    title,
    description,
    riskScore,
    assigneeId,
    // threatPageUrl,
    caseStatus,
    employeeId,
  } = caseItem;

  return await db.case.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      riskScore,
      assigneeId,
      // threatPageUrl,
      caseStatus,
      employeeId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      riskScore: true,
      assigneeId: true,
      // threatPageUrl: true,
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
