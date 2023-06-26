import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

import { generateSteps, listAdditions, saveAddition } from "./steps.controller";

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { pageSize, pageNum } = req.query;
    const savedAdditions = await listAdditions(pageNum, pageSize);
    res.status(200).json({ success: true, data: savedAdditions });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
  next();
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { steps } = req.body;
    const savedEntry = await saveAddition(steps);
    res.status(200).json({ success: true, data: savedEntry });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
  next();
});

router.get("/generate", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { num1, num2 } = req.query;

    if (!num1 || !num2) {
      throw new Error("Invalid input. Both num1 and num2 must be passed.");
    }

    const num1String = num1.toString();
    const num2String = num2.toString();

    const regexForPositiveInteger = /^[0-9]*$/;
    if (
      !regexForPositiveInteger.test(num1String) ||
      !regexForPositiveInteger.test(num2String)
    ) {
      throw new Error(
        "Invalid input. Please enter positive integers for num1 and num2."
      );
    }

    const steps = generateSteps(num1.toString(), num2String);
    res.status(200).json({ success: true, data: steps });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
  next();
});

export default router;
