import { NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";
import { db } from "@/lib/prisma";
import {
  ExecutionPhasesStatus,
  WorkflowExecutionPlan,
  WorkflowExecutionStatus,
  WorkflowExecutionTrigger,
} from "@/types/workfowTypes";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { executeWorkflow } from "@/lib/workflow/executeWorkflow";

export const GET = async (request: NextRequest) => {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return Response.json(
      {
        error: "Unauthorized!",
      },
      { status: 401 }
    );
  }

  const secret = authHeader.split(" ")[1];
  if (!isValidSecret(secret)) {
    return Response.json(
      {
        error: "Unauthorized!",
      },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const workflowId = searchParams.get("workflowId") as string;

  if (!workflowId) {
    return Response.json(
      {
        error: "bad request",
      },
      { status: 401 }
    );
  }

  const workflow = await db.workflow.findUnique({
    where: {
      id: workflowId,
    },
  });
  if (!workflow) {
    return Response.json(
      {
        error: "bad request",
      },
      { status: 401 }
    );
  }

  const executionPlan = JSON.parse(
    workflow.executionPlan!
  ) as WorkflowExecutionPlan;

  if (!executionPlan) {
    return Response.json(
      {
        error: "bad request",
      },
      { status: 401 }
    );
  }
  const execution = await db.workflowExecution.create({
    data: {
      workflowId,
      userId: workflow.userId,
      definition: workflow.definition,
      status: WorkflowExecutionStatus.PENDING,
      startedAt: new Date(),
      trigger: WorkflowExecutionTrigger.CRON,
      phases: {
        create: executionPlan.flatMap((phase) => {
          return phase.nodes.flatMap((node) => {
            return {
              userId: workflow.userId,
              status: ExecutionPhasesStatus.CREATED,
              number: phase.phase,
              node: JSON.stringify(node),
              name: TaskRegistry[node.data.type].label,
            };
          });
        }),
      },
    },
  });

  await executeWorkflow(execution.id);
  return new Response(null, { status: 200 });
};

const isValidSecret = (secret: string) => {
  const API_SECRET = process.env.API_SECRET;
  if (!API_SECRET) return false;
  try {
    return timingSafeEqual(Buffer.from(secret), Buffer.from(API_SECRET));
  } catch (error) {
    return false;
  }
};
