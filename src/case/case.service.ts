import { db } from "../utils/db.server";

type Case = {
  title: string;
  description: string;
  risk_status: string;
  risk_score: number;
  threat_page_url: string;
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
      risk_status: true,
      risk_score: true,
      threat_page_url: true,
      created_at: true,
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
  const { title, description, risk_status, risk_score, threat_page_url } =
    caseItem;

  return db.case.create({
    data: {
      title,
      description,
      risk_status,
      risk_score,
      threat_page_url,
    },
    select: {
      id: true,
      title: true,
      description: true,
      risk_status: true,
      risk_score: true,
      threat_page_url: true,
    },
  });
};

export const updateCase = async (
  caseItem: Omit<Case, "id">,
  id: string
): Promise<Case> => {
  const { title, description, risk_status, risk_score, threat_page_url } =
    caseItem;

  return db.case.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      risk_status,
      risk_score,
      threat_page_url,
    },
    select: {
      id: true,
      title: true,
      description: true,
      risk_status: true,
      risk_score: true,
      threat_page_url: true,
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
