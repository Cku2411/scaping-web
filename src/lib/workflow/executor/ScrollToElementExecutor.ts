import { ExecutionEnviromentType } from "@/types/executorType";
import { ScrollElementTask } from "../task/SrollElement";
import { waitFor } from "@/lib/helper/waitFor";

export const ScrollToElementExecutor = async (
  enviroment: ExecutionEnviromentType<typeof ScrollElementTask>
): Promise<boolean> => {
  try {
    const selector = enviroment.getInput("Selector");
    if (!selector) {
      enviroment.log.error("input=> selector is not defined");
      return false;
    }

    // return browsser form puppeteer
    await enviroment.getPage()!.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (!element) {
        throw new Error("Element not found");
      }
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top });
    }, selector);
    waitFor(3000);
    return true;
  } catch (error: any) {
    enviroment.log.error(error.message);
    return false;
  }
};
