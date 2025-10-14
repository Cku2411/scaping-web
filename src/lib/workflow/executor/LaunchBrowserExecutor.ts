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
      args: ["--proxy-server=brd.superproxy.io:33335"],
    });
    enviroment.log.info(`Browser started successfully`);
    enviroment.setBrowser(browser);
    const page = await browser.newPage();
    // Set screen size.
    await page.setViewport({ width: 1080, height: 1024 });
    await page.authenticate({
      username: "brd-customer-hl_5d8090a5-zone-datacenter_proxy2",
      password: "lab0m7gazajw",
    });
    await page.goto(websiteUrl);

    // add Page
    enviroment.setPage(page);
    enviroment.log.info(`Done add page, return True`);
  } catch (error: any) {
    enviroment.log.error(error.mesage);
    return false;
  }
  return true;
};
