"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LockKeyholeIcon, ShieldIcon, ShieldOffIcon } from "lucide-react";
import React, { Suspense } from "react";
import CreateCredentialsDialog from "./_components/create-credentials-dialog";
import { formatDistanceToNow } from "date-fns";
import DeleteCredentialsDialog from "./_components/delete-credentials-dialog";
import { useGetCredentials } from "@/hooks/useGetCredentials";

type Props = {};

const CredentialsPage = (props: Props) => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Credentials</h1>
          <p className="text-muted-foreground">Manage your credentials</p>
        </div>
        <CreateCredentialsDialog />
      </div>

      <div>
        <Alert className="my-4">
          <ShieldIcon className="size-4 stroke-primary" />
          <AlertTitle className="text-primary">Encryption</AlertTitle>
          <AlertDescription>
            All information is securely encrypted, ensuring your data remains
            safe
          </AlertDescription>
        </Alert>

        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <UserCredentials />
        </Suspense>
      </div>
    </div>
  );
};

export default CredentialsPage;

const UserCredentials = () => {
  const credentialsQuery = useGetCredentials();

  if (!credentialsQuery.data) {
    return <div>Something went wrong </div>;
  }

  if (credentialsQuery.data.length === 0) {
    return (
      <Card className="w-full p-4">
        <div className="flex flex-col gap-4 items-center justify-center">
          <div>
            <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
              {<ShieldOffIcon size={40} className="stroke-primary" />}
            </div>
          </div>

          <div className="flex flex-col gap-1 text-center ">
            <p className="text-bold">No credentials created yet</p>
            <p className="text-sm text-muted-foreground ">
              Click the button below to create your first credentials
            </p>
          </div>
          <CreateCredentialsDialog triggerText="Create your first credentials" />
        </div>
      </Card>
    );
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {credentialsQuery.data.map((credential) => {
        const createdAt = formatDistanceToNow(credential.createdAt, {
          addSuffix: true,
        });

        return (
          <Card
            key={credential.id}
            className="w-full p-4 flex flex-row justify-between items-center"
          >
            <div>
              <div className="rounded-full bg-primary/10 size-8 flex justify-center items-center">
                <LockKeyholeIcon size={18} className="stroke-primary" />
              </div>
              <div>
                <p className="font-bold">{credential.name}</p>
                <p className="text-xs text-muted-foreground">{createdAt}</p>
              </div>
            </div>
            <div>
              <DeleteCredentialsDialog name={credential.name} />
            </div>
          </Card>
        );
      })}
    </div>
  );
};
