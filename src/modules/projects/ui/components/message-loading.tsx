import Image from "next/image";
import { useEffect, useState } from "react";

const ShimmerMessages = () => {
  const messages = [
    "Building your site. Stay tuned.",
    "Crafting your website right now.",
    "We’re assembling your vision.",
    "Your site is taking shape.",
    "Designing magic for you.",
    "We’re putting it all together.",
    "Hang tight. Your site is loading.",
    "Bringing your site to life.",
    "Your site is under construction (but prettier).",
    "Sit back. We’re on it.",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-base text-muted-foreground animate-pulse">
        {messages[currentMessageIndex]}
      </span>
    </div>
  );
};

export const MessageLoading = () => {
  return (
    <div className="flex flex-col group px-2 pb-4 ">
      <div className="flex items-center gap-2 pl-2 mb-2">
        <Image
          src="/logo.svg"
          alt="lunaris"
          width={25}
          height={25}
          className="shrink-0"
        />
        <span className="text-sm font-medium">Lunaris</span>
      </div>
      <div className="pl-8.5 flex flex-col gap-y-4">
        <ShimmerMessages />
      </div>
    </div>
  );
};
