import { SetupUser } from "@/actions/billing/setUpUser";
import { waitFor } from "@/lib/helper/waitFor";
import React from "react";

type Props = {};

const SetupPage = async (props: Props) => {
  return await SetupUser();
};

export default SetupPage;
