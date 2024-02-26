import { beforeAll } from "vitest";
import { db } from "../src/utils/db.server";

// beforeAll(async () => {
type Case = {
  title: string;
  description: string;
  riskStatus: string;
  riskScore: number;
  threatPageUrl: string;
  assigneeId?: string;
};

function getCases(): Case[] {
  return [
    {
      title: "Case 1",
      description: "Case 1 description",
      riskStatus: "high",
      riskScore: 85,
      threatPageUrl: "https://youtube.com",
    },
    {
      title: "Case 2",
      description: "Case 2 description",
      riskStatus: "medium",
      riskScore: 45,
      threatPageUrl: "https://youtube.com",
    },
    {
      title: "Case 3",
      description: "Case 3 description",
      riskStatus: "low",
      riskScore: 23,
      threatPageUrl: "https://youtube.com",
    },
  ];
}

export async function seed() {
  try {
    await Promise.all(
      getCases().map((row) => {
        const { title, description, riskStatus, riskScore, threatPageUrl } =
          row;

        return db.case.create({
          data: {
            title,
            description,
            riskStatus,
            riskScore,
            threatPageUrl,
            // assigneeId: user1?.id,
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
