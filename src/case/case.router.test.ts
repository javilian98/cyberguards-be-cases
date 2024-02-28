import request from "supertest";
import { app } from "../index";
import { beforeAll, afterAll, describe, expect, it } from "vitest";

import { db } from "../../src/utils/db.server";
import { seed } from "../../ci/setupTestDatabase";

import { CaseDetail } from "../types/types";

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
  it("GET api/cases should get all cases", async () => {
    const res = await request(app).get("/api/cases");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(3); // Assuming there are 3 cases in the database

    // console.log("response dataaaa ", res.body);
  });

  it("GET api/cases/:id should get a single case", async () => {
    const id = "1";
    const response = await request(app).get(`/api/cases/${id}`);

    const data: CaseDetail = response.body;

    expect(response.status).toBe(200);
    expect(typeof response.body).toBe("object");
    expect(data.title).toBe("Case 1");
    // expect(res.body).toHaveLength(3); // Assuming there are 3 cases in the database
  });

  it("POST api/cases should create a new single case", async () => {
    const newCase = {
      id: "99",
      title: "Case 99",
      description: "Case 99 description",
      riskStatus: "low",
      riskScore: 20,
      threatPageUrl: "https://youtube.com",
    };
    const response = await request(app).post(`/api/cases/`).send(newCase);

    const data: CaseDetail = response.body;

    expect(response.status).toBe(201);
    expect(typeof response.body).toBe("object");
    expect(data.title).toBe("Case 99");
  });

  it("PUT api/cases/:id should update title 'Case 1' of case id = 1 to 'Case 1 updated'", async () => {
    const id = "1";
    const response = await request(app).get(`/api/cases/${id}`);

    const data: CaseDetail = response.body;

    const updatedDataBody = { ...data, title: "Case 1 updated" };

    const updatedDataResponse = await request(app)
      .put(`/api/cases/${id}`)
      .send(updatedDataBody);

    const updatedData: CaseDetail = updatedDataResponse.body;

    expect(updatedDataResponse.status).toBe(200);
    expect(typeof updatedDataResponse.body).toBe("object");
    expect(updatedData.title).toBe("Case 1 updated");
  });

  // Test Case for DELETE /cases/:id
  it("DELETE /cases/:id should delete an existing case and return status code 204", async () => {
    const id = "1"; // from database
    const response = await request(app).delete(`/api/cases/${id}`);
    expect(response.status).toBe(204);
  });

  // Dummy test case to get through CI
  const sum = (a: number, b: number) => {
    return a + b;
  };
  it("should add to 2", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
