import React from "react";
import { Workflow } from "@prisma/client";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./FlowEditor";

type Props = {
  workflow: Workflow;
};

const EditorPage = ({ workflow }: Props) => {
  return (
    <ReactFlowProvider>
      <div className=" flex flex-col h-full w-full overflow-hidden">
        <section className=" flex h-full overflow-auto">
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
};

export default EditorPage;
