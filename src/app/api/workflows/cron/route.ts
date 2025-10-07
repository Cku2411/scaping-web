import { getAppUrl } from "@/lib/helper/appURl";
import { db } from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workfowTypes";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const now = new Date();
  //   find all workflow with published
  const workflows = await db.workflow.findMany({
    select: {
      id: true,
    },
    where: {
      status: WorkflowStatus.PUBLISHED,
      cron: { not: null },
      nextRunAt: { lte: now },
    },
  });

  console.log(`@Workflow TO RUN`, workflows.length);

  //   run all workflows
  for (const workflow of workflows) {
    triggerWorkflow(workflow.id);
  }

  return Response.json({ workflowToRun: workflows.length }, { status: 200 });
};

const triggerWorkflow = async (workflowId: string) => {
  const triggerAPiUrl = getAppUrl(
    `api/workflows/execute?workflowId=${workflowId}`
  );

  console.log(`Trigger URL`, triggerAPiUrl);
  fetch(triggerAPiUrl, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process.env.API_SECRET}`,
    },
  }).catch((error) =>
    console.error(
      "Error triggering workflow with id",
      workflowId,
      ":error->",
      error.message
    )
  );
};
