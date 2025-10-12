"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCredentials } from "@/hooks/useGetCredentials";
import { ParamProps } from "@/types/appNodeType";
import { useId } from "react";

const CredentialsParam = ({
  param,
  updateNodeParamValue,
  value,
}: ParamProps) => {
  const id = useId();
  const credentialsQuery = useGetCredentials();

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </Label>
      <Select
        onValueChange={(value) => updateNodeParamValue(value)}
        defaultValue={value}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={"select an option"} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Credentials</SelectLabel>
            {credentialsQuery.data?.map((credential) => {
              // console.log(`credential component`, credential);

              return (
                <SelectItem key={credential.id} value={credential.id}>
                  {credential.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CredentialsParam;
