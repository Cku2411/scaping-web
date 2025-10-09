import { ExecutionEnviromentType } from "@/types/executorType";
import { waitFor } from "@/lib/helper/waitFor";
import { ClickElementTask } from "../task/ClickElement";

export const ClickElementExecutor = async (
  enviroment: ExecutionEnviromentType<typeof ClickElementTask>
): Promise<boolean> => {
  try {
    const selector = enviroment.getInput("Selector");
    if (!selector) {
      enviroment.log.error("input=> selector is not defined");
    }

    // return browsser form puppeteer
    await enviroment.getPage()!.click(selector);
    return true;
  } catch (error: any) {
    enviroment.log.error(error.message);
    return false;
  }
};
