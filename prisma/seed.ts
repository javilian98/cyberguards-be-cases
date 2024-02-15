import { db } from "../src/utils/db.server";

type Case = {
  title: string;
  description: string;
  riskStatus: string;
  riskScore: number;
  threatPageUrl: string;
};

type User = {
  firstName: string;
  lastName: string;
  role: number;
  riskScore: number;
  suspect: number;
};

function getCases(): Case[] {
  return [
    {
      title: "Case 1",
      description: "Case 1 description",
      riskStatus: "High",
      riskScore: 85,
      threatPageUrl: "https://youtube.com",
    },
    {
      title: "Case 2",
      description: "Case 2 description",
      riskStatus: "Medium",
      riskScore: 45,
      threatPageUrl: "https://youtube.com",
    },
    {
      title: "Case 3",
      description: "Case 3 description",
      riskStatus: "Low",
      riskScore: 23,
      threatPageUrl: "https://youtube.com",
    },
  ];
}

function getUsers(): User[] {
  return [
    {
      firstName: "John",
      lastName: "Doe",
      role: 0,
      riskScore: 0,
      suspect: 0,
    },
    {
      firstName: "Alice",
      lastName: "Doe",
      role: 1,
      riskScore: 0,
      suspect: 0,
    },
    {
      firstName: "Bob",
      lastName: "Doe",
      role: 2,
      riskScore: 0,
      suspect: 0,
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
          },
        });
      })
    );

    await Promise.all(
      getUsers().map((row) => {
        const { firstName, lastName, role, riskScore, suspect } = row;

        return db.user.create({
          data: {
            firstName,
            lastName,
            role,
            riskScore,
            suspect,
          },
        });
      })
    );
  } catch (error) {
    console.log(error);
  }
}

seed();
