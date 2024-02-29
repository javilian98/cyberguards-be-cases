import express from "express";
import type { Request, Response } from "express";
import { body, query, validationResult } from "express-validator";

import * as CaseService from "./case.service";

export const caseRouter = express.Router();

caseRouter.get(
  "/",
  query("skip")
    .optional()
    .isNumeric()
    .toInt()
    .withMessage("Skip must be a number"),
  query("take")
    .optional()
    .isNumeric()
    .toInt()
    .withMessage("Take must be a number")
    .isInt({ max: 50 })
    .withMessage("Take must be less than or equal to 50."),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const queries = {
        skip: request.query.skip ? Number(request.query.skip) : undefined,
        take: request.query.take ? Number(request.query.take) : undefined,
      };

      const cases = await CaseService.getCaseList(queries);

      return response.status(200).json(cases);
    } catch (error: any) {
      console.log(error);
      return response.status(500).json(error.message);
    }
  }
);

caseRouter.get("/:id", async (request: Request, response: Response) => {
  try {
    const singleCase = await CaseService.getCase(request.params.id);
    if (!singleCase) {
      return response.status(404).json("Case cannot be not found.");
    }
    return response.status(200).json(singleCase);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// POST: Create a Case
// PARAMS: title, description, risk_status, risk_score, threat_page_url
caseRouter.post(
  "/",
  body("title").isString(),
  body("description").isString(),
  body("riskStatus").isString(),
  body("riskScore").isNumeric(),
  body("threatPageUrl").isString(),
  body("assigneeId").isString(),
  body("suspectedUserId").isString(),
  body("suspectTypeId").isNumeric(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const caseItem = request.body;
      const newCase = await CaseService.createCase(caseItem);
      return response.status(201).json(newCase);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// PUT: Update a Case
// PARAMS: title, description, risk_status, risk_score, threat_page_url
caseRouter.put(
  "/:id",
  body("title").isString(),
  body("description").isString(),
  body("riskStatus").isString(),
  body("riskScore").isNumeric(),
  body("threatPageUrl").isString(),
  body("assigneeId").isString(),
  body("suspectedUserId").isString(),
  body("suspectTypeId").isNumeric(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const caseItem = request.body;
      const updatedCase = await CaseService.updateCase(
        caseItem,
        request.params.id
      );

      return response.status(200).json(updatedCase);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// DELETE: Delete a Case based on its uuid
caseRouter.delete("/:id", async (request: Request, response: Response) => {
  try {
    await CaseService.deleteCase(request.params.id);
    return response.status(204).json("Case has been successfully deleted.");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});
