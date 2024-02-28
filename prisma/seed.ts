import { db } from "../src/utils/db.server";

type Case = {
  title: string;
  description: string;
  riskStatus: string;
  riskScore: number;
  threatPageUrl: string;
  assigneeId?: string;
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
      title: "Case 1",
      description: "Case 1 description",
      riskStatus: "high",
      riskScore: 85,
      threatPageUrl: "https://youtube.com",
      assigneeId: "12457c20-4a28-4617-94f3-ad86d30133b7",
    },
    {
      title: "Case 2",
      description: "Case 2 description",
      riskStatus: "medium",
      riskScore: 45,
      threatPageUrl: "https://youtube.com",
      assigneeId: "7c0e24e2-294c-4dd6-8116-92c659802c96",
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

async function seed() {
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

seed();
