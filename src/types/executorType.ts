import { Browser, Page } from "puppeteer";
import { WorkflowTask } from "./workfowTypes";

export type EnviromentType = {
  browser?: Browser;
  page?: Page;
  // phase with phaseId as key
  phases: {
    [key: string]: {
      inputs: Record<string, string>;
      outputs: Record<string, string>;
    };
  };
};

export type ExecutionEnviromentType<T extends WorkflowTask> = {
  getInput(name: T["inputs"][number]["name"]): string;
  getBrowser(): Browser | undefined;
  setBrowser(browser: Browser): void;

  getPage(): Page | undefined;
  setPage(page: Page): void;
};
