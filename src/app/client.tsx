"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Client = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.createAi.queryOptions({ text: "world prefetch" })
  );

  return <div>{JSON.stringify(data)}</div>;
};
