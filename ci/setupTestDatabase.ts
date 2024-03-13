import { db } from "../src/utils/db.server";

type Case = {
  id: string;
  caseStatus: number;
  title: string;
  description: string;
  riskScore: number;
  threatPageUrl: string;
  assigneeId?: string;
  suspectedUserId: string;
  suspectTypeId: number;
  logId?: string;
};

function getCases(): Case[] {
  return [
    {
      id: "1",
      caseStatus: 1,
      title: "Case 1",
      description: "Case 1 description",
      riskScore: 85,
      threatPageUrl: "https://youtube.com",
      assigneeId: "1",
      suspectedUserId: "1",
      suspectTypeId: 1,
      logId: "1",
    },
    {
      id: "2",
      caseStatus: 1,
      title: "Case 2",
      description: "Case 2 description",
      riskScore: 45,
      threatPageUrl: "https://youtube.com",
      assigneeId: "1",
      suspectedUserId: "1",
      suspectTypeId: 1,
      logId: "2",
    },
    {
      id: "3",
      caseStatus: 1,
      title: "Case 34",
      description: "Case 3 description",
      riskScore: 23,
      threatPageUrl: "https://youtube.com",
      assigneeId: "1",
      suspectedUserId: "1",
      suspectTypeId: 1,
      logId: "3",
    },
  ];
}

export async function seed() {
  try {
    await Promise.all(
      getCases().map((row) => {
        const {
          id,
          caseStatus,
          title,
          description,
          riskScore,
          threatPageUrl,
          assigneeId,
          suspectedUserId,
          logId,
        } = row;

        return db.case.create({
          data: {
            id,
            caseStatus,
            title,
            description,
            riskScore,
            threatPageUrl,
            assigneeId,
            suspectedUserId,
            logId,
          },
        });
      })
    );
  } catch (error) {
    console.log(error);
  }
}
