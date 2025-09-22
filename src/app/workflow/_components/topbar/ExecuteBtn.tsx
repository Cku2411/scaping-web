import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import React from "react";

type Props = {
  workflowId: string;
};

const ExecuteBtn = ({ workflowId }: Props) => {
  return (
    <Button variant={"outline"} className="flex items-center gap-2">
      <PlayIcon size={16} className="stroke-orange-400" />
    </Button>
  );
};

export default ExecuteBtn;
