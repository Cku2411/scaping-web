import { ExecutionEnviromentType } from "@/types/executorType";
import { AddPropertyToJsonTask } from "../task/AddPropertyToJson";

export const AddPropertyToJsonExecutor = async (
  enviroment: ExecutionEnviromentType<typeof AddPropertyToJsonTask>
): Promise<boolean> => {
  try {
    const jsonData = enviroment.getInput("JSON");

    if (!jsonData) {
      enviroment.log.error("jsonData is not provided");
      return false;
    }

    const propertyName = enviroment.getInput("Property name");

    if (!propertyName) {
      enviroment.log.error("propertyName is not provided");
      return false;
    }

    const propertyValue = enviroment.getInput("Property value");

    if (!propertyValue) {
      enviroment.log.error("propertyValue is not provided");
      return false;
    }

    // update Json
    const json = JSON.parse(jsonData);
    json[propertyName] = propertyValue;

    enviroment.setOutput("Update JSON", JSON.stringify(json));

    return true;
  } catch (error: any) {
    enviroment.log.error(error.message);

    return false;
  }
};
