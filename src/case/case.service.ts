import { db } from "../utils/db.server";

type Case = {
  title: string;
  description: string;
  riskStatus: string;
  riskScore: number;
  assigneeId: string | null;
  threatPageUrl: string;
  caseStatus: number;
  // suspectedUserId: string | null;
  // suspectTypeId: number;
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
      riskStatus: true,
      riskScore: true,
      assigneeId: true,
      threatPageUrl: true,
      createdAt: true,
      assignedAt: true,
      caseStatus: true,
      suspectedUserId: true,
      suspectTypeId: true,
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

export const createCase = async (caseItem: Omit<Case, "id">): Promise<Case> => {
  const {
    title,
    description,
    riskStatus,
    riskScore,
    assigneeId,
    threatPageUrl,
    caseStatus,
    // suspectedUserId,
    // suspectTypeId,
  } = caseItem;

  return await db.case.create({
    data: {
      title,
      description,
      riskStatus,
      riskScore,
      assigneeId,
      threatPageUrl,
      caseStatus,
      // suspectedUserId,
      // suspectTypeId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      riskStatus: true,
      riskScore: true,
      assigneeId: true,
      threatPageUrl: true,
      caseStatus: true,
      // suspectedUserId: true,
      // suspectTypeId: true,
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
    riskStatus,
    riskScore,
    assigneeId,
    threatPageUrl,
    caseStatus,
    // suspectedUserId,
    // suspectTypeId,
  } = caseItem;

  return await db.case.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      riskStatus,
      riskScore,
      assigneeId,
      threatPageUrl,
      caseStatus,
      // suspectedUserId,
      // suspectTypeId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      riskStatus: true,
      riskScore: true,
      assigneeId: true,
      threatPageUrl: true,
      caseStatus: true,
      // suspectedUserId: true,
      // suspectTypeId: true,
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
