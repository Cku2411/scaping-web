"use server";

import { symmetricEncrypt } from "@/lib/encryption";
import { db } from "@/lib/prisma";
import {
  createCredentialSchema,
  CreateCredentialSchemaType,
} from "@/schema/credentials";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const createCredentials = async (form: CreateCredentialSchemaType) => {
  // validate form with zod
  const { success, data } = createCredentialSchema.safeParse(form);
  if (!success) {
    throw new Error("Invalid form data");
  }

  const user = await currentUser();
  if (!user?.id) {
    throw new Error("Unauthenticated");
  }

  //   Encrypt value

  const encryptedValue = symmetricEncrypt(data.value);

  console.log("@TEST", {
    plain: data.value,
    encrypTed: encryptedValue,
  });

  const result = await db.credential.create({
    data: {
      userId: user.id,
      name: data.name,
      value: encryptedValue,
    },
  });

  if (!result) {
    throw new Error("Faild to create credentials ");
  }

  return "";
};
