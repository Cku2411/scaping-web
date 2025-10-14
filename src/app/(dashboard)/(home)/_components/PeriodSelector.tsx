"use client";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Period } from "@/types/analytics";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const PeriodSelector = ({
  periods,
  selectPeriod,
}: {
  periods: Period[];
  selectPeriod: Period;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select
      value={`${selectPeriod.month}-${selectPeriod.year}`}
      onValueChange={(value) => {
        // set params to the select value
        const [month, year] = value.split("-");
        const params = new URLSearchParams(searchParams);
        params.set("month", month);
        params.set("year", year);
        router.push(`?${params.toString()}`);
      }}
    >
      <SelectTrigger className="w=[180px]">
        <SelectValue placeholder="Select the date" />
      </SelectTrigger>
      <SelectContent>
        {periods.map((period, idx) => {
          return (
            <SelectItem key={idx} value={`${period.month}-${period.year}`}>
              {`${MONTH_NAMES[period.month]} ${period.year}`}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default PeriodSelector;
