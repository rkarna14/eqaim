import { Steps } from "../types";
import ApiRequest from "./apiRequest";

export const generateSteps = (num1: string, num2: string) => {
  return ApiRequest({
    method: "GET",
    url: "steps/generate",
    params: { num1, num2 },
  });
};

export const saveSteps = async (steps: Steps) => {
  return ApiRequest({
    method: "POST",
    url: "steps",
    data: { steps },
  });
};
