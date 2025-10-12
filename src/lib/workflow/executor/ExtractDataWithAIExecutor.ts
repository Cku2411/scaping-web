import { ExecutionEnviromentType } from "@/types/executorType";
import * as cheerio from "cheerio";
import { ExtractDataWithAITask } from "../task/ExtractDataWithAi";
import { getCredential } from "@/actions/credentials/getCredentialsForUser";
import { symmetricDecrypt } from "@/lib/encryption";
import { geminiAi } from "@/lib/geminAi/gemini";

export const ExtractDataWithAIExecutor = async (
  enviroment: ExecutionEnviromentType<typeof ExtractDataWithAITask>
): Promise<boolean> => {
  try {
    const credentialsId = enviroment.getInput("Credentials");

    if (!credentialsId) {
      enviroment.log.error("credentials is not provided");
      return false;
    }
    const prompt = enviroment.getInput("Prompt");
    if (!prompt) {
      enviroment.log.error("prompt is not provided");

      return false;
    }

    const content = enviroment.getInput("Content");
    if (!prompt) {
      enviroment.log.error("content is not provided");

      return false;
    }

    // Get credentials from DB
    const credential = await getCredential(credentialsId);

    console.log({ credential });

    if (!credential) {
      enviroment.log.error("credential not found");
      return false;
    }

    const plainCredentialValue = symmetricDecrypt(credential.value);
    if (!plainCredentialValue) {
      enviroment.log.error("Cannot decrypt credential");
    }

    // const mockExtractedData = {
    //   usernameSelector: "#username",
    //   passwordSelector: "#password",
    //   loginSelector: "body > div > form > input.btn.btn-primary",
    // };

    const response = await geminiAi(plainCredentialValue, prompt);

    if (!response) {
      enviroment.log.error("gemini did not response");
      return false;
    }

    enviroment.setOutput("Extracted data", JSON.stringify(response));

    return true;
  } catch (error: any) {
    enviroment.log.error(error.message);

    return false;
  }
};
