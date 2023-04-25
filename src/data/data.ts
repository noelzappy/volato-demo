import * as Crypto from "expo-crypto";
import { FormModel } from "../types/misc";

export const ModelOne: FormModel = {
  name: "Hash of Strings",
  fields: {
    string1: {
      label: "String 1",
      type: "string",
      readOnly: false,
      calculate: null,
      value: "",
    },
    string2: {
      label: "String 2",
      type: "string",
      readOnly: false,
      calculate: null,
      value: "",
    },
    hash: {
      label: "Hash",
      type: "number",
      readOnly: true,
      calculate: async (model: any) => {
        if (model.string1.value === "" || model.string2.value === "") return "";

        const data = `${model.string1.value},${model.string2.value}`;
        const hash = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          data
        );
        return hash;
      },
    },
  },
};

export const ModelTwo: FormModel = {
  name: "Statistics of 10 Numbers",
  fields: {
    num1: {
      label: "Number 1",
      type: "number",
      readOnly: false,
      calculate: null,
      value: "",
    },
    num2: {
      label: "Number 2",
      type: "number",
      readOnly: false,
      calculate: null,
      value: "",
    },
    num3: {
      label: "Number 3",
      type: "number",
      readOnly: false,
      calculate: null,
      value: "",
    },
    num4: {
      label: "Number 4",
      type: "number",
      readOnly: false,
      calculate: null,
      value: "",
    },
    num5: {
      label: "Number 5",
      type: "number",
      readOnly: false,
      calculate: null,
      value: "",
    },
    num6: {
      label: "Number 6",
      type: "number",
      readOnly: false,
      calculate: null,
      value: "",
    },
    num7: {
      label: "Number 7",
      type: "number",
      readOnly: false,
      calculate: null,
      value: "",
    },
    num8: {
      label: "Number 8",
      type: "number",
      readOnly: false,
      calculate: null,
      value: "",
    },
    num9: {
      label: "Number 9",
      type: "number",
      readOnly: false,
      calculate: null,
      value: "",
    },
    num10: {
      label: "Number 10",
      type: "number",
      readOnly: false,
      calculate: null,
      value: "",
    },

    mean: {
      label: "Mean",
      type: "number",
      readOnly: true,
      calculate: (model: any) => {
        const numbers = Object.values(model).reduce((acc: any, curr: any) => {
          if (curr.type === "number" && curr.value !== "") {
            const num = Number.isNaN(parseFloat(curr.value))
              ? 0
              : parseFloat(curr.value);
            return [...acc, num];
          }
          return acc;
        }, []) as number[];

        const sum = numbers.reduce((a, b) => a + b, 0);
        const mean = sum / numbers.length || 0;
        return mean.toFixed(2);
      },
    },
    median: {
      label: "Median",
      type: "number",
      readOnly: true,
      calculate: (model: any) => {
        const numbers = Object.values(model).reduce((acc: any, curr: any) => {
          if (curr.type === "number" && curr.value !== "") {
            const num = Number.isNaN(parseFloat(curr.value))
              ? 0
              : parseFloat(curr.value);
            return [...acc, num];
          }
          return acc;
        }, []) as number[];

        numbers.sort((a: number, b: number) => a - b);
        const middle = Math.floor(numbers.length / 2);
        const isEven = numbers.length % 2 === 0;
        return isEven
          ? ((numbers[middle] + numbers[middle - 1]) / 2).toFixed(2)
          : numbers[middle].toFixed(2);
      },
    },
    standard_deviation: {
      label: "Standard Deviation",
      type: "number",
      readOnly: true,
      calculate: (model: any) => {
        const numbers = Object.values(model).reduce((acc: any, curr: any) => {
          if (curr.type === "number" && curr.value !== "") {
            const num = Number.isNaN(parseFloat(curr.value))
              ? 0
              : parseFloat(curr.value);
            return [...acc, num];
          }
          return acc;
        }, []) as number[];

        const mean = numbers.reduce((a, b) => a + b) / numbers.length;
        const squareDiffs = numbers.map((value) => {
          const diff = value - mean;
          const sqrDiff = diff * diff;
          return sqrDiff;
        });
        const avgSquareDiff =
          squareDiffs.reduce((a, b) => a + b) / squareDiffs.length;
        const stdDev = Math.sqrt(avgSquareDiff);
        return stdDev.toFixed(2);
      },
    },
  },
};
