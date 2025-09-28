import { ExecutionEnviromentType } from "@/types/executorType";
import { PageToHtml } from "../task/PageToHtml";

export const pageToHtlmExecutor = async (
  enviroment: ExecutionEnviromentType<typeof PageToHtml>
): Promise<boolean> => {
  try {
    const html = await enviroment.getPage()!.content();
    console.log(`@PAGE:`, html);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
