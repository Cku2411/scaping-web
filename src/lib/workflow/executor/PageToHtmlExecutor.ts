import { ExecutionEnviromentType } from "@/types/executorType";
import { PageToHtml } from "../task/PageToHtml";

export const pageToHtlmExecutor = async (
  enviroment: ExecutionEnviromentType<typeof PageToHtml>
): Promise<boolean> => {
  try {
    const html = await enviroment.getPage()!.content();
    enviroment.setOutput("Html", html);

    return true;
  } catch (error: any) {
    enviroment.log.error(error.message);
    return false;
  }
};
