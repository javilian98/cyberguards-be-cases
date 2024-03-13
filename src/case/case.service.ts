import { db } from "../utils/db.server";

type Case = {
  title: string;
  description: string;
  riskScore: number;
  assigneeId: string | null;
  threatPageUrl: string;
  caseStatus: number;
  logId: string | null;
};

export const getCaseList = async ({
  skip = 0,
  take = 10,
  logIds = "",
}: {
  skip?: number; // Making skip optional
  take?: number; // Making take optional
  logIds?: string | undefined;
} = {}): Promise<Case[]> => {
  const logIdsArray = logIds == "" ? undefined : logIds.split(",");

  return await db.case.findMany({
    where: {
      logId: {
        in: logIdsArray,
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      riskScore: true,
      assigneeId: true,
      threatPageUrl: true,
      createdAt: true,
      assignedAt: true,
      caseStatus: true,
      logId: true,
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
    // riskStatus,
    riskScore,
    assigneeId,
    threatPageUrl,
    caseStatus,
    logId,
  } = caseItem;

  return await db.case.create({
    data: {
      title,
      description,
      riskScore,
      assigneeId,
      threatPageUrl,
      caseStatus,
      logId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      riskScore: true,
      assigneeId: true,
      threatPageUrl: true,
      caseStatus: true,
      logId: true,
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
    threatPageUrl,
    caseStatus,
    logId,
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
      threatPageUrl,
      caseStatus,
      logId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      riskScore: true,
      assigneeId: true,
      threatPageUrl: true,
      caseStatus: true,
      logId: true,
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
