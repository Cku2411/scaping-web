import { ExecutionEnviromentType } from "@/types/executorType";
import { NavigateUrTask } from "../task/Navigate_url";

export const NavigateUrlExecutor = async (
  enviroment: ExecutionEnviromentType<typeof NavigateUrTask>
): Promise<boolean> => {
  try {
    const url = enviroment.getInput("Url");
    if (!url) {
      enviroment.log.error("input=> url is not defined");
      return false;
    }
    await enviroment.getPage()!.goto(url);
    enviroment.log.info(`visited url ${url}`);
    // return browsser form puppeteer
    return true;
  } catch (error: any) {
    enviroment.log.error(error.message);
    return false;
  }
};
