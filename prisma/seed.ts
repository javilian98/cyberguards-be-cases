import { db } from "../src/utils/db.server";

type Case = {
  caseStatus: number;
  title: string;
  description: string;
  riskScore: number;
  assigneeId?: string;
  employeeId?: string;
};

function getCases(): Case[] {
  return [
    {
      caseStatus: 2,
      title: "Suspecious Building Access Over 3 Days",
      description:
        "A potential account sharing threat that occurred in the morning.\n\nThis threat has started since 2 days ago.",
      riskScore: 80,
      assigneeId: "77e748dc-1bb4-4a16-bc0f-b44ee5d441e3",
      employeeId: "1",
    },
    {
      caseStatus: 1,
      title: "After Hour Login for the past 2 weeks",
      description:
        "After hour login threat usually occurred at:\n1. 8pm to 11pm, Singapore Time\n2. Logged in on every Monday, Wednesday and Friday.",
      riskScore: 60,
      assigneeId: "7c0e24e2-294c-4dd6-8116-92c659802c96",
      employeeId: "2",
    },
    {
      caseStatus: 1,
      title: "After Hour Login Attempts Over 1 Week",
      description:
        "Multiple Failed Login Attempts Over 1 Week.\n\nThis threat usually occurs at night 11.59pm (Singapore Time GMT+8).",
      riskScore: 50,
      employeeId: "3",
    },
  ];
}

async function seed() {
  try {
    await Promise.all(
      getCases().map((row) => {
        const {
          caseStatus,
          title,
          description,
          riskScore,
          assigneeId,
          employeeId,
        } = row;

        return db.case.create({
          data: {
            caseStatus,
            title,
            description,
            riskScore,
            assigneeId,
            employeeId,
          },
        });
      })
    );
  } catch (error) {
    console.log(error);
  }
}

seed();
