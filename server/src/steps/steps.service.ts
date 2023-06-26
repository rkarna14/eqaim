import { AppDataSource } from "../dataSource";
import { Addition } from "../entities/addition.entity";
import { Steps } from "./steps.controller";

export const saveSteps = async (steps: Steps) => {
  const addition = new Addition();
  addition.steps = steps;
  const savedEntry = await AppDataSource.manager.save(addition);
  return savedEntry;
};

export const getSavedAdditions = async (pageNum: number, pageSize: number) => {
  console.log("pageNum", pageNum);
  console.log("pageSize", pageSize);
  const allAdditions = await AppDataSource.manager.find(Addition, {
    skip: (pageNum - 1) * pageSize,
    take: pageSize,
  });
  return allAdditions;
};
