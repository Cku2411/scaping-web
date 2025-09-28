import { TaskType } from "@/types/taskType";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";
import { pageToHtlmExecutor } from "./PageToHtmlExecutor";
import { ExecutionEnviromentType } from "@/types/executorType";
import { WorkflowTask } from "@/types/workfowTypes";

type ExecutorFn<T extends WorkflowTask> = (
  enviroment: ExecutionEnviromentType<T>
) => Promise<boolean>;

type RegistryType = {
  [K in TaskType]: ExecutorFn<WorkflowTask & { type: K }>;
};

export const ExecutorRegistry: RegistryType = {
  LAUNCH_BROWSER: LaunchBrowserExecutor,
  PAGE_TO_HTML: pageToHtlmExecutor,
  EXTRACT_TEXT_FROM_ELEMENT: () => Promise.resolve(true),
};
