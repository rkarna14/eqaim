"use client";

import { useState } from "react";
import { Steps } from "./types";
import { generateSteps, saveSteps } from "./api/steps.api";
import JSONView from "./components/JsonView";

type FormValue = {
  num1: number;
  num2: number;
};

export default function Home() {
  let [formValue, setFormValue] = useState<FormValue>({
    num1: 1489,
    num2: 714,
  });

  let [steps, setSteps] = useState<Steps | null>(null);

  const handleFormValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const generateStepsHandler = async () => {
    try {
      const response = await generateSteps(
        formValue.num1.toString(),
        formValue.num2.toString()
      );
      if (response.success) {
        setSteps(response.data);
      }
    } catch (error: any) {
      alert(
        `Error occurred while generating steps. \n Error: ${error.message}`
      );
    }
  };

  const saveStepsToDatabaseHandler = async () => {
    if (steps) {
      const response = await saveSteps(steps);
      if (response.success) {
        alert("Steps saved to database successfully");
      } else {
        alert(
          `Error occurred while saving steps to database. \n Error: ${response.message}`
        );
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col">
      <div className="text-xl p-4 bg-custom-gray w-full font-bold">
        Step Addition
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="grid flex-col items-center justify-center w-full ">
          <div className="flex py-2">
            <span className="w-44">First Number:</span>
            <input
              className="text-right"
              type="number"
              name="num1"
              value={formValue.num1}
              onChange={handleFormValueChange}
            ></input>
          </div>
          <div className="flex py-2">
            <span className="w-44">Second Number:</span>
            <input
              className="text-right"
              type="number"
              name="num2"
              value={formValue.num2}
              onChange={handleFormValueChange}
            ></input>
          </div>
          <div className="flex justify-end py-5">
            <button
              className="border-2 border-gray-500 px-4 py-2 rounded-md"
              onClick={generateStepsHandler}
            >
              Generate Steps
            </button>
          </div>
          {steps && (
            <>
              <div className="p-5 bg-custom-gray">
                <JSONView data={steps} />
              </div>
              <div className="flex justify-end py-5">
                <button
                  onClick={saveStepsToDatabaseHandler}
                  className="bg-custom-green px-4 py-2 "
                >
                  Save results to DB
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
