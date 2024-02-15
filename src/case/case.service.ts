import { db } from "../utils/db.server";

type Case = {
  title: string;
  description: string;
  riskStatus: string;
  riskScore: number;
  threatPageUrl: string;
};

export const getCaseList = async ({
  skip = 0,
  take = 10,
}: {
  skip?: number; // Making skip optional
  take?: number; // Making take optional
} = {}): Promise<Case[]> => {
  return db.case.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      riskStatus: true,
      riskScore: true,
      threatPageUrl: true,
      createdAt: true,
    },
    skip,
    take,
  });
};

export const getCase = async (id: string): Promise<Case | null> => {
  return db.case.findUnique({
    where: {
      id,
    },
  });
};

export const createCase = async (caseItem: Omit<Case, "id">): Promise<Case> => {
  const { title, description, riskStatus, riskScore, threatPageUrl } = caseItem;

  return db.case.create({
    data: {
      title,
      description,
      riskStatus,
      riskScore,
      threatPageUrl,
    },
    select: {
      id: true,
      title: true,
      description: true,
      riskStatus: true,
      riskScore: true,
      threatPageUrl: true,
    },
  });
};

export const updateCase = async (
  caseItem: Omit<Case, "id">,
  id: string
): Promise<Case> => {
  const { title, description, riskStatus, riskScore, threatPageUrl } = caseItem;

  return db.case.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      riskStatus,
      riskScore,
      threatPageUrl,
    },
    select: {
      id: true,
      title: true,
      description: true,
      riskStatus: true,
      riskScore: true,
      threatPageUrl: true,
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
