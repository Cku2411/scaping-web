import { ExecutionEnviromentType } from "@/types/executorType";
import { ExtractTextFromHtml } from "../task/ExtractTextFromElement";
import * as cheerio from "cheerio";

export const ExtractTextFromElementExecutor = async (
  enviroment: ExecutionEnviromentType<typeof ExtractTextFromHtml>
): Promise<boolean> => {
  try {
    const selector = enviroment.getInput("Selector");
    if (!selector) {
      enviroment.log.error("selector is not provided");
      return false;
    }
    const html = enviroment.getInput("Html");
    if (!html) {
      enviroment.log.error("Html is not provided");

      return false;
    }

    // extract from selector

    const $ = cheerio.load(html);
    const element = $(selector);

    if (!element) {
      enviroment.log.error("Element is not found");
      return false;
    }

    const extractedText = $.text(element);
    if (!extractedText) {
      enviroment.log.error("Element has no text");
      return false;
    }
    enviroment.setOutput("Extracted text", extractedText);
    return true;
  } catch (error: any) {
    enviroment.log.error(error.message);

    return false;
  }
};
