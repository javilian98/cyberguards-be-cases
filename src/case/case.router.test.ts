import request from "supertest";
import { app } from "../index";
import { beforeAll, afterAll, describe, expect, test } from "vitest";

import { db } from "../../src/utils/db.server";
import { seed } from "../../ci/setupTestDatabase";

import { Case } from "../types/types";

beforeAll(async () => {
  await seed();
});

afterAll(async () => {
  const deleteCases = db.case.deleteMany();

  await db.$transaction([deleteCases]);

  await db.$disconnect();
});

describe("Case Routes", () => {
  //   // Test GET /api/cases
  test.sequential("GET api/cases should get all cases", async () => {
    const res = await request(app).get("/api/cases");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(3); // Assuming there are 3 cases in the database

    // console.log("response dataaaa ", res.body);
  });

  test.sequential("GET api/cases/:id should get a single case", async () => {
    const id = "1";
    const response = await request(app).get(`/api/cases/${id}`);

    const data: Case = response.body;

    expect(response.status).toBe(200);
    expect(typeof response.body).toBe("object");
    expect(data.title).toBe("Case 1");
    // expect(res.body).toHaveLength(3); // Assuming there are 3 cases in the database
  });

  test.sequential("POST api/cases should create a new case", async () => {
    const newCase: Case = {
      id: "99",
      caseStatus: 1,
      title: "Case 99",
      description: "Case 99 description",
      riskScore: 20,
      threatPageUrl: "https://youtube.com",
      assigneeId: "1",
      suspectedUserId: "1",
      suspectTypeId: 1,
      logId: "255",
    };
    const response = await request(app).post(`/api/cases`).send(newCase);

    const data: Case = response.body;

    expect(response.status).toBe(201);
    expect(typeof response.body).toBe("object");
    expect(data.title).toBe("Case 99");
  });

  test.sequential(
    "PUT api/cases/:id should update title 'Case 1' of case id = 1 to 'Case 1 updated'",
    async () => {
      const id = "1";
      const response = await request(app).get(`/api/cases/${id}`);

      const data: Case = response.body;
      console.log("put: data ", data);

      const updatedDataBody = { ...data, title: "Case 1 updated" };

      const updatedDataResponse = await request(app)
        .put(`/api/cases/${id}`)
        .send(updatedDataBody);

      const updatedData: Case = updatedDataResponse.body;

      console.log("updatedDataResponse log >> ", updatedDataResponse.body);

      expect(updatedDataResponse.status).toBe(200);
      expect(typeof updatedDataResponse.body).toBe("object");
      expect(updatedData.title).toBe("Case 1 updated");
    }
  );

  // Test Case for DELETE /cases/:id
  test.sequential(
    "DELETE /cases/:id should delete an existing case and return status code 204",
    async () => {
      const id = "1"; // from database
      const response = await request(app).delete(`/api/cases/${id}`);
      expect(response.status).toBe(204);
    }
  );

  // // Dummy test case to get through CI
  // const sum = (a: number, b: number) => {
  //   return a + b;
  // };
  // test("should add to 2", () => {
  //   expect(sum(1, 2)).toBe(3);
  // });
});
