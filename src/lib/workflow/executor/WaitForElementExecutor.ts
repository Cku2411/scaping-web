import { ExecutionEnviromentType } from "@/types/executorType";
import { WaitForElementTask } from "../task/WaitForElementTask";

export const WaitForElementExecutor = async (
  enviroment: ExecutionEnviromentType<typeof WaitForElementTask>
): Promise<boolean> => {
  try {
    const selector = enviroment.getInput("Selector");
    if (!selector) {
      enviroment.log.error("input=> selector is not defined");
      return false;
    }

    const visibility = enviroment.getInput("Visibility");
    if (!selector) {
      enviroment.log.error("input=> visibility is not defined");
      return false;
    }

    // return browsser form puppeteer
    await enviroment.getPage()!.waitForSelector(selector, {
      visible: visibility === "visible",
      hidden: visibility === "hidden",
    });

    enviroment.log.info(`Element ${selector} became :${visibility}`);
    return true;
  } catch (error: any) {
    enviroment.log.error(error.message);
    return false;
  }
};
