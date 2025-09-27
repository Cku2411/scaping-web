import { Browser } from "puppeteer";

export type EnviromentType = {
  browser?: Browser;
  // phase with phaseId as key
  phases: {
    [key: string]: {
      inputs: Record<string, string>;
      outputs: Record<string, string>;
    };
  };
};
