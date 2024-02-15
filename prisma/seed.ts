import { db } from "../src/utils/db.server";

type Case = {
  title: string;
  description: string;
  risk_status: string;
  risk_score: number;
  threat_page_url: string;
};

type User = {
  firstname: string;
  lastname: string;
  role: number;
  risk_score: number;
  suspect: number;
};

function getCases(): Case[] {
  return [
    {
      title: "Case 1",
      description: "Case 1 description",
      risk_status: "High",
      risk_score: 85,
      threat_page_url: "https://youtube.com",
    },
    {
      title: "Case 2",
      description: "Case 2 description",
      risk_status: "Medium",
      risk_score: 45,
      threat_page_url: "https://youtube.com",
    },
    {
      title: "Case 3",
      description: "Case 3 description",
      risk_status: "Low",
      risk_score: 23,
      threat_page_url: "https://youtube.com",
    },
  ];
}

function getUsers(): User[] {
  return [
    {
      firstname: "John",
      lastname: "Doe",
      role: 0,
      risk_score: 0,
      suspect: 0,
    },
    {
      firstname: "Alice",
      lastname: "Doe",
      role: 1,
      risk_score: 0,
      suspect: 0,
    },
    {
      firstname: "Bob",
      lastname: "Doe",
      role: 2,
      risk_score: 0,
      suspect: 0,
    },
  ];
}

async function seed() {
  try {
    await Promise.all(
      getCases().map((row) => {
        const { title, description, risk_status, risk_score, threat_page_url } =
          row;

        return db.case.create({
          data: {
            title,
            description,
            risk_status,
            risk_score,
            threat_page_url,
          },
        });
      })
    );

    await Promise.all(
      getUsers().map((row) => {
        const { firstname, lastname, role, risk_score, suspect } = row;

        return db.user.create({
          data: {
            firstname,
            lastname,
            role,
            risk_score,
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
