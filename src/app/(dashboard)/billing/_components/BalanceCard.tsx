import { getAvailableCredits } from "@/actions/billing/getAvailableCredits";
import ReactCountUpWrapper from "@/components/ReactCountUpWrapper";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CoinsIcon } from "lucide-react";
import React from "react";

type Props = {};

const BalanceCard = async (props: Props) => {
  const userBalance = await getAvailableCredits();
  return (
    <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 shadow-lg flex justify-between flex-col overflow-hidden">
      <CardContent className="p-6 relative items-center">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Available Credits
            </h3>
            <p className=" text-4xl font-bold text-primary">
              <ReactCountUpWrapper value={userBalance} />
            </p>
          </div>

          <CoinsIcon
            size={180}
            className="text-primary opacity-40 absolute bottom-0 right-0"
          />
        </div>
      </CardContent>

      <CardFooter>
        When your credit balance reaches zero, your workflows will stop working
      </CardFooter>
    </Card>
  );
};

export default BalanceCard;
