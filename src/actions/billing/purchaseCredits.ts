"use server";

import { getAppUrl } from "@/lib/helper/appURl";
import { stripe } from "@/lib/stripe/stripe";
import { getCreditsPack, PackId } from "@/types/billingType";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const purchaseCredits = async (packId: PackId) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("Unauthenticated");
  }

  const selectedPack = getCreditsPack(packId);
  if (!selectedPack) {
    throw new Error("Invalid pack");
  }
  const priceId = selectedPack?.priceId;

  console.log(getAppUrl("billing"));

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    invoice_creation: {
      enabled: true,
    },
    success_url: getAppUrl("billing"),
    cancel_url: getAppUrl("billing"),
    metadata: {
      userId: user.id,
      packId,
    },
    line_items: [{ quantity: 1, price: priceId }],
  });

  if (!session.url) {
    throw new Error("Cannot create stripe session");
  }

  redirect(session.url);
};
