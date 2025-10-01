import { useGetAvailabelCredits } from "@/hooks/useGetAvailableCredits";
import { cn } from "@/lib/utils";
import { CoinsIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";
import ReactCountUpWrapper from "./ReactCountUpWrapper";
import { buttonVariants } from "./ui/button";

type Props = {};

const UserAvailableCreditBadge = (props: Props) => {
  const getUserCreditsQuery = useGetAvailabelCredits();

  return (
    <Link
      href={"/billing"}
      className={cn(
        "w-full space-x-2 items-center",
        buttonVariants({ variant: "outline" })
      )}
    >
      <CoinsIcon size={20} className="text-primary" />
      <span className="font-semibold capitalize">
        {getUserCreditsQuery.isLoading && (
          <Loader2Icon className="size-4 animate-spin" />
        )}

        {!getUserCreditsQuery.isLoading && getUserCreditsQuery.data && (
          <ReactCountUpWrapper value={getUserCreditsQuery.data} />
        )}

        {!getUserCreditsQuery.isLoading &&
          getUserCreditsQuery.data === undefined &&
          "-"}
      </span>
    </Link>
  );
};

export default UserAvailableCreditBadge;
