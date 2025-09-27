import { waitFor } from "@/lib/helper/waitFor";
import { EnviromentType } from "@/types/executorType";
import puppeteer from "puppeteer";

export const LaunchBrowserExecutor = async (
  enviroment: any
): Promise<boolean> => {
  console.log(`Running launch browser:`, JSON.stringify(enviroment, null, 4));
  try {
    const browser = await puppeteer.launch({
      headless: false,
    });

    await waitFor(3000);
    await browser.close();
  } catch (error) {
    console.error(error);
    return false;
  }

  return true;
};
