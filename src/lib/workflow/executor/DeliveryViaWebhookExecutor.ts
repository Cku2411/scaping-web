import { ExecutionEnviromentType } from "@/types/executorType";
import { waitFor } from "@/lib/helper/waitFor";
import { DeliverViaWebHookTask } from "../task/DeliverViaWebhook";

export const DeliveryViaWebHookExecutor = async (
  enviroment: ExecutionEnviromentType<typeof DeliverViaWebHookTask>
): Promise<boolean> => {
  try {
    const targetUrl = enviroment.getInput("Target URL");
    if (!targetUrl) {
      enviroment.log.error("input=> Target URL is not defined");
      return false;
    }

    const body = enviroment.getInput("Body");
    if (!body) {
      enviroment.log.error("input=> Body is not defined");
      return false;
    }

    // seding datea
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const statusCode = response.status;
    if (statusCode !== 200) {
      enviroment.log.error(`Status Code: ${statusCode}`);
      return false;
    }

    const responseBody = await response.json();
    enviroment.log.info(JSON.stringify(responseBody, null, 4));

    return true;
  } catch (error: any) {
    enviroment.log.error(error.message);
    return false;
  }
};
