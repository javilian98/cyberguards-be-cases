import { beforeAll } from "vitest";
import { db } from "../src/utils/db.server";

// beforeAll(async () => {
type Case = {
  id: string;
  caseStatus: number;
  title: string;
  description: string;
  riskStatus: string;
  riskScore: number;
  threatPageUrl: string;
  assigneeId?: string;
  suspectedUserId: string;
  suspectTypeId: number;
};

function getCases(): Case[] {
  return [
    {
      id: "1",
      caseStatus: 1,
      title: "Case 1",
      description: "Case 1 description",
      riskStatus: "high",
      riskScore: 85,
      threatPageUrl: "https://youtube.com",
      assigneeId: "1",
      suspectedUserId: "1",
      suspectTypeId: 1,
    },
    {
      id: "2",
      caseStatus: 1,
      title: "Case 2",
      description: "Case 2 description",
      riskStatus: "medium",
      riskScore: 45,
      threatPageUrl: "https://youtube.com",
      assigneeId: "1",
      suspectedUserId: "1",
      suspectTypeId: 1,
    },
    {
      id: "3",
      caseStatus: 1,
      title: "Case 34",
      description: "Case 3 description",
      riskStatus: "low",
      riskScore: 23,
      threatPageUrl: "https://youtube.com",
      assigneeId: "1",
      suspectedUserId: "1",
      suspectTypeId: 1,
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
          riskStatus,
          riskScore,
          threatPageUrl,
          assigneeId,
          suspectedUserId,
        } = row;

        return db.case.create({
          data: {
            id,
            caseStatus,
            title,
            description,
            riskStatus,
            riskScore,
            threatPageUrl,
            assigneeId,
            suspectedUserId,
          },
        });
      })
    );
  } catch (error) {
    console.log(error);
  }
}

// seed();
// });
