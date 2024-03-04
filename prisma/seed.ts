import { db } from "../src/utils/db.server";

type Case = {
  caseStatus: number;
  title: string;
  description: string;
  riskStatus: string;
  riskScore: number;
  threatPageUrl: string;
  assigneeId?: string;
  suspectedUserId?: string;
  suspectTypeId: number;
};

// function getSuspectCases(): SuspectCase[] {
//   return [
//     {
//       title: "after hour login",
//     },
//     {
//       title: "potential account sharing",
//     },
//     {
//       title: "terminated employee login",
//     },
//     {
//       title: "failed attempt to enter building",
//     },
//     {
//       title: "impossible traveller",
//     },
//     {
//       title: "potential data exfiltration",
//     },
//   ];
// }

function getCases(): Case[] {
  return [
    {
      caseStatus: 2,
      title: "Potential Account Sharing Over 3 Days",
      description:
        "A potential account sharing threat that occurred in the morning.\n\nThis threat has started since 2 days ago.",
      riskStatus: "high",
      riskScore: 80,
      threatPageUrl: "http://localhost:5173/threats/1",
      assigneeId: "77e748dc-1bb4-4a16-bc0f-b44ee5d441e3",
      suspectedUserId: "43338880-0714-498d-85d7-14d379a9dd41",
      suspectTypeId: 2,
    },
    {
      caseStatus: 1,
      title: "After Hour Login for the past 2 weeks",
      description:
        "After hour login threat usually occurred at:\n1. 8pm to 11pm, Singapore Time\n2. Logged in on every Monday, Wednesday and Friday.",
      riskStatus: "medium",
      riskScore: 60,
      threatPageUrl: "http://localhost:5173/threats/2",
      assigneeId: "7c0e24e2-294c-4dd6-8116-92c659802c96",
      suspectTypeId: 1,
    },
    {
      caseStatus: 1,
      title: "After Hour Login Attempts Over 1 Week",
      description:
        "Multiple Failed Login Attempts Over 1 Week.\n\nThis threat usually occurs at night 11.59pm (Singapore Time GMT+8).",
      riskStatus: "medium",
      riskScore: 50,
      threatPageUrl: "http://localhost:5173/threats/3",
      suspectTypeId: 1,
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
          riskStatus,
          riskScore,
          threatPageUrl,
          assigneeId,
          suspectedUserId,
          suspectTypeId,
        } = row;

        return db.case.create({
          data: {
            caseStatus,
            title,
            description,
            riskStatus,
            riskScore,
            threatPageUrl,
            assigneeId,
            suspectedUserId,
            suspectTypeId,
          },
        });
      })
    );
  } catch (error) {
    console.log(error);
  }
}

seed();
