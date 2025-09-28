import { EnviromentType, ExecutionEnviromentType } from "@/types/executorType";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/launchBrowser";

export const LaunchBrowserExecutor = async (
  enviroment: ExecutionEnviromentType<typeof LaunchBrowserTask>
): Promise<boolean> => {
  try {
    const websiteUrl = enviroment.getInput("Website URL");
    console.log(`@WEBSITE URL`, websiteUrl);

    const browser = await puppeteer.launch({
      headless: false,
    });
    enviroment.setBrowser(browser);
    const page = await browser.newPage();
    await page.goto(websiteUrl);

    // Set screen size.
    await page.setViewport({ width: 1080, height: 1024 });

    // add Page
    enviroment.setPage(page);

    console.log(`Done add page, return True`);
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
};
