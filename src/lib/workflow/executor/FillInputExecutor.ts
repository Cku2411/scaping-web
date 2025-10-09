import { ExecutionEnviromentType } from "@/types/executorType";
import { FillInputTask } from "../task/FillInput";
import { waitFor } from "@/lib/helper/waitFor";

export const FillInputExecutor = async (
  enviroment: ExecutionEnviromentType<typeof FillInputTask>
): Promise<boolean> => {
  try {
    const selector = enviroment.getInput("Selector");
    if (!selector) {
      enviroment.log.error("input=> selector is not defined");
    }

    const value = enviroment.getInput("Value");
    if (!value) {
      enviroment.log.error("input=> value is not defined");
    }

    // return browsser form puppeteer
    await enviroment.getPage()!.type(selector, value);
    return true;
  } catch (error: any) {
    enviroment.log.error(error.message);
    return false;
  }
};
