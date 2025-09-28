import { ExecutionEnviromentType } from "@/types/executorType";
import { ExtractTextFromHtml } from "../task/ExtractTextFromElement";
import * as cheerio from "cheerio";

export const ExtracTextFromElementExecutor = async (
  enviroment: ExecutionEnviromentType<typeof ExtractTextFromHtml>
): Promise<boolean> => {
  try {
    const selector = enviroment.getInput("Selector");
    if (!selector) {
      return false;
    }
    const html = enviroment.getInput("Html");
    if (!html) {
      return false;
    }

    // extract from selector

    const $ = cheerio.load(html);
    const element = $(selector);

    if (!element) {
      console.error("Element not found");
      return false;
    }

    const extractedText = $.text(element);
    if (!extractedText) {
      console.error("Element has no text");
      return false;
    }
    enviroment.setOutput("Extracted text", extractedText);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
