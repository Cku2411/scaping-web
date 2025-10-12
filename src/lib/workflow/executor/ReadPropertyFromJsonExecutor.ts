import { ExecutionEnviromentType } from "@/types/executorType";
import { waitFor } from "@/lib/helper/waitFor";
import { ClickElementTask } from "../task/ClickElement";
import { ReadDataFromJSONTask } from "../task/ReadDataFormJson";

export const ReadeProperFromJsonExecutor = async (
  enviroment: ExecutionEnviromentType<typeof ReadDataFromJSONTask>
): Promise<boolean> => {
  try {
    const JsonData = enviroment.getInput("JSON");
    if (!JsonData) {
      enviroment.log.error("input=> JsonData is not defined");
      return false;
    }

    const propertyName = enviroment.getInput("Property name");
    if (!propertyName) {
      enviroment.log.error("input=> propertyName is not defined");
      return false;
    }

    const json = JSON.parse(JsonData);
    const propertyValue = json[0][propertyName];

    if (!propertyValue) {
      enviroment.log.error("property not found");
      return false;
    }

    enviroment.setOutput("Property value", propertyValue);

    // return browsser form puppeteer
    return true;
  } catch (error: any) {
    enviroment.log.error(error.message);
    return false;
  }
};
