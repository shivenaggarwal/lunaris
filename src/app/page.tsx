import { Client } from "@/app/client";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

const Page = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.createAi.queryOptions({ text: "world prefetch" })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p> LOADING .... </p>}>
        <Client />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
