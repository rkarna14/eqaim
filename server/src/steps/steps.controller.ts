import { getSavedAdditions, saveSteps } from "./steps.service";

export type Step = {
  carryString: string;
  sumString: string;
};

export type Steps = {
  [index: string]: Step;
};

const generateSeriesOfSteps = (
  largerNumberArray: string[],
  smallerNumberArray: string[]
) => {
  const steps: Step[] = [];
  let carryToBeEvaluated = 0;

  largerNumberArray.forEach((currentDigit: string, index: number) => {
    const digit1 = parseInt(currentDigit);
    const digit2 = parseInt(smallerNumberArray[index]) || 0;
    const sum = digit1 + digit2 + carryToBeEvaluated;

    carryToBeEvaluated = Math.floor(sum / 10);

    const sumDigit = (sum % 10).toString();
    const carryDigit = carryToBeEvaluated.toString();

    let carryString = "";
    let sumString = "";

    if (index === 0) {
      carryString = `${carryDigit}_`;
      sumString = sumDigit;
    } else if (index === largerNumberArray.length - 1) {
      carryString = `${steps[index - 1].carryString}`;
      sumString = `${sum}${steps[index - 1].sumString}`;
    } else {
      carryString = `${carryDigit}${steps[index - 1].carryString}`;
      sumString = `${sumDigit}${steps[index - 1].sumString}`;
    }

    steps.push({ carryString, sumString });
  });
  return steps.reduce((acc: Steps, step: Step, index: number) => {
    return { ...acc, [`step${index + 1}`]: step };
  }, {});
};

export const generateSteps = (firstN: string, secondN: string) => {
  const firstNReversed = firstN.toString().split("").reverse();
  const secondNReversed = secondN.toString().split("").reverse();

  const steps =
    firstNReversed.length > secondNReversed.length
      ? generateSeriesOfSteps(firstNReversed, secondNReversed)
      : generateSeriesOfSteps(secondNReversed, firstNReversed);

  return steps;
};

export const listAdditions = (pageNumParam: any, pageSizeParam: any) => {
  const parsedPageNum = parseInt(pageNumParam);
  const parsedPageSize = parseInt(pageSizeParam);

  const pageNum = isNaN(parsedPageNum) ? 1 : parsedPageNum;
  const pageSize = isNaN(parsedPageSize) ? 10 : parsedPageSize;

  if (pageNum < 1 || pageSize < 1) {
    throw new Error(
      "Invalid input. Both pageNum and pageSize must be positive integers."
    );
  }

  return getSavedAdditions(pageNum, pageSize);
};

export const saveAddition = async (steps) => {
  const savedAddition = await saveSteps(steps);
  return savedAddition;
};
